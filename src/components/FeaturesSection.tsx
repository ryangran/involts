import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { MapPin, Users, Headphones, Clock, Shield, Award, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: MapPin,
    title: 'Presença Nacional',
    description: 'Rede de assistência técnica em todo o Brasil',
    stat: '500+',
    statLabel: 'Pontos de atendimento',
    color: 'from-primary to-secondary',
  },
  {
    icon: Users,
    title: 'Revendedores',
    description: 'Parceiros autorizados em todas as regiões',
    stat: '1.000+',
    statLabel: 'Parceiros ativos',
    color: 'from-secondary to-primary',
  },
  {
    icon: Headphones,
    title: 'Suporte Técnico',
    description: 'Equipe especializada para tirar suas dúvidas',
    stat: '24/7',
    statLabel: 'Disponibilidade',
    color: 'from-primary to-secondary',
  },
  {
    icon: Clock,
    title: 'Garantia Estendida',
    description: 'Proteção adicional para sua tranquilidade',
    stat: '1 ano',
    statLabel: 'De garantia',
    color: 'from-secondary to-primary',
  },
];

const benefits = [
  { icon: Shield, text: 'Proteção certificada INMETRO' },
  { icon: Award, text: 'Tecnologia SMD de ponta' },
  { icon: Zap, text: 'Eficiência energética máxima' },
  { icon: Star, text: '25 anos de tradição' },
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
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full px-6 py-3 mb-6"
          >
            <Award className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Por que escolher a Involts
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Confiança que{' '}
            <span className="text-gradient">energiza</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Há mais de duas décadas entregando qualidade e segurança para milhões de brasileiros
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <AnimatedSection
              key={feature.title}
              delay={index * 0.1}
              animation="fadeUp"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 text-center group overflow-hidden"
              >
                {/* Background glow on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-shadow duration-300`}
                >
                  <feature.icon className="w-10 h-10 text-primary-foreground" />
                </motion.div>

                {/* Stat */}
                <motion.div 
                  className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {feature.stat}
                </motion.div>
                <div className="text-sm text-foreground/50 mb-4">
                  {feature.statLabel}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Benefits Bar */}
        <AnimatedSection>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-card via-muted to-card border border-border rounded-3xl p-8 md:p-10"
          >
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground/80 font-medium group-hover:text-foreground transition-colors">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <Link to="/sobre">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold"
            >
              Conheça nossa história
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};
