import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { Shield, Zap, Cpu, Plug, ArrowRight } from 'lucide-react';
import { productsData } from '@/data/products';

const categories = [
  { id: 'protetores', title: 'Protetores', icon: Shield },
  { id: 'filtros', title: 'Filtros de Linha', icon: Zap },
  { id: 'transformadores', title: 'Autotransf.', icon: Cpu },
  { id: 'aterramento', title: 'Aterramento', icon: Plug },
];

const ProductCard = ({ product }: { product: typeof productsData[0] }) => {
  return (
    <Link to={`/produto/${product.slug}`}>
      <div className="product-card group w-[190px] sm:w-[210px] flex-shrink-0 overflow-hidden">
        {/* Image area */}
        <div className="relative h-[160px] bg-card flex items-center justify-center p-5 border-b border-border overflow-hidden">
          {product.highlight && (
            <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-widest text-primary border border-primary/30 bg-primary/8 px-2 py-0.5">
              Destaque
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <span className="section-label text-[9px] block mb-1">{product.category}</span>
          <h4 className="font-display font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors duration-200 mb-3">
            {product.name}
          </h4>
          <div className="flex items-center gap-1 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span>Detalhes</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  );
};

// Triple-duplicate for seamless infinite loop
const loopProducts = [...productsData, ...productsData, ...productsData];

export const ProductsSection = () => {
  return (
    <section id="produtos" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle top separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Background grid (very subtle) */}
      <div className="absolute inset-0 circuit-grid-dense opacity-[0.015] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">

        {/* Header — left-aligned, not centered */}
        <AnimatedSection animation="fadeUp" className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="section-label block mb-4">— Catálogo</span>
              <h2
                className="font-display font-extrabold text-foreground leading-[0.9] tracking-tight"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
              >
                NOSSAS<br />
                <span className="text-primary">SOLUÇÕES</span>
              </h2>
            </div>
            <div className="sm:text-right">
              <p className="text-muted-foreground text-sm max-w-[32ch] sm:ml-auto leading-relaxed">
                Tecnologia SMD para máxima eficiência e durabilidade em todos os produtos.
              </p>
              <Link to="/produtos">
                <motion.button
                  whileHover={{ x: 4 }}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-primary font-medium group"
                >
                  Ver catálogo completo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Category chips */}
        <AnimatedSection animation="fadeIn" delay={0.15} className="mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-2 px-3 py-1.5 border border-border text-muted-foreground text-xs font-mono tracking-wider uppercase"
              >
                <cat.icon className="w-3 h-3 text-primary" />
                {cat.title}
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Infinite scroll carousel */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <motion.div
            className="flex gap-4 w-fit"
            animate={{ x: [0, -(productsData.length * 226)] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: productsData.length * 3.2,
                ease: 'linear',
              },
            }}
            whileHover={{ animationPlayState: 'paused' } as never}
          >
            {loopProducts.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
          </motion.div>
        </div>

        {/* Bottom count + CTA */}
        <AnimatedSection animation="fadeUp" delay={0.2} className="mt-10 flex items-center justify-between">
          <span className="font-mono text-muted-foreground text-xs">
            {productsData.length} produtos no catálogo
          </span>
          <Link to="/produtos">
            <button className="btn-primary text-sm py-3 px-6">
              Ver todos os produtos
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </AnimatedSection>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mt-24" />
    </section>
  );
};
