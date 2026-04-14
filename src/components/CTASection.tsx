import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { Wrench, Store, MessageCircle, Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSpotlight } from '@/hooks/useSpotlight';

const cards = [
  {
    icon: Wrench,
    title: 'Rede de Assistência',
    description: 'Encontre a assistência técnica autorizada mais próxima de você em todo o Brasil',
    cta: 'Buscar Assistência',
    href: '/assistencia',
    gradient: 'from-primary to-secondary',
    delay: 0,
  },
  {
    icon: Store,
    title: 'Seja um Revendedor',
    description: 'Faça parte do nosso time e revenda equipamentos de alta qualidade com suporte completo',
    cta: 'Quero Revender',
    href: '/revendedor',
    gradient: 'from-secondary to-primary',
    delay: 0.1,
  },
  {
    icon: MessageCircle,
    title: 'Fale Conosco',
    description: 'Tire suas dúvidas com nossa equipe especializada. Atendimento de segunda a sexta',
    cta: 'Entrar em Contato',
    href: '/contato',
    gradient: 'from-primary to-secondary',
    delay: 0.2,
  },
];

export const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { onMouseMove } = useSpotlight();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="contato"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial" />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full px-6 py-3 mb-6"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Próximos Passos
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
            Como podemos{' '}
            <span className="text-gradient">ajudar?</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-xl mx-auto">
            Estamos prontos para atender você em todo o Brasil
          </p>
        </AnimatedSection>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {cards.map((card, index) => (
            <AnimatedSection
              key={card.title}
              delay={card.delay}
              animation="scale"
            >
              <Link to={card.href}>
                <motion.div
                  whileHover={{ y: -15, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group h-full"
                >
                  <div className="relative h-full">
                    {/* Glow */}
                    <motion.div 
                      className={`absolute -inset-1 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-30 blur-xl rounded-3xl transition-all duration-500`}
                    />
                    
                    <div onMouseMove={onMouseMove} className="spotlight-card relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 h-full flex flex-col text-center overflow-hidden">
                      {/* Top gradient line */}
                      <motion.div 
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: card.delay + 0.3, duration: 0.6 }}
                      />
                      
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                        className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg shadow-primary/20`}
                      >
                        <card.icon className="w-10 h-10 text-primary-foreground" />
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-foreground/60 mb-8 flex-grow">
                        {card.description}
                      </p>

                      {/* CTA Button */}
                      <motion.div 
                        className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r ${card.gradient} text-primary-foreground px-6 py-3 rounded-full font-semibold group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {card.cta}
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Contact Info Bar */}
        <AnimatedSection delay={0.4}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient rounded-3xl p-1"
          >
            <div className="bg-card rounded-[22px] p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center"
                  >
                    <Phone className="w-7 h-7 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <p className="text-foreground font-semibold text-lg">Atendimento</p>
                    <p className="text-foreground/60">Segunda a Sexta, 08h às 17h</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-lg">Presença Nacional</p>
                    <p className="text-foreground/60">Assistência em todo o Brasil</p>
                  </div>
                </div>

                <Link to="/contato">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold flex items-center gap-2"
                  >
                    Falar com Especialista
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </motion.div>
    </section>
  );
};
