import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Phone, Mail, Clock, MessageCircle, Send, User, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

const contactSchema = z.object({
  nome: z.string().trim().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  email: z.string().trim().email('Email inválido').max(255, 'Email muito longo'),
  telefone: z.string().trim().min(1, 'Telefone é obrigatório').max(20, 'Telefone muito longo'),
  assunto: z.string().trim().min(1, 'Assunto é obrigatório').max(200, 'Assunto muito longo'),
  mensagem: z.string().trim().min(1, 'Mensagem é obrigatória').max(1000, 'Mensagem muito longa'),
});

const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-primary/20 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [-20, -100],
      x: [0, Math.random() * 40 - 20],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const Contato = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation first
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "Erro de validação",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Call edge function with server-side validation
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: formData,
      });

      if (error) {
        throw new Error(error.message || 'Erro ao enviar mensagem');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Erro ao processar formulário');
      }

      toast({
        title: "Mensagem enviada!",
        description: data.message || "Entraremos em contato em breve.",
      });
      
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: '',
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar mensagem';
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Olá Involts');
    window.open(`https://api.whatsapp.com/send?phone=5511949000505&text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }} />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ left: `${10 + i * 12}%`, top: '60%' }} className="absolute">
                <FloatingParticle delay={i * 0.3} />
              </div>
            ))}
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-sm">Atendimento Especializado</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-foreground mb-6">
                Fale{' '}
                <span className="text-gradient">Conosco</span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
                Estamos prontos para atender você. Entre em contato pelos nossos canais 
                ou envie uma mensagem diretamente.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Info + Form Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Info */}
              <AnimatedSection animation="slideLeft">
                <div className="space-y-8">
                  {/* Contact Cards */}
                  <div className="bg-card border border-border rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                    
                    <h2 className="text-2xl font-display font-bold text-foreground mb-8">
                      Informações de Contato
                    </h2>

                    <div className="space-y-6">
                      {/* Phone */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10"
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Telefone</p>
                          <p className="text-lg font-semibold text-foreground">11 4024-1212 | 11 94900-0505</p>
                        </div>
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10"
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">E-mail</p>
                          <p className="text-lg font-semibold text-foreground">contato@involtsbrasil.com.br</p>
                        </div>
                      </motion.div>

                      {/* Hours */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10"
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Horário de Atendimento</p>
                          <p className="text-lg font-semibold text-foreground">08h às 12h e 13h às 17h</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden cursor-pointer"
                    onClick={openWhatsApp}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          <MessageCircle className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-white/80 text-sm">Precisa de ajuda?</p>
                          <p className="text-2xl font-display font-bold">Fale conosco agora</p>
                        </div>
                      </div>
                      
                      <p className="text-white/80 mb-4">
                        Fale conosco agora mesmo pelo chat.
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/60">Horário: 08h às 12h e 13h às 17h</span>
                        <Button 
                          variant="secondary" 
                          className="bg-white text-emerald-600 hover:bg-white/90"
                        >
                          Iniciar Conversa
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </AnimatedSection>

              {/* Contact Form */}
              <AnimatedSection animation="slideRight">
                <div className="bg-card border border-border rounded-3xl overflow-hidden sticky top-24">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary to-secondary p-6">
                    <h3 className="text-xl font-display font-bold text-primary-foreground">
                      Faça seu orçamento
                    </h3>
                    <p className="text-primary-foreground/80 text-sm mt-1">
                      Preencha o formulário e retornaremos em breve
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Nome */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        Nome completo
                      </label>
                      <Input
                        name="nome"
                        placeholder="Seu nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="bg-background"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        E-mail
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-background"
                      />
                    </div>

                    {/* Telefone */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        Telefone
                      </label>
                      <Input
                        name="telefone"
                        placeholder="(00) 00000-0000"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="bg-background"
                      />
                    </div>

                    {/* Assunto */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        Assunto
                      </label>
                      <Input
                        name="assunto"
                        placeholder="Assunto da mensagem"
                        value={formData.assunto}
                        onChange={handleChange}
                        className="bg-background"
                      />
                    </div>

                    {/* Mensagem */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-primary" />
                        Mensagem
                      </label>
                      <Textarea
                        name="mensagem"
                        placeholder="Digite sua mensagem..."
                        value={formData.mensagem}
                        onChange={handleChange}
                        className="bg-background min-h-[120px] resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground py-6"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;
