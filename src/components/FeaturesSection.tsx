import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { Shield, Award, Zap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '500+', label: 'Pontos de atendimento', sub: 'em todo o Brasil' },
  { value: '1.000+', label: 'Parceiros ativos', sub: 'revendedores autorizados' },
  { value: '25+', label: 'Anos de mercado', sub: 'desde 1999' },
  { value: '24/7', label: 'Suporte técnico', sub: 'disponibilidade total' },
];

const benefits = [
  {
    icon: Shield,
    title: 'Proteção certificada INMETRO',
    description: 'Todos os produtos passam por rigoroso controle de qualidade e certificação nacional.',
  },
  {
    icon: Award,
    title: 'Tecnologia SMD de ponta',
    description: 'Componentes Surface Mount Device garantem maior durabilidade e desempenho.',
  },
  {
    icon: Zap,
    title: 'Eficiência energética máxima',
    description: 'Redução de perdas na conversão e filtragem elétrica com circuitos otimizados.',
  },
  {
    icon: MapPin,
    title: 'Presença nacional',
    description: 'Rede de assistência técnica autorizada distribuída em todo o território brasileiro.',
  },
];

// Ticker / marquee de certificações
const certifications = [
  'Certificado INMETRO',
  'Tecnologia SMD',
  'ISO 9001',
  'Proteção DPS',
  'NBR 14136',
  'Garantia 12 meses',
  'Assistência Nacional',
  'Desde 1999',
];

export const FeaturesSection = () => {
  return (
    <section id="sobre" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* ─── MAIN SPLIT LAYOUT ─── */}
        <div className="grid lg:grid-cols-[46fr_54fr] gap-16 lg:gap-20 items-start">

          {/* LEFT: Text + Benefits */}
          <div>
            <AnimatedSection animation="fadeUp">
              <span className="section-label block mb-5">— Por que a Involts</span>
              <h2
                className="font-display font-extrabold text-foreground leading-[0.88] tracking-tight mb-6"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
              >
                CONFIANÇA QUE{' '}
                <span className="text-primary">ENERGIZA</span>{' '}
                HÁ DÉCADAS
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed max-w-[48ch] mb-10">
                Há mais de duas décadas entregando qualidade e segurança para milhões de brasileiros.
                Nossa engenharia protege desde residências até ambientes industriais.
              </p>
            </AnimatedSection>

            {/* Benefits list */}
            <div className="space-y-0">
              {benefits.map((benefit, i) => (
                <AnimatedSection key={benefit.title} animation="slideLeft" delay={i * 0.08}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex gap-4 py-5 border-b border-border group"
                  >
                    <div className="shrink-0 w-8 h-8 border border-border flex items-center justify-center group-hover:border-primary/40 transition-colors duration-200 mt-0.5">
                      <benefit.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground text-base mb-0.5 group-hover:text-primary transition-colors duration-200">
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection animation="fadeUp" delay={0.4} className="mt-10">
              <Link to="/sobre">
                <button className="btn-secondary group">
                  Conheça nossa história
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </button>
              </Link>
            </AnimatedSection>
          </div>

          {/* RIGHT: Stats grid */}
          <AnimatedSection animation="slideRight" delay={0.15}>
            <div className="grid grid-cols-2 gap-px bg-border">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ backgroundColor: 'hsl(220,32%,10%)' }}
                  className="bg-card p-8 flex flex-col justify-between min-h-[180px] transition-colors duration-200"
                >
                  {/* Large monospace number */}
                  <div
                    className="stat-number leading-none mb-4"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
                  >
                    {stat.value}
                  </div>

                  {/* Label & sub */}
                  <div>
                    <div className="font-display font-semibold text-foreground text-base mb-1">
                      {stat.label}
                    </div>
                    <div className="text-muted-foreground text-xs font-mono tracking-wide">
                      {stat.sub}
                    </div>
                  </div>

                  {/* Index marker */}
                  <div className="absolute top-4 right-4 font-mono text-[10px] text-border">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Technical note below grid */}
            <div className="mt-4 flex items-start gap-3 px-1">
              <div className="w-px h-8 bg-primary/50 shrink-0 mt-1" />
              <p className="text-muted-foreground text-xs leading-relaxed font-mono">
                Dados referentes à rede ativa de distribuição e assistência técnica
                autorizada Involts Brasil — atualizado 2024.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* ─── CERTIFICATIONS TICKER ─── */}
      <div className="mt-20 border-t border-b border-border py-4 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-0 w-[200%] animate-marquee">
          {[...certifications, ...certifications].map((cert, i) => (
            <div key={i} className="flex items-center gap-6 shrink-0 px-6">
              <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase whitespace-nowrap">
                {cert}
              </span>
              <span className="text-primary/30 text-xs">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
