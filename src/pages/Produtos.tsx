import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Zap, Shield, Cpu, Plug, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'todos', label: 'Todos', icon: Sparkles },
  { id: 'aterramento', label: 'Aterramento', icon: Plug },
  { id: 'filtro-de-linha', label: 'Filtros de Linha', icon: Shield },
  { id: 'autotransformadores', label: 'Transformadores', icon: Cpu },
  { id: 'protetores', label: 'Protetores', icon: Shield },
];

const allProducts = [
  {
    id: 1,
    name: 'Terra Lux',
    subtitle: 'Aterramento Involts',
    description: 'Sistema de aterramento inteligente para proteção completa dos seus equipamentos eletrônicos',
    image: 'https://involtsbrasil.com.br/images/two-power-plug.png',
    features: ['Proteção Completa', 'Fácil Instalação', 'Certificado INMETRO'],
    category: 'aterramento',
    highlight: true,
  },
  {
    id: 2,
    name: 'Auto Transformador',
    subtitle: 'Linha Premium',
    description: 'Conversão de voltagem com máxima eficiência e proteção térmica integrada',
    image: 'https://involtsbrasil.com.br/images/produto3.png',
    features: ['100 a 5000 VA', '110V/220V', 'Proteção Térmica'],
    category: 'autotransformadores',
    highlight: false,
  },
  {
    id: 3,
    name: 'Filtro de Linha ABS',
    subtitle: 'Proteção Essencial',
    description: 'Proteção inteligente contra surtos com design moderno e compacto',
    image: 'https://involtsbrasil.com.br/images/filtro-normal.png',
    features: ['3 a 10 Tomadas', 'Proteção DPS', 'Design Moderno'],
    category: 'filtro-de-linha',
    highlight: true,
  },
  {
    id: 4,
    name: 'Filtro Metálico 20A',
    subtitle: 'Alta Potência',
    description: 'Estrutura robusta em metal para ambientes profissionais e alta demanda',
    image: 'https://involtsbrasil.com.br/images/filtrometal.png',
    features: ['20A', '5 Tomadas', 'Estrutura Metálica'],
    category: 'filtro-de-linha',
    highlight: false,
  },
  {
    id: 5,
    name: 'Protetor Multifuncional',
    subtitle: 'Proteção Total',
    description: 'Proteção completa contra surtos, raios e oscilações de energia',
    image: 'https://involtsbrasil.com.br/images/a9d35e8e2616ac9f7bcf689276694614493.png',
    features: ['Multifuncional', 'DPS Integrado', 'Indicador LED'],
    category: 'protetores',
    highlight: true,
  },
];

const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ 
      opacity: [0, 1, 0],
      y: [100, -100],
      x: [0, Math.random() * 100 - 50],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
    className="absolute w-2 h-2 bg-primary/30 rounded-full blur-sm"
    style={{ left: `${Math.random() * 100}%` }}
  />
);

const ProductCard = ({ product, index }: { product: typeof allProducts[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow effect */}
      <motion.div 
        animate={{ 
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-2 bg-gradient-primary blur-2xl rounded-3xl"
      />
      
      <motion.div
        animate={{ 
          y: isHovered ? -10 : 0,
          rotateX: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ transformPerspective: 1000 }}
        className="relative bg-card/80 backdrop-blur-sm border border-border rounded-3xl overflow-hidden h-full"
      >
        {/* Highlight badge */}
        {product.highlight && (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="absolute top-4 left-4 z-20"
          >
            <span className="bg-gradient-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Destaque
            </span>
          </motion.div>
        )}

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          {/* Animated background */}
          <motion.div
            animate={{
              backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5"
            style={{ backgroundSize: '200% 200%' }}
          />
          
          {/* Product image */}
          <motion.div
            animate={{ 
              scale: isHovered ? 1.15 : 1,
              y: isHovered ? -10 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative h-full flex items-center justify-center p-8"
          >
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Floating particles on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -50],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="absolute w-1 h-1 bg-primary rounded-full"
                    style={{ 
                      left: `${20 + i * 15}%`,
                      bottom: '20%',
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          {/* Category tag */}
          <motion.span 
            className="text-xs text-primary font-semibold uppercase tracking-wider"
            animate={{ x: isHovered ? 5 : 0 }}
          >
            {product.subtitle}
          </motion.span>

          <h3 className="text-2xl font-display font-bold text-foreground mt-2 mb-3">
            {product.name}
          </h3>
          
          <p className="text-foreground/60 text-sm mb-5 line-clamp-2">
            {product.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.features.map((feature, i) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-xs bg-muted/50 backdrop-blur-sm text-muted-foreground px-3 py-1.5 rounded-full border border-border/50"
              >
                {feature}
              </motion.span>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 group/btn overflow-hidden relative"
          >
            <span className="relative z-10">Ver Detalhes</span>
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              className="relative z-10"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
            <motion.div
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-r from-secondary to-primary"
            />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Produtos = () => {
  const [activeCategory, setActiveCategory] = useState('todos');
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 0.95]);

  const filteredProducts = activeCategory === 'todos' 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            <motion.div
              style={{ y: backgroundY }}
              className="absolute inset-0 bg-gradient-radial"
            />
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <FloatingParticle key={i} delay={i * 0.3} />
              ))}
            </div>

            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                                  linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            {/* Breadcrumb */}
            <AnimatedSection className="mb-8">
              <div className="flex items-center gap-2 text-sm">
                <Link to="/" className="text-foreground/60 hover:text-primary transition-colors">
                  Home
                </Link>
                <span className="text-foreground/40">/</span>
                <span className="text-primary font-medium">Produtos</span>
              </div>
            </AnimatedSection>

            {/* Title */}
            <AnimatedSection className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-widest mb-6 bg-primary/10 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4" />
                  Catálogo Completo
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6"
              >
                Nossos{' '}
                <span className="text-gradient relative">
                  Produtos
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-primary rounded-full"
                  />
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto mb-12"
              >
                Soluções premium em energia elétrica com tecnologia de ponta e garantia estendida
              </motion.p>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-foreground/40 text-sm">Explore</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-6 h-6 text-primary" />
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </motion.section>

        {/* Category Filter */}
        <section className="sticky top-20 z-30 py-6 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-3 flex-wrap"
            >
              {categories.map((category, index) => {
                const isActive = activeCategory === category.id;
                const Icon = category.icon;
                
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-foreground/60 hover:text-foreground bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 bg-gradient-primary rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{category.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            {/* Results count */}
            <motion.div 
              layout
              className="flex items-center justify-between mb-12"
            >
              <p className="text-foreground/60">
                <span className="text-foreground font-semibold">{filteredProducts.length}</span> produto(s) encontrado(s)
              </p>
            </motion.div>

            {/* Grid */}
            <motion.div 
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10" />
          
          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative bg-card/50 backdrop-blur-xl border border-border rounded-[2rem] p-12 md:p-16 overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-10 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 blur-3xl rounded-full" />
                
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/30"
                  >
                    <Zap className="w-10 h-10 text-primary-foreground" />
                  </motion.div>
                  
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                    Não encontrou o que procura?
                  </h3>
                  <p className="text-foreground/60 mb-8 text-lg">
                    Nossa equipe está pronta para ajudar você a encontrar a solução perfeita para suas necessidades.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.a
                      href="#contato"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    >
                      Fale Conosco
                      <ArrowRight className="w-5 h-5" />
                    </motion.a>
                    
                    <motion.a
                      href="tel:+551100000000"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-muted text-foreground px-8 py-4 rounded-full font-semibold hover:bg-muted/80 transition-all duration-300"
                    >
                      (11) 0000-0000
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Produtos;
