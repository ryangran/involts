import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { Shield, Zap, Cpu, Plug, ArrowRight, Sparkles } from 'lucide-react';
import { productsData } from '@/data/products';

const categories = [
  { id: 'protetores', title: 'Protetores', icon: Shield },
  { id: 'filtros', title: 'Filtros', icon: Zap },
  { id: 'transformadores', title: 'Autotransf.', icon: Cpu },
  { id: 'aterramento', title: 'Aterramento', icon: Plug },
];

const ProductCard = ({ product }: { product: typeof productsData[0] }) => {
  return (
    <Link to={`/produto/${product.slug}`}>
      <motion.div
        whileHover={{ y: -6, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)' }}
        transition={{ duration: 0.25 }}
        className="group bg-card border border-border/50 rounded-xl overflow-hidden h-full hover:border-primary/30 w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0"
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
          <span className="text-xs text-primary font-medium">{product.category}</span>
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-tight mt-1">
            {product.name}
          </h4>
          
          <div className="flex items-center gap-1 text-primary text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Ver detalhes
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// Duplicar produtos para loop infinito
const duplicatedProducts = [...productsData, ...productsData, ...productsData];

export const ProductsSection = () => {
  return (
    <section id="produtos" className="relative py-20 md:py-28 bg-background">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-10">
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

        {/* Category Icons */}
        <div className="flex justify-center gap-3 md:gap-6 mb-10 flex-wrap">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
              <cat.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/70">{cat.title}</span>
            </div>
          ))}
        </div>

        {/* Infinite Scrolling Carousel */}
        <div className="max-w-6xl mx-auto mb-10">
          <p className="text-foreground/50 text-sm mb-6 text-center">
            {productsData.length} produtos
          </p>

          {/* Carousel Container */}
          <div className="overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling track */}
            <motion.div
              className="flex gap-4"
              animate={{ x: [0, -((productsData.length) * 236)] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: productsData.length * 3,
                  ease: "linear",
                },
              }}
              whileHover={{ animationPlayState: "paused" }}
              style={{ width: "fit-content" }}
            >
              {duplicatedProducts.map((product, index) => (
                <ProductCard key={`${product.id}-${index}`} product={product} />
              ))}
            </motion.div>
          </div>
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
