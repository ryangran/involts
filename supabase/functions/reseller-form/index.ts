import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory rate limiting store
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(clientIP: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const requests = rateLimitStore.get(clientIP) || [];
  const recentRequests = requests.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestRequest = Math.min(...recentRequests);
    const retryAfter = Math.ceil((oldestRequest + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  recentRequests.push(now);
  rateLimitStore.set(clientIP, recentRequests);
  return { allowed: true };
}

function getClientIP(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIP = req.headers.get("x-real-ip");
  if (realIP) return realIP.trim();
  return "unknown";
}

interface ResellerFormData {
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  cidade?: string;
  cnpj?: string;
  segmento?: string;
  outro_segmento?: string;
  tempo_mercado?: string;
  volume_vendas?: string;
  prioridade?: string;
}

function validateResellerForm(data: unknown): { success: true; data: ResellerFormData } | { success: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { success: false, error: 'Dados inválidos' };
  }

  const { nome, email, telefone, empresa, cidade, cnpj, segmento, outro_segmento, tempo_mercado, volume_vendas, prioridade } = data as Record<string, unknown>;

  // Required fields
  if (typeof nome !== 'string' || nome.trim().length === 0) {
    return { success: false, error: 'Nome é obrigatório' };
  }
  if (nome.trim().length > 100) {
    return { success: false, error: 'Nome muito longo (máximo 100 caracteres)' };
  }

  if (typeof email !== 'string' || email.trim().length === 0) {
    return { success: false, error: 'Email é obrigatório' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { success: false, error: 'Email inválido' };
  }

  if (typeof telefone !== 'string' || telefone.trim().length === 0) {
    return { success: false, error: 'Telefone é obrigatório' };
  }

  const sanitize = (str: string | undefined) => str?.trim().replace(/<[^>]*>/g, '') || '';
  const sanitizeOptional = (val: unknown) => typeof val === 'string' ? sanitize(val) : undefined;

  return {
    success: true,
    data: {
      nome: sanitize(nome as string),
      email: sanitize(email as string),
      telefone: sanitize(telefone as string),
      empresa: sanitizeOptional(empresa),
      cidade: sanitizeOptional(cidade),
      cnpj: sanitizeOptional(cnpj),
      segmento: sanitizeOptional(segmento),
      outro_segmento: sanitizeOptional(outro_segmento),
      tempo_mercado: sanitizeOptional(tempo_mercado),
      volume_vendas: sanitizeOptional(volume_vendas),
      prioridade: sanitizeOptional(prioridade),
    },
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Método não permitido" }),
        { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: "Muitas tentativas. Por favor, aguarde alguns minutos antes de tentar novamente.",
          retryAfter: rateLimitResult.retryAfter 
        }),
        { 
          status: 429, 
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": String(rateLimitResult.retryAfter),
            ...corsHeaders 
          } 
        }
      );
    }

    const body = await req.json();
    const validation = validateResellerForm(body);
    
    if (!validation.success) {
      console.log("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const formData = validation.data;

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into database
    const { error: dbError } = await supabase
      .from("reseller_leads")
      .insert({
        ...formData,
        status: "novo",
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar cadastro. Tente novamente." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Reseller form submission saved:", {
      nome: formData.nome,
      email: formData.email,
      empresa: formData.empresa,
      clientIP,
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Cadastro enviado com sucesso! Nossa equipe entrará em contato em breve." 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error) {
    console.error("Error processing reseller form:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
