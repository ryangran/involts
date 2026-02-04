import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { Shield, Zap, Cpu, Plug, ArrowRight, Sparkles } from 'lucide-react';
import { productsData } from '@/data/products';

const categories = [
  {
    id: 'protetores',
    title: 'Protetores',
    fullTitle: 'Protetor Eletrônico',
    icon: Shield,
    products: productsData.filter(p => p.categorySlug === 'protetores'),
  },
  {
    id: 'filtros',
    title: 'Filtros',
    fullTitle: 'Filtros de Linha',
    icon: Zap,
    products: productsData.filter(p => p.categorySlug === 'filtro-de-linha'),
  },
  {
    id: 'transformadores',
    title: 'Autotransf.',
    fullTitle: 'Autotransformadores',
    icon: Cpu,
    products: productsData.filter(p => p.categorySlug === 'autotransformadores'),
  },
  {
    id: 'aterramento',
    title: 'Aterramento',
    fullTitle: 'Aterramento',
    icon: Plug,
    products: productsData.filter(p => p.categorySlug === 'aterramento'),
  },
];

const ProductCard = ({ product, index }: { product: typeof productsData[0]; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
    >
      <Link to={`/produto/${product.slug}`}>
        <motion.div
          whileHover={{ y: -8 }}
          className="group relative bg-card border border-border rounded-2xl overflow-hidden h-full"
        >
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 p-6 relative overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain relative z-10"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Content */}
          <div className="p-5">
            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h4>
            <p className="text-sm text-foreground/50 mt-1 line-clamp-1">
              {product.description}
            </p>
            
            <div className="flex items-center gap-1 text-primary text-sm font-medium mt-3 group-hover:gap-2 transition-all">
              Ver produto
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = categories[activeTab];

  return (
    <section id="produtos" className="relative py-24 md:py-32 overflow-hidden bg-muted/30">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-5 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Catálogo
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
            Nossos <span className="text-gradient">Produtos</span>
          </h2>
        </AnimatedSection>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-card border border-border rounded-2xl p-2 gap-2 flex-wrap justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === index 
                    ? 'text-primary-foreground' 
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-primary rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <category.icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10 hidden sm:inline">{category.title}</span>
                <span className="relative z-10 text-xs bg-background/20 px-2 py-0.5 rounded-full">
                  {category.products.length}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Category Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {activeCategory.fullTitle}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Products Grid */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {activeCategory.products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View All CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/produtos">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-bold inline-flex items-center gap-2"
            >
              Ver Linha Completa
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* SMD Badge */}
        <AnimatedSection delay={0.3} className="mt-20">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Cpu className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  Tecnologia SMD em todos os produtos
                </h4>
                <p className="text-foreground/60">
                  Maior confiabilidade, menor consumo e vida útil prolongada.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
