import { useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springCfg = { stiffness: 180, damping: 22, mass: 0.4 };
  const springX = useSpring(mouseX, springCfg);
  const springY = useSpring(mouseY, springCfg);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const handleInteractEnter = useCallback(() => {
    document.documentElement.setAttribute('data-cursor', 'hover');
  }, []);

  const handleInteractLeave = useCallback(() => {
    document.documentElement.removeAttribute('data-cursor');
  }, []);

  useEffect(() => {
    // Only enable on true pointer devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const bindInteractives = () => {
      const els = document.querySelectorAll<HTMLElement>('a, button, [role="button"], label, select, input[type="submit"], input[type="button"]');
      els.forEach(el => {
        el.addEventListener('mouseenter', handleInteractEnter);
        el.addEventListener('mouseleave', handleInteractLeave);
      });
    };

    bindInteractives();

    const observer = new MutationObserver(bindInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [handleMouseMove, handleInteractEnter, handleInteractLeave]);

  return (
    <>
      {/* Precision dot — exact mouse position */}
      <motion.div
        aria-hidden="true"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-1.5 h-1.5 rounded-full bg-primary"
      />

      {/* Crosshair ring — spring lag */}
      <motion.div
        aria-hidden="true"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
      >
        {/* SVG crosshair frame */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          {/* Ring */}
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="rgba(184,78,10,0.35)"
            strokeWidth="1"
          />
          {/* Top tick */}
          <line x1="22" y1="2" x2="22" y2="9" stroke="rgba(184,78,10,0.7)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Bottom tick */}
          <line x1="22" y1="35" x2="22" y2="42" stroke="rgba(184,78,10,0.7)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Left tick */}
          <line x1="2" y1="22" x2="9" y2="22" stroke="rgba(184,78,10,0.7)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Right tick */}
          <line x1="35" y1="22" x2="42" y2="22" stroke="rgba(184,78,10,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Inline style for hover state enlargement */}
      <style>{`
        [data-cursor="hover"] ~ * .fixed[style*="z-index: 9998"],
        :root[data-cursor="hover"] .cursor-ring circle {
          r: 24;
          stroke-opacity: 0.6;
        }
      `}</style>
    </>
  );
};
