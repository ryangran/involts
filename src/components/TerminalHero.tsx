import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import protetorMultifuncionalImg from '@/assets/products/protetor-multifuncional.png';
import protetorBivoltImg        from '@/assets/products/protetor-bivolt.png';
import filtroLinhaAbsImg        from '@/assets/products/filtro-linha-abs.png';
import autoTransformadorImg     from '@/assets/products/auto-transformador.png';
import moduloIsoladorImg        from '@/assets/products/modulo-isolador.png';
import terraLuxImg              from '@/assets/products/terra-lux.png';
import protetorVideo            from '@/assets/protetor-eletronico-involts.mp4';

const TICKER_ITEMS = [
  'PROTEÇÃO ELÉTRICA','FILTRO DE LINHA','AUTOTRANSFORMADOR',
  'MÓDULO ISOLADOR','PROTETOR DIGITAL','PROTETOR BIVOLT',
  'INDÚSTRIA BRASILEIRA','25 ANOS DE MERCADO',
];

const PRODUCTS = [
  { img: protetorMultifuncionalImg, name: 'Protetor Multifuncional', cat: 'Protetores', slug: 'protetor-multifuncional' },
  { img: protetorBivoltImg,         name: 'Protetor Bivolt',         cat: 'Protetores', slug: 'protetor-bivolt' },
  { img: filtroLinhaAbsImg,         name: 'Filtro de Linha ABS',     cat: 'Filtros',    slug: 'filtro-linha-abs' },
  { img: autoTransformadorImg,      name: 'Auto Transformador',      cat: 'Transformadores', slug: 'auto-transformador' },
  { img: moduloIsoladorImg,         name: 'Módulo Isolador',         cat: 'Transformadores', slug: 'modulo-isolador' },
  { img: terraLuxImg,               name: 'Terra Lux',               cat: 'Aterramento', slug: 'terra-lux' },
];

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = 16;
    const increment = target / (1800 / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span ref={ref} className="font-mono tabular-nums">{count}{suffix}</span>;
}

/* ─── Per-product slide sub-components ──────────── */
function SlideInfo({
  product, index, total, scrollYProgress,
}: {
  product: typeof PRODUCTS[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end   = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  const y       = useTransform(scrollYProgress, [start, start + 0.08], [40, 0]);

  return (
    <motion.div style={{ opacity, y }} className="absolute">
      <span className="font-mono text-xs text-primary/60 uppercase tracking-[0.3em] block mb-3">
        {String(index + 1).padStart(2, '0')} — {product.cat}
      </span>
      <h3 className="font-display font-black uppercase text-white leading-none mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>
        {product.name}
      </h3>
      <Link
        to={`/produto/${product.slug}`}
        className="pointer-events-auto inline-flex items-center gap-2 border border-primary/40 text-primary hover:bg-primary/10 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest transition-colors"
      >
        Ver produto <ArrowRight className="w-3 h-3" />
      </Link>
    </motion.div>
  );
}

function SlideImage({
  product, index, total, scrollYProgress,
}: {
  product: typeof PRODUCTS[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start   = index / total;
  const end     = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [start, start + 0.08], [0.85, 1]);
  const clipTop = useTransform(scrollYProgress, [start, start + 0.1], ['100%', '0%']);
  const clip    = useTransform(clipTop, v => `inset(${v} 0% 0% 0%)`);

  return (
    <motion.div style={{ opacity, scale }} className="absolute w-72 h-72 md:w-96 md:h-96">
      <motion.div style={{ clipPath: clip }} className="w-full h-full">
        <img src={product.img} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl"
             style={{ filter: 'drop-shadow(0 0 40px hsl(24 95% 53% / 0.25))' }} />
      </motion.div>
    </motion.div>
  );
}

function SlideProgress({
  index, total, scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start  = index / total;
  const end    = (index + 1) / total;
  const scaleX = useTransform(scrollYProgress, [start, end], [0, 1]);
  return (
    <div className="relative w-12 h-px bg-white/10">
      <motion.div style={{ scaleX, transformOrigin: 'left' }} className="absolute inset-0 bg-primary" />
    </div>
  );
}

/* ─── Image Showcase ─────────────────────────────── */
function ImageShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const total = PRODUCTS.length;

  return (
    <div ref={ref} style={{ height: `${total * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-black flex items-center">

        {/* left: product info */}
        <div className="absolute left-0 top-0 h-full w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 z-20 pointer-events-none">
          {PRODUCTS.map((p, i) => (
            <SlideInfo key={i} product={p} index={i} total={total} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* right: product image */}
        <div className="absolute right-0 top-0 h-full w-full md:w-1/2 flex items-center justify-center">
          {PRODUCTS.map((p, i) => (
            <SlideImage key={i} product={p} index={i} total={total} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* progress bar */}
        <div className="absolute bottom-8 left-8 md:left-16 z-30 flex gap-2">
          {PRODUCTS.map((_, i) => (
            <SlideProgress key={i} index={i} total={total} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
             style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,#fff 2px,#fff 4px)', backgroundSize: '100% 4px' }} />
      </div>
    </div>
  );
}

/* ─── Scroll Video ───────────────────────────────── */
function ScrollVideo() {
  const ref      = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const bottomLabelOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      video.currentTime = v * video.duration;
    });
  }, [scrollYProgress]);

  return (
    <div ref={ref} style={{ height: '250vh' }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
        {/* label */}
        <div className="absolute top-8 left-8 md:left-16 z-20 font-mono text-xs text-white/30 uppercase tracking-[0.3em]">
          Tecnologia em movimento
        </div>

        {/* scrubbed video */}
        <video
          ref={videoRef}
          src={protetorVideo}
          muted
          playsInline
          preload="auto"
          className="w-full max-w-4xl h-auto rounded-2xl z-10 relative"
          style={{ filter: 'drop-shadow(0 0 60px hsl(24 95% 53% / 0.2))' }}
        />

        {/* bottom label */}
        <motion.p
          style={{ opacity: bottomLabelOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-white/30 uppercase tracking-[0.3em] text-center z-20"
        >
          Role para ver o produto em ação
        </motion.p>

        {/* progress ring */}
        <svg className="absolute bottom-8 right-8 md:right-16 z-20 w-12 h-12" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(24,95%,53%)" strokeOpacity="0.15" strokeWidth="2" />
          <motion.circle
            cx="24" cy="24" r="20" fill="none"
            stroke="hsl(24,95%,53%)" strokeWidth="2"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress,
              rotate: -90,
              transformOrigin: '24px 24px',
            }}
            strokeDasharray="1"
          />
        </svg>

        {/* scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
             style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,#fff 2px,#fff 4px)', backgroundSize: '100% 4px' }} />
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────── */
export function TerminalHero() {
  return (
    <>
      {/* ── Hero panel ── */}
      <section className="relative w-full bg-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
             style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 4px)', backgroundSize: '100% 4px' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
             style={{ backgroundImage: 'radial-gradient(circle, hsl(24,95%,53%) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-20 px-6 md:px-12 pt-10 flex items-center justify-between border-b border-white/10">
          <span className="font-mono text-xs text-white/30 uppercase tracking-[0.3em]">Involts Brasil — Proteção Elétrica</span>
          <span className="font-mono text-xs text-primary/60 uppercase tracking-[0.3em]">EST. 2000</span>
        </div>

        <div className="relative z-20 px-6 md:px-12 pt-12 pb-0">
          {['Reinventamos', 'a proteção', 'elétrica.'].map((line, i) => (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
              className="font-display font-black uppercase leading-[0.9]"
              style={{
                fontSize: 'clamp(3.5rem, 11vw, 10rem)',
                color: i === 1 ? 'hsl(24,95%,53%)' : 'white',
              }}
            >
              {line}
            </motion.h2>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-20 px-6 md:px-12 pt-10 pb-12 flex flex-col md:flex-row md:items-end gap-8 justify-between border-b border-white/10"
        >
          <p className="text-white/50 font-sans text-base md:text-lg max-w-md leading-relaxed">
            Tecnologia industrial que transforma variações de tensão em energia segura e filtrada — protegendo seus equipamentos 24h por dia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link to="/produtos" className="bg-gradient-primary px-8 py-4 font-semibold rounded-full flex items-center gap-2 text-sm uppercase tracking-widest whitespace-nowrap">
              Ver Produtos <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/revendedor" className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-8 py-4 font-semibold rounded-full flex items-center gap-2 text-sm uppercase tracking-widest whitespace-nowrap transition-colors">
              Seja Revendedor
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-20 grid grid-cols-2 md:grid-cols-4 border-b border-white/10"
        >
          {[
            { value: 25,  suffix: '+', label: 'Anos de Mercado' },
            { value: 500, suffix: '+', label: 'Revendedores Ativos' },
            { value: 3,   suffix: '',  label: 'Anos de Garantia' },
            { value: 98,  suffix: '%', label: 'de Satisfação' },
          ].map((s, i) => (
            <div key={i} className="px-6 md:px-12 py-8 border-r border-white/10 last:border-r-0">
              <div className="font-display font-black text-4xl md:text-5xl mb-1" style={{ color: 'hsl(24,95%,53%)' }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Ticker */}
        <div className="relative z-20 py-4 overflow-hidden border-b border-white/10">
          <div className="flex gap-0 whitespace-nowrap" style={{ animation: 'ticker-scroll 24s linear infinite' }}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-6 px-6">
                <span className="font-mono text-xs text-white/30 uppercase tracking-[0.25em]">{item}</span>
                <span className="text-primary/40 text-xs">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image showcase (scroll) ── */}
      <ImageShowcase />

      {/* ── Video scrub (scroll) ── */}
      <ScrollVideo />

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
