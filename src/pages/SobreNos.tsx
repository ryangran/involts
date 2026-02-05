import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { 
  Users, Globe, Package, Cpu, Shield, Zap, Award, HeartHandshake, 
  CheckCircle2, Building2, Truck, Headphones, Star, Quote, ArrowRight,
  MapPin, Clock, Phone, ThumbsUp, TrendingUp, BadgeCheck
} from 'lucide-react';

const diferenciais = [
  {
    icon: Users,
    title: '25 anos de know-how',
    description: 'no segmento',
  },
  {
    icon: Globe,
    title: 'Presença em todo',
    description: 'Brasil',
  },
  {
    icon: Package,
    title: 'Ampla linha de',
    description: 'produtos',
  },
  {
    icon: Cpu,
    title: 'Placas montadas',
    description: 'em SMD',
  },
];

const valores = [
  {
    icon: Shield,
    title: 'Qualidade Premium',
    description: 'Cada produto passa por rigorosos testes de qualidade antes de chegar até você. Utilizamos componentes de primeira linha e tecnologia de ponta.',
  },
  {
    icon: Zap,
    title: 'Inovação Constante',
    description: 'Investimos continuamente em pesquisa e desenvolvimento para trazer as soluções mais modernas do mercado de proteção de energia.',
  },
  {
    icon: Award,
    title: 'Confiança Comprovada',
    description: 'Mais de duas décadas construindo relacionamentos sólidos com clientes, revendedores e parceiros em todo o território nacional.',
  },
  {
    icon: HeartHandshake,
    title: 'Compromisso Total',
    description: 'Atendimento humanizado, suporte técnico especializado e assistência técnica presente em todos os estados brasileiros.',
  },
];

const estatisticas = [
  { numero: '25+', label: 'Anos de Experiência', icon: Clock },
  { numero: '500+', label: 'Revendedores Ativos', icon: Building2 },
  { numero: '27', label: 'Estados Atendidos', icon: MapPin },
  { numero: '50.000+', label: 'Produtos Vendidos/Mês', icon: TrendingUp },
];

const beneficios = [
  'Garantia estendida em todos os produtos',
  'Suporte técnico especializado',
  'Assistência técnica em todo Brasil',
  'Produtos com certificação INMETRO',
  'Tecnologia SMD de última geração',
  'Entrega rápida para todo o país',
];

const depoimentos = [
  {
    nome: 'Carlos Alberto',
    cargo: 'Dono de Loja de Informática',
    cidade: 'São Paulo, SP',
    texto: 'Trabalho com a Involts há mais de 10 anos. A qualidade dos produtos é excepcional e o suporte técnico sempre me ajuda quando preciso. Meus clientes confiam na marca.',
    estrelas: 5,
  },
  {
    nome: 'Maria Fernanda',
    cargo: 'Gerente de Compras',
    cidade: 'Belo Horizonte, MG',
    texto: 'A parceria com a Involts transformou nosso negócio. Os estabilizadores têm baixíssimo índice de retorno e a margem de lucro é muito boa. Recomendo!',
    estrelas: 5,
  },
  {
    nome: 'Roberto Santos',
    cargo: 'Técnico em Eletrônica',
    cidade: 'Curitiba, PR',
    texto: 'Como assistência técnica autorizada, posso afirmar que os produtos Involts são muito bem construídos. A documentação técnica é completa e as peças de reposição são fáceis de encontrar.',
    estrelas: 5,
  },
];

const timeline = [
  {
    ano: '1999',
    titulo: 'O Início',
    descricao: 'Fundação da empresa com foco em soluções de proteção de energia para o mercado brasileiro.',
  },
  {
    ano: '2005',
    titulo: 'Expansão Nacional',
    descricao: 'Abertura de centros de distribuição em todas as regiões do Brasil.',
  },
  {
    ano: '2012',
    titulo: 'Tecnologia SMD',
    descricao: 'Implementação da tecnologia SMD em toda linha de produção, aumentando qualidade e durabilidade.',
  },
  {
    ano: '2018',
    titulo: 'Rede de Assistência',
    descricao: 'Consolidação da maior rede de assistência técnica do segmento, presente em todos os estados.',
  },
  {
    ano: '2024',
    titulo: 'Líder de Mercado',
    descricao: 'Reconhecimento como uma das principais marcas de proteção de energia do Brasil.',
  },
];

const SobreNos = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Elements */}
        <motion.div style={{ y }} className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span>/</span>
            <span className="text-primary">A Involts</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6"
              >
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Líder em Proteção de Energia</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
              >
                A <span className="text-gradient">Involts</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6"
              >
                Surge como uma empresa jovem e moderna, que aliada ao{' '}
                <span className="text-primary font-semibold">know-how de 25 anos</span> do seu 
                proprietário, busca oferecer soluções inovadoras e tecnológicas ao setor de 
                proteção de energia.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-foreground/70 leading-relaxed mb-8"
              >
                Nossa linha completa vai desde filtros de linha, protetores e autotransformadores, 
                até estabilizadores e nobreaks de pequeno e médio porte — todos desenvolvidos com 
                <span className="text-secondary font-semibold"> tecnologia SMD</span> e os mais 
                rigorosos padrões de qualidade do mercado.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a
                  href="/produtos"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Conheça Nossos Produtos
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="/contato"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-foreground/30 text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-foreground/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Fale Conosco
                </motion.a>
              </motion.div>
            </div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {estatisticas.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-card border border-border rounded-2xl p-6 group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:glow-orange transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">
                    {stat.numero}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
              Por que escolher a Involts?
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nossos <span className="text-gradient">Diferenciais</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Combinamos experiência, tecnologia e compromisso para entregar as melhores 
              soluções em proteção de energia do Brasil.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {diferenciais.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-card border border-border rounded-2xl p-8 text-center group hover:border-primary/50 transition-all duration-300 h-full"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:glow-orange transition-all duration-300">
                    <item.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-primary font-bold text-2xl">
                    {item.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Benefits List */}
          <AnimatedSection delay={0.3}>
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                    Benefícios exclusivos para nossos <span className="text-gradient">parceiros</span>
                  </h3>
                  <div className="grid gap-4">
                    {beneficios.map((beneficio, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground/80">{beneficio}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted rounded-2xl p-6 text-center">
                    <Truck className="w-8 h-8 text-primary mx-auto mb-3" />
                    <span className="text-sm text-muted-foreground">Entrega Rápida</span>
                  </div>
                  <div className="bg-muted rounded-2xl p-6 text-center">
                    <Headphones className="w-8 h-8 text-primary mx-auto mb-3" />
                    <span className="text-sm text-muted-foreground">Suporte 24/7</span>
                  </div>
                  <div className="bg-muted rounded-2xl p-6 text-center">
                    <ThumbsUp className="w-8 h-8 text-primary mx-auto mb-3" />
                    <span className="text-sm text-muted-foreground">Satisfação Total</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
              Nossa Trajetória
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="text-gradient">25 Anos</span> de História
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Uma jornada de crescimento, inovação e compromisso com a qualidade.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border hidden md:block" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-card border border-border rounded-2xl p-6 inline-block hover:border-primary/50 transition-colors">
                      <span className="text-primary font-display font-bold text-2xl block mb-2">
                        {item.ano}
                      </span>
                      <h3 className="font-display font-semibold text-foreground text-xl mb-2">
                        {item.titulo}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.descricao}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-6 h-6 bg-gradient-primary rounded-full items-center justify-center flex-shrink-0 relative z-10">
                    <div className="w-3 h-3 bg-background rounded-full" />
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
              O que nos move
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nossos <span className="text-gradient">Valores</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Princípios que guiam cada decisão e definem quem somos como empresa.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border rounded-2xl p-8 h-full group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 mb-6 bg-muted rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <valor.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-xl mb-4">
                    {valor.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {valor.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
              Depoimentos
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              O que nossos <span className="text-gradient">parceiros</span> dizem
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A satisfação de quem trabalha conosco é nossa maior recompensa.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-card border border-border rounded-2xl p-8 h-full relative group hover:border-primary/50 transition-all duration-300"
                >
                  <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(depoimento.estrelas)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                    ))}
                  </div>
                  
                  <p className="text-foreground/80 leading-relaxed mb-6 italic">
                    "{depoimento.texto}"
                  </p>
                  
                  <div className="border-t border-border pt-6">
                    <p className="font-semibold text-foreground">{depoimento.nome}</p>
                    <p className="text-sm text-muted-foreground">{depoimento.cargo}</p>
                    <p className="text-sm text-primary">{depoimento.cidade}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Pronto para proteger sua <span className="text-gradient">energia</span>?
            </h2>
            <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
              Junte-se a milhares de clientes satisfeitos que confiam na Involts para 
              proteger seus equipamentos. Entre em contato e descubra a solução ideal para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/produtos"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-primary text-primary-foreground px-10 py-5 rounded-full font-semibold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Ver Catálogo Completo
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="/revendedor"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-card border-2 border-primary text-primary px-10 py-5 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Building2 className="w-5 h-5" />
                Seja um Revendedor
              </motion.a>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Garantia em todos os produtos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Suporte técnico especializado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Entrega para todo Brasil</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Bar */}
      <section className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Headphones className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Precisa de ajuda?</p>
                <p className="font-semibold text-foreground">(11) 4024-1212</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Horário de Atendimento</p>
                <p className="font-semibold text-foreground">Seg à Sex: 08h às 17h</p>
              </div>
            </div>
            
            <motion.a
              href="https://wa.me/5511968469454"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Fale pelo WhatsApp
            </motion.a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SobreNos;
