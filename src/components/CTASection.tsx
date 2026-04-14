import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { Wrench, Store, MessageCircle, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const primaryBlocks = [
  {
    icon: Wrench,
    tag: '01 — Assistência',
    title: 'Rede de Assistência Técnica',
    description: 'Encontre o centro de assistência técnica autorizado mais próximo de você. Cobertura em todo o território nacional.',
    cta: 'Buscar Assistência',
    href: '/assistencia',
    wide: true,
  },
  {
    icon: Store,
    tag: '02 — Revendedor',
    title: 'Seja um Revendedor',
    description: 'Faça parte do nosso ecossistema de parceiros e comercialize produtos de alta qualidade com suporte completo.',
    cta: 'Quero Revender',
    href: '/revendedor',
    wide: false,
  },
];

export const CTASection = () => {
  return (
    <section id="cta" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Section header */}
        <AnimatedSection animation="fadeUp" className="mb-14">
          <span className="section-label block mb-4">— Próximos passos</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-display font-extrabold text-foreground leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              COMO PODEMOS{' '}
              <span className="text-primary">AJUDAR?</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-[36ch] leading-relaxed sm:text-right">
              Estamos prontos para atender você onde quer que esteja no Brasil.
            </p>
          </div>
        </AnimatedSection>

        {/* ─── TWO BLOCKS: Asymmetric 60/40 ─── */}
        <div className="grid lg:grid-cols-[60fr_40fr] gap-px bg-border mb-px">
          {primaryBlocks.map((block, i) => (
            <AnimatedSection key={block.tag} animation="fadeUp" delay={i * 0.12}>
              <Link to={block.href} className="group block h-full">
                <motion.div
                  whileHover={{ backgroundColor: 'hsl(220,32%,9%)' }}
                  className="bg-card h-full p-8 lg:p-10 flex flex-col justify-between min-h-[280px] transition-colors duration-200 relative overflow-hidden"
                >
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  {/* Content */}
                  <div>
                    <div className="flex items-start justify-between mb-8">
                      <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                        {block.tag}
                      </span>
                      <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary/40 transition-colors duration-200">
                        <block.icon className="w-4 h-4 text-primary" />
                      </div>
                    </div>

                    <h3
                      className="font-display font-bold text-foreground leading-tight mb-4 group-hover:text-primary transition-colors duration-200"
                      style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                    >
                      {block.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[40ch]">
                      {block.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 mt-8 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200">
                    <span>{block.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* ─── THIRD BLOCK: Fale Conosco — full width ─── */}
        <AnimatedSection animation="fadeUp" delay={0.24}>
          <Link to="/contato" className="group block">
            <motion.div
              whileHover={{ backgroundColor: 'hsl(220,32%,9%)' }}
              className="bg-card p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition-colors duration-200 relative overflow-hidden border-t border-border"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="flex items-center gap-5">
                <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary/40 shrink-0 transition-colors duration-200">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase block mb-1">
                    03 — Contato
                  </span>
                  <h3 className="font-display font-bold text-foreground text-xl group-hover:text-primary transition-colors duration-200">
                    Fale Conosco
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed max-w-[38ch] sm:text-center">
                Tire suas dúvidas com nossa equipe especializada. Atendimento de segunda a sexta.
              </p>

              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200 shrink-0">
                <span>Entrar em Contato</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </motion.div>
          </Link>
        </AnimatedSection>

        {/* ─── CONTACT INFO BAR ─── */}
        <AnimatedSection animation="fadeUp" delay={0.36} className="mt-6">
          <div className="border border-border bg-card/50 px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="flex items-center gap-4">
              <div className="w-9 h-9 border border-border flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">(11) 96846-9454</p>
                <p className="text-muted-foreground text-xs font-mono">Segunda a Sexta, 08h — 17h</p>
              </div>
            </div>

            <div className="h-px md:h-8 w-full md:w-px bg-border" />

            <div className="flex items-center gap-4">
              <div className="w-9 h-9 border border-border flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">Presença Nacional</p>
                <p className="text-muted-foreground text-xs font-mono">Assistência em todo o Brasil</p>
              </div>
            </div>

            <div className="h-px md:h-8 w-full md:w-px bg-border" />

            <Link to="/contato">
              <button className="btn-primary text-sm py-3 px-6 shrink-0">
                Falar com Especialista
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
