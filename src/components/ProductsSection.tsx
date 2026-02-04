import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';
import { Shield, Zap, Cpu, Plug, ArrowRight, Sparkles } from 'lucide-react';
import { productsData } from '@/data/products';

const categories = [
  {
    id: 'protetores',
    title: 'Protetor Eletrônico',
    description: 'Proteção inteligente contra surtos, raios e oscilações para seus equipamentos',
    icon: Shield,
    color: 'from-primary via-primary to-secondary',
    bgGlow: 'bg-primary/20',
    products: productsData.filter(p => p.categorySlug === 'protetores'),
  },
  {
    id: 'filtros',
    title: 'Filtros de Linha',
    description: 'Filtragem avançada contra interferências e proteção DPS integrada',
    icon: Zap,
    color: 'from-secondary via-secondary to-primary',
    bgGlow: 'bg-secondary/20',
    products: productsData.filter(p => p.categorySlug === 'filtro-de-linha'),
  },
  {
    id: 'transformadores',
    title: 'Autotransformadores',
    description: 'Conversão de voltagem com máxima eficiência e proteção térmica',
    icon: Cpu,
    color: 'from-primary via-secondary to-primary',
    bgGlow: 'bg-primary/20',
    products: productsData.filter(p => p.categorySlug === 'autotransformadores'),
  },
  {
    id: 'aterramento',
    title: 'Aterramento',
    description: 'Sistema inteligente de aterramento para proteção completa',
    icon: Plug,
    color: 'from-secondary via-primary to-secondary',
    bgGlow: 'bg-secondary/20',
    products: productsData.filter(p => p.categorySlug === 'aterramento'),
  },
];

const ProductCard = ({ product, index }: { product: typeof productsData[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      <Link to={`/produto/${product.slug}`}>
        <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted p-6 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain relative z-10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.4 }}
            />
            {/* Glow effect on hover */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Product Info */}
          <div className="p-5">
            <span className="text-xs text-primary font-semibold uppercase tracking-wider">
              {product.category}
            </span>
            <h4 className="text-lg font-display font-bold text-foreground mt-1 group-hover:text-primary transition-colors">
              {product.name}
            </h4>
            <p className="text-sm text-foreground/60 mt-1 line-clamp-2">
              {product.description}
            </p>
            <motion.div 
              className="flex items-center gap-2 text-primary font-semibold text-sm mt-3"
              whileHover={{ x: 5 }}
            >
              Ver detalhes
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const CategorySection = ({ category, index }: { category: typeof categories[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Category Header */}
      <motion.div
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.01 }}
        className="cursor-pointer group"
      >
        <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 overflow-hidden">
          {/* Background glow */}
          <motion.div
            className={`absolute -top-20 -right-20 w-60 h-60 ${category.bgGlow} rounded-full blur-3xl`}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg shadow-primary/20`}
              >
                <category.icon className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-foreground/60 mt-1 max-w-md">
                  {category.description}
                </p>
              </div>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"
            >
              <ArrowRight className={`w-5 h-5 text-primary transform ${isExpanded ? 'rotate-90' : ''}`} />
            </motion.div>
          </div>

          {/* Product count badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              {category.products.length} {category.products.length === 1 ? 'produto' : 'produtos'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
          marginTop: isExpanded ? 24 : 0
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.products.map((product, productIndex) => (
            <ProductCard key={product.id} product={product} index={productIndex} />
          ))}
        </div>
        
        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          className="text-center mt-8"
        >
          <Link to="/produtos">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Ver linha completa
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
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
      
      {/* Animated grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

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
            Clique em cada categoria para explorar.
          </p>
        </AnimatedSection>

        {/* Categories */}
        <div className="space-y-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <CategorySection key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* SMD Technology Badge */}
        <AnimatedSection delay={0.4} className="mt-24">
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
              
              <div className="text-center md:text-left">
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

              <Link to="/produtos" className="flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold flex items-center gap-2"
                >
                  Explorar Tudo
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};
