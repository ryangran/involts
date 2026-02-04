import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { Wrench, Store, MessageCircle } from 'lucide-react';

const cards = [
  {
    icon: Wrench,
    title: 'Rede de Assistência',
    description: 'Procure a assistência técnica mais próxima de você',
    cta: 'Buscar Assistência',
    href: '#assistencia',
    gradient: 'from-primary to-secondary',
  },
  {
    icon: Store,
    title: 'Seja um Revendedor',
    description: 'Faça parte do nosso time e revenda equipamentos seguros e de alta qualidade',
    cta: 'Quero Revender',
    href: '#revendedor',
    gradient: 'from-secondary to-primary',
  },
  {
    icon: MessageCircle,
    title: 'Precisa de Ajuda?',
    description: 'Fale conosco agora mesmo pelo WhatsApp. Atendimento: 08h às 12h e 13h às 17h',
    cta: 'Chamar no WhatsApp',
    href: '#contato',
    gradient: 'from-primary to-secondary',
  },
];

export const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="assistencia"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial" />
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
            Próximos Passos
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
            Como podemos{' '}
            <span className="text-gradient">ajudar?</span>
          </h2>
        </AnimatedSection>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <AnimatedSection
              key={card.title}
              delay={index * 0.2}
              animation="scale"
            >
              <motion.a
                href={card.href}
                whileHover={{ y: -10, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group block h-full"
              >
                <div className="relative h-full">
                  {/* Glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-30 blur-xl rounded-3xl transition-opacity duration-500`} />
                  
                  <div className="relative bg-card border border-border rounded-3xl p-8 h-full flex flex-col text-center overflow-hidden">
                    {/* Background Pattern */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`} />
                    
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <card.icon className="w-10 h-10 text-primary-foreground" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                      {card.title}
                    </h3>
                    <p className="text-foreground/60 mb-8 flex-grow">
                      {card.description}
                    </p>

                    {/* CTA Button */}
                    <div className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r ${card.gradient} text-primary-foreground px-6 py-3 rounded-full font-semibold group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300`}>
                      {card.cta}
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.a>
            </AnimatedSection>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
