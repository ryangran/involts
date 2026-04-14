import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const springCfg = { stiffness: 250, damping: 22, mass: 0.3 };
  const springX = useSpring(mouseX, springCfg);
  const springY = useSpring(mouseY, springCfg);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setIsPointer(true);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    const bindInteractives = () => {
      document.querySelectorAll<HTMLElement>(
        'a, button, [role="button"], label, input[type="submit"], input[type="button"]'
      ).forEach(el => {
        // Remove before re-adding to prevent duplicate listeners
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    document.addEventListener('mousemove', move, { passive: true });
    bindInteractives();

    const observer = new MutationObserver(bindInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  if (!isPointer) return null;

  const cursor = (
    <motion.div
      style={{
        x: springX,
        y: springY,
        zIndex: 999999,
      }}
      className="fixed top-0 left-0 pointer-events-none"
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.4 : 1,
          rotate: isHovering ? -15 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ marginLeft: '-8px', marginTop: '-3px' }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: isHovering
              ? 'drop-shadow(0 0 6px hsl(40,96%,59%))'
              : 'drop-shadow(0 0 3px rgba(249,115,22,0.5))',
          }}
        >
          <path
            d="M13 2L3.5 13.5H10.5L9 22L20.5 10.5H13.5L13 2Z"
            fill="url(#boltGrad)"
            stroke="hsl(40,96%,59%)"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="boltGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="hsl(40,96%,72%)" />
              <stop offset="100%" stopColor="hsl(24,95%,53%)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );

  return createPortal(cursor, document.body);
};
