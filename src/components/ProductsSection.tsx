import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';
import { Battery, Zap, Shield, Cpu } from 'lucide-react';

const products = [
  {
    title: 'Nobreaks',
    description: 'Linha senoidal com proteção total para seus equipamentos',
    icon: Battery,
    color: 'from-primary to-secondary',
    features: ['Senoidal Puro', 'Portão Eletrônico', 'Alta Potência'],
  },
  {
    title: 'Estabilizadores',
    description: 'Estabilização precisa da tensão elétrica',
    icon: Zap,
    color: 'from-secondary to-primary',
    features: ['Microprocessado', 'Display Digital', 'Proteção Total'],
  },
  {
    title: 'Filtros de Linha',
    description: 'Proteção contra surtos e interferências',
    icon: Shield,
    color: 'from-primary to-secondary',
    features: ['8 Tomadas', 'DPS Integrado', 'Garantia Estendida'],
  },
  {
    title: 'Autotransformadores',
    description: 'Conversão de voltagem com eficiência',
    icon: Cpu,
    color: 'from-secondary to-primary',
    features: ['110V/220V', 'Proteção Térmica', 'Bivolt'],
  },
];

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

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
            Nossos Produtos
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Conheça nossos{' '}
            <span className="text-gradient">Lançamentos</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Tecnologia de ponta com placas montadas em SMD para máxima eficiência e durabilidade
          </p>
        </AnimatedSection>

        {/* Products Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <StaggerItem key={product.title}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-primary opacity-0 group-hover:opacity-20 blur-xl rounded-3xl transition-opacity duration-500" />
                
                <div className="relative bg-card border border-border rounded-3xl p-8 h-full overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${product.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <product.icon className="w-8 h-8 text-primary-foreground" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                    {product.title}
                  </h3>
                  <p className="text-foreground/60 mb-6">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <motion.a
                    href="#"
                    className="inline-flex items-center gap-2 text-primary font-semibold group/link"
                  >
                    Ver linha completa
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* SMD Technology Badge */}
        <AnimatedSection delay={0.4} className="mt-20">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-muted via-card to-muted border border-border rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-radial opacity-50" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Cpu className="w-4 h-4" />
                Tecnologia SMD
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Ainda mais tecnologia
              </h3>
              <p className="text-foreground/60 max-w-xl mx-auto">
                Placas montadas em SMD (Surface Mount Device) garantem maior confiabilidade, 
                menor consumo de energia e vida útil prolongada para todos os nossos equipamentos.
              </p>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};
