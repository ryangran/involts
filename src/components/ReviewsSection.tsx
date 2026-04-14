import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Star, Zap, Shield, Cpu } from 'lucide-react';

const reviews = [
  {
    name: 'Carlos Alberto',
    role: 'Loja de Informática',
    city: 'São Paulo, SP',
    text: '10 anos com Involts. Qualidade excepcional, clientes confiam na marca.',
    stars: 5,
    icon: Shield,
  },
  {
    name: 'Maria Fernanda',
    role: 'Gerente de Compras',
    city: 'Belo Horizonte, MG',
    text: 'Baixíssimo índice de retorno e margem de lucro excelente. Recomendo!',
    stars: 5,
    icon: Zap,
  },
  {
    name: 'Roberto Santos',
    role: 'Assistência Técnica',
    city: 'Curitiba, PR',
    text: 'Produtos bem construídos, documentação completa e suporte sempre presente.',
    stars: 5,
    icon: Cpu,
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
    ))}
  </div>
);

// Floating card that flies out from the phone
const ReviewCard = ({
  review,
  delay,
  x,
  y,
  rotate,
}: {
  review: typeof reviews[0];
  delay: number;
  x: string;
  y: string;
  rotate: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.6, x: '0%', y: '60%', rotate: 0 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, x, y, rotate }
          : { opacity: 0, scale: 0.6, x: '0%', y: '60%', rotate: 0 }
      }
      transition={{
        delay,
        duration: 0.9,
        type: 'spring',
        stiffness: 80,
        damping: 18,
      }}
      className="absolute z-20 w-[220px] bg-card/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-2xl shadow-black/40"
      style={{ left: '50%', top: '50%', marginLeft: '-110px', marginTop: '-60px' }}
    >
      <div className="flex items-start gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
          <review.icon className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground leading-tight">{review.name}</p>
          <p className="text-[10px] text-foreground/50 leading-tight">{review.role} · {review.city}</p>
        </div>
      </div>
      <Stars count={review.stars} />
      <p className="text-xs text-foreground/70 mt-2 leading-relaxed">"{review.text}"</p>
    </motion.div>
  );
};

// Phone mockup with Involts orange palette
const PhoneMockup = ({ inView }: { inView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7, y: 40 }}
    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
    transition={{ duration: 1, type: 'spring', stiffness: 80, damping: 18 }}
    className="relative w-[200px] h-[400px] flex-shrink-0"
  >
    {/* Outer glow */}
    <div className="absolute inset-0 rounded-[36px] bg-gradient-to-b from-primary/20 to-secondary/10 blur-xl scale-110" />

    {/* Phone body */}
    <div className="relative w-full h-full rounded-[36px] bg-gradient-to-b from-[hsl(20,14%,10%)] to-[hsl(20,10%,7%)] border border-primary/30 shadow-2xl shadow-primary/20 overflow-hidden">
      {/* Top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-primary rounded-t-[36px]" />

      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-[hsl(20,14%,6%)] rounded-full z-10" />

      {/* Screen */}
      <div className="absolute inset-[6px] top-[14px] rounded-[30px] overflow-hidden bg-background flex flex-col">
        {/* App header */}
        <div className="px-4 pt-6 pb-3 bg-gradient-to-b from-primary/15 to-transparent flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-bold text-primary tracking-wide">INVOLTS</span>
          </div>
          <p className="text-[9px] text-foreground/50 mt-0.5">Avaliações de parceiros</p>
        </div>

        {/* Inner review feed */}
        <div className="flex-1 px-2 pb-2 space-y-2 overflow-hidden">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.25, duration: 0.5 }}
              className="bg-muted/50 rounded-xl p-2.5 border border-border/50"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <r.icon className="w-2.5 h-2.5 text-primary-foreground" />
                </div>
                <span className="text-[9px] font-semibold text-foreground truncate">{r.name}</span>
              </div>
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} className="w-2 h-2 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-[8px] text-foreground/60 leading-tight line-clamp-2">"{r.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-foreground/15 rounded-full" />
    </div>
  </motion.div>
);

export const ReviewsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const phoneRef = useRef(null);

  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const phoneInView = useInView(phoneRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  // Positions relative to phone center (translateX/Y from 50%,50%)
  const cardPositions = [
    { x: '-285px', y: '-130px', rotate: -4, delay: 0.7 },
    { x: '75px',   y: '-160px', rotate:  3, delay: 0.9 },
    { x: '-120px', y: '120px',  rotate: -2, delay: 1.1 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-background"
    >
      {/* Subtle bg glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial opacity-60" />
      </motion.div>

      {/* Animated top rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left' }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* ── Cinematic tagline ── */}
        <div ref={headingRef} className="text-center mb-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-8"
          >
            <Star className="w-4 h-4 fill-secondary text-secondary" />
            <span className="text-primary font-semibold text-xs uppercase tracking-widest">
              Avaliações reais
            </span>
          </motion.div>

          {/* Line 1 — large display */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '110%' }}
              animate={headingInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-foreground/50 font-light tracking-widest uppercase mb-2"
            >
              Veja agora
            </motion.p>
          </div>

          {/* Line 2 — cinematic large */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '110%' }}
              animate={headingInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-none"
            >
              o que nossos{' '}
              <span className="text-gradient">clientes dizem</span>
            </motion.h2>
          </div>

          {/* Underline rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'center' }}
            className="w-24 h-px bg-gradient-to-r from-primary to-secondary mx-auto mt-6"
          />
        </div>

        {/* ── Phone + floating reviews ── */}
        <div
          ref={phoneRef}
          className="relative flex items-center justify-center"
          style={{ height: '520px' }}
        >
          <PhoneMockup inView={phoneInView} />

          {reviews.map((review, i) => (
            <ReviewCard
              key={review.name}
              review={review}
              delay={cardPositions[i].delay}
              x={cardPositions[i].x}
              y={cardPositions[i].y}
              rotate={cardPositions[i].rotate}
            />
          ))}
        </div>

        {/* ── Social proof bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-10 mt-16 pt-10 border-t border-border/40"
        >
          {[
            { value: '5.0', label: 'Avaliação média' },
            { value: '1.000+', label: 'Parceiros satisfeitos' },
            { value: '25 anos', label: 'De tradição' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-display font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-foreground/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
