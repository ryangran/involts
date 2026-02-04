import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { MapPin, Users, Headphones, Clock } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Presença Nacional',
    description: 'Rede de assistência técnica em todo o Brasil',
    stat: '500+',
    statLabel: 'Pontos de atendimento',
  },
  {
    icon: Users,
    title: 'Revendedores',
    description: 'Parceiros autorizados em todas as regiões',
    stat: '1.000+',
    statLabel: 'Parceiros ativos',
  },
  {
    icon: Headphones,
    title: 'Suporte Técnico',
    description: 'Equipe especializada para tirar suas dúvidas',
    stat: '24/7',
    statLabel: 'Disponibilidade',
  },
  {
    icon: Clock,
    title: 'Garantia Estendida',
    description: 'Proteção adicional para sua tranquilidade',
    stat: '2 anos',
    statLabel: 'De garantia',
  },
];

export const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <section
      id="sobre"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-muted/30"
    >
      {/* Animated Lines */}
      <motion.div
        style={{ x: x1 }}
        className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
      <motion.div
        style={{ x: x2 }}
        className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
            Por que escolher a Involts
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Confiança que{' '}
            <span className="text-gradient">energiza</span>
          </h2>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection
              key={feature.title}
              delay={index * 0.15}
              animation="fadeUp"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-shadow duration-300"
                >
                  <feature.icon className="w-10 h-10 text-primary-foreground" />
                </motion.div>

                {/* Stat */}
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                  {feature.stat}
                </div>
                <div className="text-sm text-foreground/50 mb-4">
                  {feature.statLabel}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
