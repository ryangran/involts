import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { Shield, Zap, Cpu, Plug, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { productsData } from '@/data/products';

const categories = [
  {
    id: 'protetores',
    title: 'Protetor Eletrônico',
    description: 'Proteção inteligente contra surtos, raios e oscilações',
    icon: Shield,
    gradient: 'from-orange-500 via-amber-500 to-yellow-400',
    bgImage: 'bg-gradient-to-br from-orange-500/20 to-amber-500/10',
    products: productsData.filter(p => p.categorySlug === 'protetores'),
  },
  {
    id: 'filtros',
    title: 'Filtros de Linha',
    description: 'Filtragem avançada contra interferências',
    icon: Zap,
    gradient: 'from-blue-500 via-cyan-500 to-teal-400',
    bgImage: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/10',
    products: productsData.filter(p => p.categorySlug === 'filtro-de-linha'),
  },
  {
    id: 'transformadores',
    title: 'Autotransformadores',
    description: 'Conversão de voltagem com máxima eficiência',
    icon: Cpu,
    gradient: 'from-purple-500 via-violet-500 to-indigo-400',
    bgImage: 'bg-gradient-to-br from-purple-500/20 to-violet-500/10',
    products: productsData.filter(p => p.categorySlug === 'autotransformadores'),
  },
  {
    id: 'aterramento',
    title: 'Aterramento',
    description: 'Sistema inteligente de proteção completa',
    icon: Plug,
    gradient: 'from-emerald-500 via-green-500 to-lime-400',
    bgImage: 'bg-gradient-to-br from-emerald-500/20 to-green-500/10',
    products: productsData.filter(p => p.categorySlug === 'aterramento'),
  },
];

const CategoryCard = ({ category, index }: { category: typeof categories[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to="/produtos">
        <div className={`relative overflow-hidden rounded-3xl ${category.bgImage} backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-white/20`}>
          {/* Animated gradient overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          />
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            animate={{ x: isHovered ? '200%' : '-100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            {/* Icon container */}
            <motion.div
              animate={{ 
                rotate: isHovered ? 10 : 0,
                scale: isHovered ? 1.1 : 1 
              }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${category.gradient} p-[2px] shadow-2xl`}
            >
              <div className="w-full h-full rounded-2xl bg-background/90 flex items-center justify-center">
                <category.icon className={`w-12 h-12 md:w-16 md:h-16 text-transparent bg-gradient-to-br ${category.gradient} bg-clip-text`} style={{ stroke: 'url(#gradient)', strokeWidth: 1.5 }} />
                <category.icon className={`w-12 h-12 md:w-16 md:h-16 absolute bg-gradient-to-br ${category.gradient} bg-clip-text`} strokeWidth={1.5} stroke="currentColor" style={{ color: 'hsl(var(--primary))' }} />
              </div>
              
              {/* Glow effect */}
              <motion.div
                className={`absolute -inset-4 bg-gradient-to-br ${category.gradient} opacity-20 blur-2xl rounded-full`}
                animate={{ scale: isHovered ? 1.3 : 1, opacity: isHovered ? 0.4 : 0.2 }}
              />
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.span 
                className={`inline-block text-xs font-bold uppercase tracking-widest mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
              >
                {category.products.length} {category.products.length === 1 ? 'produto' : 'produtos'}
              </motion.span>
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              
              <p className="text-foreground/60 text-lg max-w-md">
                {category.description}
              </p>

              {/* Products preview */}
              <div className="flex items-center gap-3 mt-6 justify-center md:justify-start">
                <div className="flex -space-x-3">
                  {category.products.slice(0, 3).map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="w-12 h-12 rounded-full border-2 border-background bg-muted overflow-hidden shadow-lg"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </motion.div>
                  ))}
                </div>
                {category.products.length > 3 && (
                  <span className="text-sm text-foreground/50 font-medium">
                    +{category.products.length - 3} mais
                  </span>
                )}
              </div>
            </div>

            {/* Arrow */}
            <motion.div
              animate={{ x: isHovered ? 10 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-xl`}
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Bottom gradient line */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export const ProductsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      id="produtos"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-radial pointer-events-none"
      />
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full px-6 py-3 mb-6"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Nossos Produtos
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Soluções em{' '}
            <span className="text-gradient">Energia</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Tecnologia de ponta com placas montadas em SMD para máxima eficiência e durabilidade. 
            Explore nossas categorias.
          </p>
        </AnimatedSection>

        {/* Categories Grid */}
        <div className="grid gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <AnimatedSection delay={0.4} className="text-center mt-16">
          <Link to="/produtos">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary text-primary-foreground px-10 py-5 rounded-full font-bold text-lg inline-flex items-center gap-3 shadow-2xl"
            >
              <Sparkles className="w-5 h-5" />
              Ver Todos os Produtos
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </AnimatedSection>

        {/* SMD Technology Badge */}
        <AnimatedSection delay={0.5} className="mt-24">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-r from-card via-muted to-card border border-border rounded-3xl p-8 md:p-12 max-w-5xl mx-auto overflow-hidden"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0"
              >
                <Cpu className="w-12 h-12 text-primary-foreground" />
              </motion.div>
              
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Tecnologia SMD
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                  Ainda mais tecnologia em cada produto
                </h3>
                <p className="text-foreground/60 max-w-xl">
                  Placas montadas em SMD (Surface Mount Device) garantem maior confiabilidade, 
                  menor consumo de energia e vida útil prolongada para todos os nossos equipamentos.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};
