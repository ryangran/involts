import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Zap, Shield, Cpu, Plug, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'aterramento', label: 'Aterramento', icon: Plug },
  { id: 'filtro-de-linha', label: 'Filtros de Linha', icon: Shield },
  { id: 'autotransformadores', label: 'Transformadores', icon: Cpu },
  { id: 'protetores', label: 'Protetores', icon: Shield },
];

const products = {
  aterramento: [
    {
      name: 'Aterramento Involts',
      description: 'Sistema de aterramento para proteção elétrica',
      image: 'https://involtsbrasil.com.br/images/two-power-plug.png',
      features: ['Proteção Completa', 'Fácil Instalação', 'Certificado'],
    },
  ],
  autotransformadores: [
    {
      name: 'Auto Transformador',
      description: 'Modelos de 100 a 5000 VA',
      image: 'https://involtsbrasil.com.br/images/produto3.png',
      features: ['100 a 5000 VA', '110V/220V', 'Proteção Térmica'],
    },
  ],
  'filtro-de-linha': [
    {
      name: 'Filtro de Linha ABS',
      description: 'Modelos de 3, 4, 5, 6 e 10 tomadas',
      image: 'https://involtsbrasil.com.br/images/filtro-normal.png',
      features: ['3 a 10 Tomadas', 'Proteção DPS', 'Design Moderno'],
    },
    {
      name: 'Filtro de Linha 20A Metálico',
      description: 'Modelos de 5 tomadas - Alta potência',
      image: 'https://involtsbrasil.com.br/images/filtrometal.png',
      features: ['20A', '5 Tomadas', 'Estrutura Metálica'],
    },
  ],
  protetores: [
    {
      name: 'Protetor Multifuncional',
      description: 'Proteção completa para seus equipamentos',
      image: 'https://involtsbrasil.com.br/images/a9d35e8e2616ac9f7bcf689276694614493.png',
      features: ['Multifuncional', 'DPS Integrado', 'Indicador LED'],
    },
  ],
};

const Produtos = () => {
  const [activeCategory, setActiveCategory] = useState('aterramento');
  const containerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      categoriesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 bg-gradient-radial pointer-events-none"
          />
          
          <div className="container mx-auto px-6 relative z-10">
            {/* Breadcrumb */}
            <AnimatedSection className="mb-8">
              <div className="flex items-center gap-2 text-sm">
                <Link to="/" className="text-foreground/60 hover:text-primary transition-colors">
                  Home
                </Link>
                <span className="text-foreground/40">&gt;</span>
                <span className="text-primary font-medium">Produtos</span>
              </div>
            </AnimatedSection>

            {/* Title */}
            <AnimatedSection className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                Nossos <span className="text-gradient">Produtos</span>
              </h1>
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                Conheça nossa linha completa de soluções em energia elétrica
              </p>
            </AnimatedSection>

            {/* Category Navigation */}
            <AnimatedSection delay={0.2} className="relative mb-16">
              <button
                onClick={() => scrollCategories('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div
                ref={categoriesRef}
                className="flex items-center gap-4 overflow-x-auto scrollbar-hide px-12 py-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border transition-all duration-300 min-w-[120px] ${
                      activeCategory === category.id
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-card border-border text-foreground/60 hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    <category.icon className="w-8 h-8" />
                    <span className="text-sm font-medium whitespace-nowrap">{category.label}</span>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => scrollCategories('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </AnimatedSection>
          </div>
        </section>

        {/* Products by Category */}
        {categories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="py-16 scroll-mt-24"
          >
            <div className="container mx-auto px-6">
              <AnimatedSection className="mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient">
                  {category.label}
                </h2>
              </AnimatedSection>

              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products[category.id as keyof typeof products]?.map((product, index) => (
                  <StaggerItem key={product.name}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="group relative h-full"
                    >
                      {/* Glow effect */}
                      <div className="absolute -inset-1 bg-gradient-primary opacity-0 group-hover:opacity-20 blur-xl rounded-3xl transition-opacity duration-500" />
                      
                      <div className="relative bg-card border border-border rounded-3xl overflow-hidden h-full flex flex-col">
                        {/* Image Container */}
                        <div className="relative aspect-square bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center p-6">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <category.icon className="w-20 h-20 text-primary/40" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-display font-bold text-foreground mb-2">
                            {product.name}
                          </h3>
                          <p className="text-foreground/60 text-sm mb-4 flex-1">
                            {product.description}
                          </p>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {product.features.map((feature) => (
                              <span
                                key={feature}
                                className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>

                          {/* CTA */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                          >
                            Ver Detalhes
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          
          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-card border border-border rounded-3xl p-12 max-w-3xl mx-auto"
              >
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  Precisa de <span className="text-gradient">ajuda?</span>
                </h3>
                <p className="text-foreground/60 mb-8">
                  Fale conosco agora mesmo pelo chat.<br />
                  <span className="text-sm">Horário de atendimento: 08h às 12h e 13h às 17h</span>
                </p>
                <motion.a
                  href="#contato"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                >
                  <Zap className="w-5 h-5" />
                  Fale Conosco
                </motion.a>
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
