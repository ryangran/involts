import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TICKER_ITEMS = [
  'PROTEÇÃO ELÉTRICA',
  'FILTRO DE LINHA',
  'AUTOTRANSFORMADOR',
  'MÓDULO ISOLADOR',
  'PROTETOR DIGITAL',
  'PROTETOR BIVOLT',
  'INDÚSTRIA BRASILEIRA',
  '25 ANOS DE MERCADO',
];

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {count}{suffix}
    </span>
  );
}

export function TerminalHero() {
  const tickerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(24,95%,53%) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top label */}
      <div className="relative z-20 px-6 md:px-12 pt-10 pb-0 flex items-center justify-between border-b border-white/10">
        <span className="font-mono text-xs text-white/30 uppercase tracking-[0.3em]">
          Involts Brasil — Proteção Elétrica
        </span>
        <span className="font-mono text-xs text-primary/60 uppercase tracking-[0.3em]">
          EST. 2000
        </span>
      </div>

      {/* Main headline */}
      <div className="relative z-20 px-6 md:px-12 pt-12 pb-0">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-display font-black uppercase leading-[0.9] text-white"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)' }}
        >
          Reinventamos
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="font-display font-black uppercase leading-[0.9]"
          style={{
            fontSize: 'clamp(3.5rem, 11vw, 10rem)',
            color: 'hsl(24,95%,53%)',
          }}
        >
          a proteção
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="font-display font-black uppercase leading-[0.9] text-white"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)' }}
        >
          elétrica.
        </motion.h2>
      </div>

      {/* Subheadline + CTA row */}
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
          <Link
            to="/produtos"
            className="bg-gradient-primary px-8 py-4 font-semibold rounded-full flex items-center gap-2 text-sm uppercase tracking-widest whitespace-nowrap"
          >
            Ver Produtos <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/revendedor"
            className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-8 py-4 font-semibold rounded-full flex items-center gap-2 text-sm uppercase tracking-widest whitespace-nowrap transition-colors"
          >
            Seja Revendedor
          </Link>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-20 grid grid-cols-2 md:grid-cols-4 border-b border-white/10"
      >
        {[
          { value: 25, suffix: '+', label: 'Anos de Mercado' },
          { value: 500, suffix: '+', label: 'Revendedores Ativos' },
          { value: 3,  suffix: '',  label: 'Anos de Garantia' },
          { value: 98, suffix: '%', label: 'de Satisfação' },
        ].map((stat, i) => (
          <div
            key={i}
            className="px-6 md:px-12 py-8 border-r border-white/10 last:border-r-0"
          >
            <div
              className="font-display font-black text-4xl md:text-5xl mb-1"
              style={{ color: 'hsl(24,95%,53%)' }}
            >
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="font-mono text-xs text-white/40 uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Ticker */}
      <div className="relative z-20 py-4 overflow-hidden border-b border-white/10 bg-black/60">
        <div
          ref={tickerRef}
          className="flex gap-0 whitespace-nowrap"
          style={{ animation: 'ticker-scroll 24s linear infinite' }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-6 px-6">
              <span className="font-mono text-xs text-white/30 uppercase tracking-[0.25em]">
                {item}
              </span>
              <span className="text-primary/40 text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
