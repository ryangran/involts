import { useScroll, useSpring, motion } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[9998] pointer-events-none"
      aria-hidden="true"
    >
      {/* Gradient laranja → amarelo, igual identidade Involts */}
      <div className="w-full h-full bg-gradient-to-r from-primary via-secondary to-primary" />
      {/* Brilho na ponta */}
      <motion.div
        style={{ scaleX }}
        className="absolute top-0 right-0 w-8 h-full bg-secondary blur-sm opacity-80"
      />
    </motion.div>
  );
};
