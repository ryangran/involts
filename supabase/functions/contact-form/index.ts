import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory rate limiting store (resets on function cold start)
// For production, consider using Redis or database-backed rate limiting
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(clientIP: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const requests = rateLimitStore.get(clientIP) || [];
  
  // Filter to only include requests within the time window
  const recentRequests = requests.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestRequest = Math.min(...recentRequests);
    const retryAfter = Math.ceil((oldestRequest + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  // Add current request timestamp
  recentRequests.push(now);
  rateLimitStore.set(clientIP, recentRequests);
  
  return { allowed: true };
}

function getClientIP(req: Request): string {
  // Try to get the real client IP from various headers
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one (original client)
    return forwardedFor.split(",")[0].trim();
  }
  
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }
  
  // Fallback - use a generic identifier
  return "unknown";
}

// Server-side validation - mirrors client-side Zod schema
function validateContactForm(data: unknown): { success: true; data: ContactFormData } | { success: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { success: false, error: 'Dados inválidos' };
  }

  const { nome, email, telefone, assunto, mensagem } = data as Record<string, unknown>;

  // Validate nome
  if (typeof nome !== 'string' || nome.trim().length === 0) {
    return { success: false, error: 'Nome é obrigatório' };
  }
  if (nome.trim().length > 100) {
    return { success: false, error: 'Nome muito longo (máximo 100 caracteres)' };
  }

  // Validate email
  if (typeof email !== 'string' || email.trim().length === 0) {
    return { success: false, error: 'Email é obrigatório' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { success: false, error: 'Email inválido' };
  }
  if (email.trim().length > 255) {
    return { success: false, error: 'Email muito longo (máximo 255 caracteres)' };
  }

  // Validate telefone
  if (typeof telefone !== 'string' || telefone.trim().length === 0) {
    return { success: false, error: 'Telefone é obrigatório' };
  }
  if (telefone.trim().length > 20) {
    return { success: false, error: 'Telefone muito longo (máximo 20 caracteres)' };
  }

  // Validate assunto
  if (typeof assunto !== 'string' || assunto.trim().length === 0) {
    return { success: false, error: 'Assunto é obrigatório' };
  }
  if (assunto.trim().length > 200) {
    return { success: false, error: 'Assunto muito longo (máximo 200 caracteres)' };
  }

  // Validate mensagem
  if (typeof mensagem !== 'string' || mensagem.trim().length === 0) {
    return { success: false, error: 'Mensagem é obrigatória' };
  }
  if (mensagem.trim().length > 1000) {
    return { success: false, error: 'Mensagem muito longa (máximo 1000 caracteres)' };
  }

  // Sanitize data - remove potential XSS vectors
  const sanitize = (str: string) => str.trim().replace(/<[^>]*>/g, '');

  return {
    success: true,
    data: {
      nome: sanitize(nome),
      email: sanitize(email),
      telefone: sanitize(telefone),
      assunto: sanitize(assunto),
      mensagem: sanitize(mensagem),
    },
  };
}

interface ContactFormData {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only accept POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Método não permitido" }),
        { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Rate limiting check
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

    // Server-side validation
    const validation = validateContactForm(body);
    
    if (!validation.success) {
      console.log("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { nome, email, telefone, assunto, mensagem } = validation.data;

    // Log validated submission with IP for abuse detection
    console.log("Contact form submission received:", {
      nome,
      email,
      telefone,
      assunto,
      mensagemLength: mensagem.length,
      clientIP,
      timestamp: new Date().toISOString(),
    });

    // TODO: In the future, you can add:
    // - Save to database
    // - Send email notification using Resend

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Mensagem enviada com sucesso! Entraremos em contato em breve." 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
