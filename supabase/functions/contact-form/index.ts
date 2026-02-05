import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

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

interface ContactFormData {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}

function validateContactForm(data: unknown): { success: true; data: ContactFormData } | { success: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { success: false, error: 'Dados inválidos' };
  }

  const { nome, email, telefone, assunto, mensagem } = data as Record<string, unknown>;

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
  if (email.trim().length > 255) {
    return { success: false, error: 'Email muito longo (máximo 255 caracteres)' };
  }

  if (typeof telefone !== 'string' || telefone.trim().length === 0) {
    return { success: false, error: 'Telefone é obrigatório' };
  }
  if (telefone.trim().length > 20) {
    return { success: false, error: 'Telefone muito longo (máximo 20 caracteres)' };
  }

  if (typeof assunto !== 'string' || assunto.trim().length === 0) {
    return { success: false, error: 'Assunto é obrigatório' };
  }
  if (assunto.trim().length > 200) {
    return { success: false, error: 'Assunto muito longo (máximo 200 caracteres)' };
  }

  if (typeof mensagem !== 'string' || mensagem.trim().length === 0) {
    return { success: false, error: 'Mensagem é obrigatória' };
  }
  if (mensagem.trim().length > 1000) {
    return { success: false, error: 'Mensagem muito longa (máximo 1000 caracteres)' };
  }

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

async function sendEmailNotification(data: ContactFormData) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    console.error("RESEND_API_KEY not configured");
    return;
  }

  const resend = new Resend(resendApiKey);

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #f97316, #eab308); padding: 20px; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">📩 Novo Contato - Involts</h1>
      </div>
      
      <div style="background: #1a1a1a; padding: 30px; border-radius: 0 0 10px 10px; color: #ffffff;">
        <h2 style="color: #f97316; margin-top: 0;">Dados do Cliente</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #888;">Nome:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #fff; font-weight: bold;">${data.nome}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #888;">Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #333;">
              <a href="mailto:${data.email}" style="color: #f97316; text-decoration: none;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #888;">Telefone:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #333;">
              <a href="tel:${data.telefone}" style="color: #f97316; text-decoration: none;">${data.telefone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #888;">Assunto:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #fff;">${data.assunto}</td>
          </tr>
        </table>
        
        <h3 style="color: #f97316; margin-top: 25px;">Mensagem:</h3>
        <div style="background: #2a2a2a; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316;">
          <p style="margin: 0; color: #ddd; line-height: 1.6; white-space: pre-wrap;">${data.mensagem}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; text-align: center;">
          <p style="color: #666; font-size: 12px; margin: 0;">
            Este email foi enviado automaticamente pelo site Involts<br>
            ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
          </p>
        </div>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Involts <onboarding@resend.dev>",
      to: ["administrativo@involtsbrasil.com.br"],
      subject: `📩 Novo Contato: ${data.assunto}`,
      html: emailHtml,
      reply_to: data.email,
    });
    console.log("Email notification sent successfully");
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
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
    const validation = validateContactForm(body);
    
    if (!validation.success) {
      console.log("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { nome, email, telefone, assunto, mensagem } = validation.data;

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into database
    const { error: dbError } = await supabase
      .from("contact_leads")
      .insert({
        nome,
        email,
        telefone,
        assunto,
        mensagem,
        status: "novo",
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar mensagem. Tente novamente." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send email notification
    await sendEmailNotification(validation.data);

    console.log("Contact form submission saved:", {
      nome,
      email,
      clientIP,
      timestamp: new Date().toISOString(),
    });

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
