import React, { useEffect, useRef, ReactNode } from 'react';
// CSS for [data-glow] pseudo-elements lives in src/index.css

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 200 },
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

// ── Single global pointermove listener ───────────────────────────────────────
// Instead of one listener per card (18 in the carousel), we set --x/--y on
// :root and let CSS inheritance propagate the values to all [data-glow] cards.
// This reduces style writes from 18×4 to 4 per pointer event.
let _listenerActive = false;
let _mountCount = 0;

function _syncPointer(e: PointerEvent) {
  const root = document.documentElement;
  root.style.setProperty('--x',  e.clientX.toFixed(2));
  root.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(2));
  root.style.setProperty('--y',  e.clientY.toFixed(2));
  root.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(2));
}
// ─────────────────────────────────────────────────────────────────────────────

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    _mountCount++;
    if (!_listenerActive) {
      document.addEventListener('pointermove', _syncPointer, { passive: true });
      _listenerActive = true;
    }
    return () => {
      _mountCount--;
      if (_mountCount === 0) {
        document.removeEventListener('pointermove', _syncPointer);
        _listenerActive = false;
      }
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return '';
    return sizeMap[size];
  };

  const getInlineStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      // Card-specific CSS vars (not global mouse coords)
      ['--base' as string]: base,
      ['--spread' as string]: spread,
      ['--radius' as string]: '14',
      ['--border' as string]: '3',
      ['--backdrop' as string]: 'hsl(0 0% 60% / 0.12)',
      ['--backup-border' as string]: 'var(--backdrop)',
      ['--size' as string]: '200',
      ['--outer' as string]: '1',
      ['--border-size' as string]: 'calc(var(--border, 2) * 1px)',
      ['--spotlight-size' as string]: 'calc(var(--size, 150) * 1px)',
      // --hue reads --xp from :root via inheritance
      ['--hue' as string]: 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'fixed',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      touchAction: 'none',
    };

    if (width !== undefined)  baseStyles.width  = typeof width  === 'number' ? `${width}px`  : width;
    if (height !== undefined) baseStyles.height = typeof height === 'number' ? `${height}px` : height;

    return baseStyles;
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={getInlineStyles()}
      className={`
        ${getSizeClasses()}
        ${!customSize ? 'aspect-[3/4]' : ''}
        rounded-2xl
        relative
        grid
        grid-rows-[1fr_auto]
        shadow-[0_1rem_2rem_-1rem_black]
        p-4
        gap-4
        backdrop-blur-[5px]
        ${className}
      `}
    >
      <div ref={innerRef} data-glow></div>
      {children}
    </div>
  );
};

export { GlowCard };
