import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ChevronDown, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShaderBackground } from './animated-shader-hero';

// Floating orbs component
const FloatingOrbs = () => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${150 + i * 80}px`,
            height: `${150 + i * 80}px`,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)'
              : 'radial-gradient(circle, hsl(var(--secondary) / 0.15), transparent 70%)',
            left: `${10 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </>
  );
};

// Animated text reveal
const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const words = text.split(' ');
  
  return (
    <span className="inline-flex flex-wrap justify-center gap-x-3">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: delay + i * 0.1,
            type: 'spring',
            stiffness: 100
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// Stats counter component
const StatCounter = ({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(progress * value));
      
      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-display font-bold text-gradient">
        {count}{suffix}
      </div>
      <div className="text-foreground/60 text-sm mt-1">{label}</div>
    </motion.div>
  );
};

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useShaderBackground();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* WebGL Shader Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ touchAction: 'none' }}
      />
      {/* Overlay para suavizar e manter legibilidade do texto */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 container mx-auto px-6 text-center pt-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 bg-muted/50 backdrop-blur-xl border border-primary/20 rounded-full px-5 py-2.5 mb-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Zap className="w-5 h-5 text-primary" />
          </motion.div>
          <span className="text-sm text-foreground/80 font-medium">
            25 anos protegendo o Brasil
          </span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-secondary" />
          </motion.div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-foreground mb-8 leading-tight"
        >
          <AnimatedText text="Energia de Qualidade" delay={0.4} />
          <br />
          <span className="text-gradient">
            <AnimatedText text="em Todos os Momentos" delay={0.8} />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Protetores eletrônicos, filtros de linha e soluções completas em energia 
          com <span className="text-primary font-semibold">tecnologia SMD</span> e 
          presença em <span className="text-secondary font-semibold">todo Brasil</span>
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-14"
        >
          <StatCounter value={25} suffix="+" label="Anos de Experiência" delay={1.5} />
          <StatCounter value={500} suffix="+" label="Pontos de Atendimento" delay={1.6} />
          <StatCounter value={1000} suffix="+" label="Parceiros Ativos" delay={1.7} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/produtos">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-primary text-primary-foreground px-10 py-5 rounded-full font-semibold text-lg shadow-lg shadow-primary/30 flex items-center gap-3 overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <Shield className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Conheça nossos Produtos</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          
          <Link to="/sobre">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--foreground) / 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-foreground/20 text-foreground px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Sobre a Involts
            </motion.button>
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {['Protetor Eletrônico', 'Filtros de Linha', 'Autotransformadores', 'Aterramento'].map((item, i) => (
            <motion.a
              key={item}
              href="#produtos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="bg-muted/50 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-primary hover:border-primary/30 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
            >
              {item}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#produtos"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-foreground/50 hover:text-primary transition-colors cursor-pointer"
        >
          <span className="text-sm font-medium">Explorar</span>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
};
