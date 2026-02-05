import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Award, 
  Zap,
  ShieldCheck,
  Package,
  Truck,
  BadgePercent,
  Star,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';

interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: {
    value: string;
    label: string;
    icon: React.ReactNode;
    description?: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é o seu segmento de atuação?",
    subtitle: "Isso nos ajuda a personalizar sua experiência",
    options: [
      { value: "eletrica", label: "Material Elétrico", icon: <Zap className="w-5 h-5" />, description: "Lojas de materiais elétricos" },
      { value: "construcao", label: "Construção Civil", icon: <Package className="w-5 h-5" />, description: "Home centers e construção" },
      { value: "informatica", label: "Informática", icon: <TrendingUp className="w-5 h-5" />, description: "Lojas de informática e eletrônicos" },
      { value: "outro", label: "Outro Segmento", icon: <Users className="w-5 h-5" />, description: "Outros tipos de comércio" },
    ]
  },
  {
    id: 2,
    question: "Há quanto tempo você atua no mercado?",
    subtitle: "Valorizamos parceiros de todos os níveis",
    options: [
      { value: "iniciante", label: "Estou Começando", icon: <Sparkles className="w-5 h-5" />, description: "Menos de 1 ano" },
      { value: "1-3", label: "1 a 3 anos", icon: <TrendingUp className="w-5 h-5" />, description: "Negócio em crescimento" },
      { value: "3-10", label: "3 a 10 anos", icon: <Award className="w-5 h-5" />, description: "Experiência consolidada" },
      { value: "10+", label: "Mais de 10 anos", icon: <Star className="w-5 h-5" />, description: "Veterano do mercado" },
    ]
  },
  {
    id: 3,
    question: "Qual seu volume estimado de vendas mensais?",
    subtitle: "Temos condições especiais para cada perfil",
    options: [
      { value: "pequeno", label: "Até R$ 10 mil", icon: <Package className="w-5 h-5" />, description: "Revendedor iniciante" },
      { value: "medio", label: "R$ 10 mil a R$ 50 mil", icon: <TrendingUp className="w-5 h-5" />, description: "Revendedor médio" },
      { value: "grande", label: "R$ 50 mil a R$ 200 mil", icon: <Award className="w-5 h-5" />, description: "Revendedor premium" },
      { value: "enterprise", label: "Acima de R$ 200 mil", icon: <Star className="w-5 h-5" />, description: "Grandes distribuidores" },
    ]
  },
  {
    id: 4,
    question: "O que você mais valoriza em um fornecedor?",
    subtitle: "Queremos superar suas expectativas",
    options: [
      { value: "preco", label: "Melhor Preço", icon: <BadgePercent className="w-5 h-5" />, description: "Margem competitiva" },
      { value: "qualidade", label: "Qualidade Premium", icon: <ShieldCheck className="w-5 h-5" />, description: "Produtos certificados" },
      { value: "entrega", label: "Entrega Rápida", icon: <Truck className="w-5 h-5" />, description: "Logística eficiente" },
      { value: "suporte", label: "Suporte Técnico", icon: <Users className="w-5 h-5" />, description: "Atendimento especializado" },
    ]
  }
];

const benefits = [
  {
    icon: <BadgePercent className="w-8 h-8" />,
    title: "Margens Atrativas",
    description: "Até 40% de margem de lucro em nossa linha completa de produtos"
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Garantia de 1 Ano",
    description: "Todos os produtos com garantia total, tranquilidade para você e seu cliente"
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Entrega Expressa",
    description: "Logística otimizada para todo Brasil, receba em até 5 dias úteis"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Suporte Dedicado",
    description: "Equipe comercial exclusiva para ajudar no crescimento do seu negócio"
  },
  {
    icon: <Package className="w-8 h-8" />,
    title: "Estoque Garantido",
    description: "Produtos sempre disponíveis, nunca perca uma venda"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Treinamentos",
    description: "Capacitação técnica para você vender com confiança"
  }
];

const testimonials = [
  {
    name: "Carlos Silva",
    company: "Elétrica Central",
    city: "São Paulo, SP",
    text: "Desde que me tornei revendedor Involts, minhas vendas de proteção elétrica triplicaram. A qualidade dos produtos fala por si.",
    rating: 5
  },
  {
    name: "Marina Santos",
    company: "InfoTech Soluções",
    city: "Belo Horizonte, MG",
    text: "O suporte técnico da Involts é excepcional. Sempre que tenho dúvidas, sou atendida rapidamente. Recomendo demais!",
    rating: 5
  },
  {
    name: "Roberto Lima",
    company: "Casa do Eletricista",
    city: "Curitiba, PR",
    text: "A margem de lucro é excelente e os clientes voltam satisfeitos. Parceria que dá resultado!",
    rating: 5
  }
];

const stats = [
  { number: "500+", label: "Revendedores Ativos" },
  { number: "27", label: "Estados Atendidos" },
  { number: "15", label: "Anos de Mercado" },
  { number: "98%", label: "Satisfação" },
];

export default function Revendedor() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-4 = quiz, 5 = form, 6 = success
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [outroSegmento, setOutroSegmento] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    cidade: '',
    cnpj: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = currentStep === 0 ? 0 : currentStep <= 4 ? (currentStep / 5) * 100 : 100;

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    // Se for a pergunta 1 e o valor for "outro", não avança automaticamente
    if (questionId === 1 && value === 'outro') {
      return;
    }
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 400);
  };

  const handleOutroSegmentoSubmit = () => {
    if (outroSegmento.trim()) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 400);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCurrentStep(6);
    setIsSubmitting(false);
  };

  const FloatingOrb = ({ delay = 0, size = 300, x = 0, y = 0 }: { delay?: number; size?: number; x?: number; y?: number }) => (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    />
  );

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingOrb delay={0} size={400} x={10} y={20} />
        <FloatingOrb delay={2} size={300} x={70} y={60} />
        <FloatingOrb delay={4} size={350} x={80} y={10} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <main className="relative pt-24">
        {/* Hero / Intro Step */}
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.section
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="min-h-[90vh] flex items-center"
            >
              <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Urgency Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      <span className="text-sm font-medium text-primary">Vagas Limitadas para Novos Revendedores</span>
                    </motion.div>

                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                      Seja um{' '}
                      <span className="bg-gradient-primary bg-clip-text text-transparent">
                        Revendedor Involts
                      </span>
                    </h1>
                    
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                      Faça parte de uma rede de mais de <strong className="text-foreground">500 revendedores</strong> que 
                      lucram com produtos de proteção elétrica de alta qualidade. 
                      <span className="text-primary font-semibold"> Margens de até 40%!</span>
                    </p>

                    {/* Quick Benefits */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {[
                        { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, text: "Sem taxa de adesão" },
                        { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, text: "Treinamento gratuito" },
                        { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, text: "Suporte exclusivo" },
                        { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, text: "Garantia de 1 ano" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          {item.icon}
                          <span className="text-sm font-medium">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Button
                        size="lg"
                        onClick={() => setCurrentStep(1)}
                        className="bg-gradient-primary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
                      >
                        Quero Ser Revendedor
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <p className="text-sm text-muted-foreground mt-3">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Responda em menos de 2 minutos
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Right - Stats Cards */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300"
                      >
                        <div className="font-display text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                          {stat.number}
                        </div>
                        <div className="text-muted-foreground font-medium">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Social Proof */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-16 text-center"
                >
                  <p className="text-muted-foreground mb-6">Empresas que já confiam na Involts:</p>
                  <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                    {['Leroy Merlin', 'Telhanorte', 'C&C', 'Dicico', 'Obramax'].map((brand, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 + i * 0.1 }}
                        className="text-lg font-semibold text-muted-foreground"
                      >
                        {brand}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* Quiz Steps */}
          {currentStep >= 1 && currentStep <= 4 && (
            <motion.section
              key={`quiz-${currentStep}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="min-h-[90vh] flex items-center py-20"
            >
              <div className="container mx-auto px-6 max-w-3xl">
                {/* Progress */}
                <div className="mb-12">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-muted-foreground">Passo {currentStep} de 4</span>
                    <span className="text-sm font-medium text-primary">{Math.round(progress)}% completo</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Question */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
                >
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                    {quizQuestions[currentStep - 1].question}
                  </h2>
                  {quizQuestions[currentStep - 1].subtitle && (
                    <p className="text-muted-foreground text-lg">
                      {quizQuestions[currentStep - 1].subtitle}
                    </p>
                  )}
                </motion.div>

                {/* Options */}
                <RadioGroup
                  value={answers[currentStep] || ''}
                  onValueChange={(value) => handleAnswer(currentStep, value)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {quizQuestions[currentStep - 1].options.map((option, i) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="h-full"
                    >
                      <Label
                        htmlFor={option.value}
                        className="cursor-pointer block h-full"
                      >
                        <motion.div
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative p-6 rounded-2xl border-2 transition-all duration-300 h-full min-h-[120px] ${
                            answers[currentStep] === option.value
                              ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                              : 'border-border bg-card/50 hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl flex-shrink-0 ${
                              answers[currentStep] === option.value
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            } transition-colors`}>
                              {option.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-lg mb-1">{option.label}</div>
                              {option.description && (
                                <div className="text-sm text-muted-foreground line-clamp-1">{option.description}</div>
                              )}
                            </div>
                            <RadioGroupItem value={option.value} id={option.value} className="mt-1 flex-shrink-0" />
                          </div>
                          
                          {answers[currentStep] === option.value && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-4 right-4"
                            >
                              <CheckCircle2 className="w-6 h-6 text-primary" />
                            </motion.div>
                          )}
                        </motion.div>
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>

                {/* Campo de texto para "Outro Segmento" - aparece no grid com mesmo tamanho */}
                {currentStep === 1 && answers[1] === 'outro' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
                  >
                    <div className="relative p-6 rounded-2xl border-2 border-primary bg-primary/10 shadow-lg shadow-primary/20">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-primary text-primary-foreground">
                          <Users className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-lg mb-1">
                            Qual é o seu ramo?
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">Digite abaixo</div>
                          <Input
                            type="text"
                            placeholder="Ex: Atacadista, Varejo..."
                            value={outroSegmento}
                            onChange={(e) => setOutroSegmento(e.target.value)}
                            className="bg-background/50 border-border/50"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && outroSegmento.trim()) {
                                handleOutroSegmentoSubmit();
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Button
                        onClick={handleOutroSegmentoSubmit}
                        disabled={!outroSegmento.trim()}
                        size="lg"
                        className="bg-gradient-primary text-primary-foreground px-8 py-6 rounded-2xl"
                      >
                        Continuar
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Back Button */}
                {currentStep > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 text-center"
                  >
                    <button
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← Voltar
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}

          {/* Form Step */}
          {currentStep === 5 && (
            <motion.section
              key="form"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="min-h-[90vh] flex items-center py-20"
            >
              <div className="container mx-auto px-6 max-w-4xl">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Form */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">Perfil Qualificado!</span>
                    </div>

                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                      Você está quase lá!
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Preencha seus dados e nossa equipe entrará em contato em até <strong className="text-foreground">24 horas</strong>.
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nome">Nome Completo *</Label>
                          <Input
                            id="nome"
                            value={formData.nome}
                            onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                            required
                            className="mt-1.5"
                            placeholder="Seu nome"
                          />
                        </div>
                        <div>
                          <Label htmlFor="empresa">Nome da Empresa *</Label>
                          <Input
                            id="empresa"
                            value={formData.empresa}
                            onChange={(e) => setFormData(prev => ({ ...prev, empresa: e.target.value }))}
                            required
                            className="mt-1.5"
                            placeholder="Sua empresa"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">E-mail *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="mt-1.5"
                            placeholder="seu@email.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                          <Input
                            id="telefone"
                            value={formData.telefone}
                            onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                            required
                            className="mt-1.5"
                            placeholder="(00) 00000-0000"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cidade">Cidade/Estado *</Label>
                          <Input
                            id="cidade"
                            value={formData.cidade}
                            onChange={(e) => setFormData(prev => ({ ...prev, cidade: e.target.value }))}
                            required
                            className="mt-1.5"
                            placeholder="São Paulo, SP"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cnpj">CNPJ (opcional)</Label>
                          <Input
                            id="cnpj"
                            value={formData.cnpj}
                            onChange={(e) => setFormData(prev => ({ ...prev, cnpj: e.target.value }))}
                            className="mt-1.5"
                            placeholder="00.000.000/0000-00"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-primary text-primary-foreground py-6 text-lg font-semibold rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          />
                        ) : (
                          <>
                            Enviar Cadastro
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Ao enviar, você concorda com nossa política de privacidade
                      </p>
                    </form>

                    <button
                      onClick={() => setCurrentStep(4)}
                      className="text-muted-foreground hover:text-foreground transition-colors mt-6 block"
                    >
                      ← Voltar ao quiz
                    </button>
                  </motion.div>

                  {/* Benefits Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8"
                  >
                    <h3 className="font-display text-2xl font-bold mb-6">
                      O que você vai receber:
                    </h3>
                    
                    <div className="space-y-4">
                      {[
                        { icon: <BadgePercent className="w-5 h-5" />, text: "Tabela de preços exclusiva com até 40% de desconto" },
                        { icon: <Package className="w-5 h-5" />, text: "Acesso ao catálogo completo de produtos" },
                        { icon: <Users className="w-5 h-5" />, text: "Consultor comercial dedicado" },
                        { icon: <Award className="w-5 h-5" />, text: "Material de marketing personalizado" },
                        { icon: <Truck className="w-5 h-5" />, text: "Frete especial para revendedores" },
                        { icon: <ShieldCheck className="w-5 h-5" />, text: "Garantia estendida em toda linha" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            {item.icon}
                          </div>
                          <span className="text-foreground">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Urgency */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="mt-8 p-4 bg-primary/10 border border-primary/30 rounded-xl"
                    >
                      <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                        <Clock className="w-4 h-4" />
                        Oferta por tempo limitado
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Primeiros 50 revendedores cadastrados este mês ganham kit de amostras grátis!
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Success Step */}
          {currentStep === 6 && (
            <motion.section
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="min-h-[90vh] flex items-center py-20"
            >
              <div className="container mx-auto px-6 max-w-2xl text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
                >
                  Cadastro Enviado com Sucesso!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-muted-foreground mb-8"
                >
                  Nossa equipe comercial entrará em contato em até <strong className="text-foreground">24 horas úteis</strong>.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-8"
                >
                  <h3 className="font-semibold mb-4">Próximos passos:</h3>
                  <div className="space-y-3 text-left">
                    {[
                      "Você receberá um e-mail de confirmação",
                      "Nossa equipe analisará seu perfil",
                      "Um consultor entrará em contato para alinhar detalhes",
                      "Acesso liberado ao portal do revendedor"
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </div>
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-primary text-primary-foreground rounded-full"
                  >
                    <a href="/produtos">
                      <Package className="mr-2 w-5 h-5" />
                      Conhecer Produtos
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                  >
                    <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                      <Phone className="mr-2 w-5 h-5" />
                      Falar no WhatsApp
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Benefits Section - Only show on intro */}
        {currentStep === 0 && (
          <section className="py-24 relative">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Por que ser um <span className="bg-gradient-primary bg-clip-text text-transparent">Revendedor Involts</span>?
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Oferecemos as melhores condições do mercado para você crescer conosco
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials - Only show on intro */}
        {currentStep === 0 && (
          <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  O que nossos <span className="bg-gradient-primary bg-clip-text text-transparent">revendedores dizem</span>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border rounded-2xl p-6"
                  >
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.city}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA - Only show on intro */}
        {currentStep === 0 && (
          <section className="py-24">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 rounded-3xl p-12 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
                
                <div className="relative z-10">
                  <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                    Pronto para <span className="bg-gradient-primary bg-clip-text text-transparent">aumentar seus lucros</span>?
                  </h2>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Junte-se a mais de 500 revendedores que já estão lucrando com a Involts.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => setCurrentStep(1)}
                    className="bg-gradient-primary text-primary-foreground px-10 py-6 text-lg font-semibold rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
                  >
                    Começar Agora
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
