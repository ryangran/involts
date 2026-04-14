import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Shield, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import videoSrc from '@/assets/protetor-eletronico-involts.mp4';

const stats = [
  { value: '25+', label: 'Anos de mercado' },
  { value: '500+', label: 'Pontos de atendimento' },
  { value: '1.000+', label: 'Parceiros ativos' },
];

const specBadges = [
  { icon: Shield, text: 'Certificado INMETRO' },
  { icon: Award, text: 'Tecnologia SMD' },
  { icon: Zap, text: 'Proteção Ativa' },
];

// Corner bracket SVG element
const CornerBracket = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const transforms = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0 rotate-90',
    bl: 'bottom-0 left-0 -rotate-90',
    br: 'bottom-0 right-0 rotate-180',
  };
  return (
    <svg
      className={`absolute ${transforms[position]} w-8 h-8 text-primary`}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path d="M1 31 L1 1 L31 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Technical grid background */}
      <div className="absolute inset-0 circuit-grid pointer-events-none" />

      {/* Radial vignette — fades grid at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 30% 50%, transparent 40%, hsl(220,40%,5%) 90%)',
        }}
      />

      {/* Left gradient fade so text is always readable */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background via-background/90 to-background/20" />

      {/* Top border accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10"
      >
        <div className="grid lg:grid-cols-[58fr_42fr] items-center gap-12 lg:gap-0 min-h-[100dvh] py-28 lg:py-0">

          {/* ─── LEFT: Content ─── */}
          <motion.div style={{ y: contentY }} className="flex flex-col justify-center lg:pr-16">

            {/* Technical badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="tech-badge w-fit mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              <span>Sistema ativo — 25 anos de proteção</span>
            </motion.div>

            {/* Headline — Barlow Condensed, industrial scale */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold leading-[0.88] tracking-tight text-foreground"
                style={{ fontSize: 'clamp(3.6rem, 9vw, 7.5rem)' }}
              >
                ENERGIA<br />
                <span className="text-primary">PROTEGIDA</span><br />
                EM TODO BRASIL
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-[44ch] font-sans"
            >
              Protetores eletrônicos, filtros de linha e transformadores com{' '}
              <span className="text-foreground font-medium">tecnologia SMD</span> e certificação INMETRO para residências e empresas.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 mb-14"
            >
              <Link to="/produtos">
                <button className="btn-primary group">
                  <span>Ver Produtos</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </Link>
              <Link to="/assistencia">
                <button className="btn-secondary">
                  Rede de Assistência
                </button>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex gap-8 pt-8 border-t border-border"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.5 }}
                >
                  <div className="stat-number text-3xl md:text-4xl mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-xs tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Product Showcase ─── */}
          <motion.div
            style={{ y: videoY }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[460px]">

              {/* Technical frame corners */}
              <div className="relative p-6">
                <CornerBracket position="tl" />
                <CornerBracket position="tr" />
                <CornerBracket position="bl" />
                <CornerBracket position="br" />

                {/* Video container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden"
                  style={{ borderRadius: '4px' }}
                >
                  {/* Scan line overlay */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
                    }}
                  />

                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full object-cover"
                    style={{ aspectRatio: '4/5', filter: 'contrast(1.05) brightness(0.95)' }}
                  >
                    <source src={videoSrc} type="video/mp4" />
                  </video>

                  {/* Bottom gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                </motion.div>
              </div>

              {/* Spec badges — floating */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute -right-8 top-16 flex flex-col gap-2"
              >
                {specBadges.map((badge) => (
                  <div
                    key={badge.text}
                    className="glass-panel flex items-center gap-2 px-3 py-2 whitespace-nowrap"
                  >
                    <badge.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Status indicator — bottom-left */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute -bottom-2 left-6 glass-panel flex items-center gap-2 px-3 py-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Sistema Ativo
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Vertical accent line — decorative */}
      <div className="absolute right-[42%] top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden xl:block pointer-events-none" />
    </section>
  );
};
