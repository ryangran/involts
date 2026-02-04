import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { Shield, Zap, Cpu, Plug, ArrowRight, Sparkles } from 'lucide-react';
import { productsData } from '@/data/products';

const categories = [
  {
    id: 'protetores',
    title: 'Protetores Eletrônicos',
    description: 'Proteção contra surtos e oscilações',
    icon: Shield,
    products: productsData.filter(p => p.categorySlug === 'protetores'),
  },
  {
    id: 'filtros',
    title: 'Filtros de Linha',
    description: 'Filtragem contra interferências',
    icon: Zap,
    products: productsData.filter(p => p.categorySlug === 'filtro-de-linha'),
  },
  {
    id: 'transformadores',
    title: 'Autotransformadores',
    description: 'Conversão de voltagem eficiente',
    icon: Cpu,
    products: productsData.filter(p => p.categorySlug === 'autotransformadores'),
  },
  {
    id: 'aterramento',
    title: 'Aterramento',
    description: 'Sistema de proteção completa',
    icon: Plug,
    products: productsData.filter(p => p.categorySlug === 'aterramento'),
  },
];

const ProductCard = ({ product, index }: { product: typeof productsData[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
    >
      <Link to={`/produto/${product.slug}`}>
        <motion.div
          whileHover={{ y: -6, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)' }}
          transition={{ duration: 0.25 }}
          className="group bg-card border border-border/50 rounded-xl overflow-hidden h-full hover:border-primary/30"
        >
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-muted/80 to-muted p-5 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Content */}
          <div className="p-4">
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-tight">
              {product.name}
            </h4>
            
            <div className="flex items-center gap-1 text-primary text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Ver detalhes
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const CategoryBlock = ({ category, index }: { category: typeof categories[0]; index: number }) => {
  const Icon = category.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="mb-16 last:mb-0"
    >
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
            {category.title}
          </h3>
          <p className="text-foreground/50 text-sm">
            {category.description}
          </p>
        </div>
        <div className="ml-auto">
          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {category.products.length} {category.products.length === 1 ? 'produto' : 'produtos'}
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {category.products.map((product, productIndex) => (
          <ProductCard key={product.id} product={product} index={productIndex} />
        ))}
      </div>
    </motion.div>
  );
};

export const ProductsSection = () => {
  return (
    <section id="produtos" className="relative py-20 md:py-28 bg-background">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-5 py-2 mb-5"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Catálogo Completo
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Nossas <span className="text-gradient">Soluções</span>
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Tecnologia SMD para máxima eficiência e durabilidade em todos os produtos.
          </p>
        </AnimatedSection>

        {/* All Categories */}
        <div className="max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <CategoryBlock key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/produtos">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              Ver Página de Produtos
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
