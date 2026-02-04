import { motion } from 'framer-motion';

interface BrazilMapProps {
  onStateClick: (state: string) => void;
  selectedState: string | null;
  hoveredState: string | null;
  onStateHover: (state: string | null) => void;
  statesWithData: string[];
}

// SVG paths for Brazilian states
const brazilStates: Record<string, { path: string; name: string }> = {
  AC: {
    name: 'Acre',
    path: 'M99.7,225.5l-2.8-4.2l-4.4-2.1l-1.4-2.8l-3.5-0.7l-2.1-2.1l-4.9-1.4l-2.8,0.7l-3.5-2.8l-2.1,0.7l-2.8-2.1l-4.2,0.7l-2.8-2.1l-4.9,0.7l-2.1-2.8l-4.2-1.4l-2.1,0.7l-2.8-2.8l-4.9-0.7l-2.1-2.1l0.7-4.2l2.8-2.1l0.7-4.2l2.8-2.8l-0.7-4.2l2.1-2.8l4.2,0.7l2.8-2.1l4.2,1.4l2.8-1.4l4.2,2.1l2.8-0.7l4.2,2.8l2.8,0.7l2.8,2.8l4.2,0.7l2.1,2.8l4.2,1.4l2.1,2.1l4.2,0.7l2.8,2.8l-0.7,4.2l2.1,2.8l-0.7,4.2l-2.8,2.8l0.7,4.2l-2.8,2.1l-0.7,4.2L99.7,225.5z'
  },
  AL: {
    name: 'Alagoas',
    path: 'M558.5,203.8l-2.1-4.9l-4.2-2.8l-2.8-4.2l-4.9-0.7l-2.8-2.8l4.9-2.1l4.2,0.7l4.9,2.1l4.2,2.8l2.8,4.2l-0.7,4.9L558.5,203.8z'
  },
  AP: {
    name: 'Amapá',
    path: 'M318.5,62.8l-2.1-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9,0.7l4.2,2.8l2.1,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l0.7-4.9l2.8-2.1l-2.8,4.2L318.5,62.8z'
  },
  AM: {
    name: 'Amazonas',
    path: 'M99.7,143.8l2.8,2.1l4.2-0.7l2.8,2.8l4.2,0.7l2.8,2.8l4.2-0.7l2.8,2.8l4.2,0.7l2.8,2.1l4.2-0.7l2.8,2.8l4.2,0.7l2.8,2.1l4.2,0.7l2.8,2.8l4.2-0.7l2.8,2.8l4.2,0.7l2.8,2.1l4.2,0.7l2.8,2.8l4.2-0.7l2.8,2.8l4.2,0.7l2.8,2.1l4.2,0.7l2.8,2.8l4.2-0.7l2.8,2.8l-0.7,4.2l-2.8,2.8l0.7,4.2l-2.8,2.1l-0.7,4.2l-2.8,2.8l0.7,4.2l-2.8,2.1l-0.7,4.2l-2.8,2.8l0.7,4.2l-2.8,2.1l-0.7,4.2l-4.2-0.7l-2.8-2.8l-4.2,0.7l-2.8-2.1l-4.2-0.7l-2.8-2.8l-4.2,0.7l-2.8-2.8l-4.2-0.7l-2.8-2.1l-4.2-0.7l-2.8-2.8l-4.2,0.7l-2.8-2.8l-4.2-0.7l-2.8-2.1l-4.2-0.7l-2.8-2.8l-4.2,0.7l-2.8-2.8l-4.2-0.7l-2.8-2.1l-4.2-0.7l-2.8-2.8l-4.2,0.7l-2.8-2.8l-4.2-0.7l-2.8-2.1l-4.2,0.7l-2.8-2.8l0.7-4.2l2.8-2.1l0.7-4.2l2.8-2.8l-0.7-4.2l2.8-2.1l0.7-4.2l2.8-2.8l-0.7-4.2l2.8-2.1l0.7-4.2L99.7,143.8z'
  },
  BA: {
    name: 'Bahia',
    path: 'M478.5,203.8l2.8,4.2l4.2,2.8l2.8,4.9l4.2,2.1l2.8,4.2l4.2,2.8l2.8,4.9l4.2,2.1l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-0.7l-4.2,2.1l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1l2.8,4.2l4.2-2.1l4.9-0.7l4.2-2.8l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1L478.5,203.8z'
  },
  CE: {
    name: 'Ceará',
    path: 'M498.5,143.8l2.8,4.2l4.2,2.8l2.8,4.9l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1l4.9,2.8l4.2,2.1L498.5,143.8z'
  },
  DF: {
    name: 'Distrito Federal',
    path: 'M378.5,263.8l2.8,2.1l2.1,2.8l-0.7,2.8l-2.8,2.1l-2.8-0.7l-2.1-2.8l0.7-2.8l2.8-2.1L378.5,263.8z'
  },
  ES: {
    name: 'Espírito Santo',
    path: 'M478.5,303.8l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9,0.7l4.2,2.8L478.5,303.8z'
  },
  GO: {
    name: 'Goiás',
    path: 'M338.5,263.8l4.2,2.8l2.8,4.2l4.2,2.8l2.8,4.2l4.2,2.8l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-0.7l-4.2,2.1l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1l4.9,2.8l4.2,2.1l4.9-0.7l4.2-2.8l2.8-4.2l4.2-2.1L338.5,263.8z'
  },
  MA: {
    name: 'Maranhão',
    path: 'M398.5,123.8l4.2,2.8l2.8,4.2l4.2,2.8l2.8,4.9l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-0.7l-4.2,2.1l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1l4.9,2.8l4.2,2.1l4.9-0.7l4.2-2.8l2.8-4.2L398.5,123.8z'
  },
  MT: {
    name: 'Mato Grosso',
    path: 'M238.5,223.8l4.2,2.8l2.8,4.2l4.2,2.8l2.8,4.2l4.2,2.8l2.8,4.2l4.2,2.8l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-0.7l-4.2,2.1l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1l4.9,2.8l4.2,2.1l4.9-0.7l4.2-2.8l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1L238.5,223.8z'
  },
  MS: {
    name: 'Mato Grosso do Sul',
    path: 'M298.5,323.8l4.2,2.8l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-0.7l-4.2,2.1l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1l4.9,2.8l4.2,2.1l4.9-0.7l4.2-2.8l2.8-4.2l4.2-2.1l4.9-0.7L298.5,323.8z'
  },
  MG: {
    name: 'Minas Gerais',
    path: 'M398.5,283.8l4.2,2.8l2.8,4.2l4.2,2.8l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-0.7l-4.2,2.1l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1l4.9,2.8l4.2,2.1l4.9-0.7l4.2-2.8l2.8-4.2l4.2-2.1l4.9-0.7L398.5,283.8z'
  },
  PA: {
    name: 'Pará',
    path: 'M258.5,83.8l4.2,2.8l2.8,4.2l4.2,2.8l2.8,4.9l4.2,2.1l2.8,4.2l4.2,2.8l2.8,4.9l4.2,2.1l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-0.7l-4.2,2.1l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1l4.9,2.8l4.2,2.1l4.9-0.7l4.2-2.8l2.8-4.2l4.2-2.1L258.5,83.8z'
  },
  PB: {
    name: 'Paraíba',
    path: 'M538.5,163.8l2.8,2.8l-0.7,4.2l-2.8,2.8l-4.2,0.7l-4.2-2.1l-2.8-2.8l0.7-4.2l2.8-2.8l4.2-0.7L538.5,163.8z'
  },
  PR: {
    name: 'Paraná',
    path: 'M338.5,363.8l4.2,2.8l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-0.7l-4.2,2.1l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1l4.9,2.8l4.2,2.1l4.9-0.7l4.2-2.8l2.8-4.2l4.2-2.1l4.9-0.7L338.5,363.8z'
  },
  PE: {
    name: 'Pernambuco',
    path: 'M518.5,183.8l4.2,2.8l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l-4.9-2.1l-4.2-2.8l-4.9-2.1l-4.2-2.8l-2.8-4.2l0.7-4.9l2.8-2.8l4.2-0.7l4.2,2.1l4.9,2.8l4.2,2.1l4.9,0.7L518.5,183.8z'
  },
  PI: {
    name: 'Piauí',
    path: 'M438.5,143.8l4.2,2.8l2.8,4.2l4.2,2.8l2.8,4.9l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1L438.5,143.8z'
  },
  RJ: {
    name: 'Rio de Janeiro',
    path: 'M438.5,343.8l2.8,2.8l-0.7,4.2l-2.8,2.8l-4.2,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-2.8-2.8l0.7-4.2l2.8-2.8l4.2-0.7l4.2,2.1l4.9,2.8L438.5,343.8z'
  },
  RN: {
    name: 'Rio Grande do Norte',
    path: 'M538.5,143.8l2.8,2.8l-0.7,4.2l-2.8,2.8l-4.2,0.7l-4.2-2.1l-2.8-2.8l0.7-4.2l2.8-2.8l4.2-0.7L538.5,143.8z'
  },
  RS: {
    name: 'Rio Grande do Sul',
    path: 'M318.5,423.8l4.2,2.8l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-0.7l-4.2,2.1l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1l4.9,2.8l4.2,2.1l4.9-0.7l4.2-2.8l2.8-4.2l4.2-2.1l4.9-0.7L318.5,423.8z'
  },
  RO: {
    name: 'Rondônia',
    path: 'M158.5,223.8l4.2,2.8l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1L158.5,223.8z'
  },
  RR: {
    name: 'Roraima',
    path: 'M178.5,43.8l4.2,2.8l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1L178.5,43.8z'
  },
  SC: {
    name: 'Santa Catarina',
    path: 'M338.5,403.8l4.2,2.8l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l-4.9-2.1l-4.2-2.8l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9,0.7l4.2,2.8L338.5,403.8z'
  },
  SP: {
    name: 'São Paulo',
    path: 'M358.5,323.8l4.2,2.8l2.8,4.2l4.2,2.8l2.8,4.2l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-0.7l-4.2,2.1l-2.8,4.2l-4.2,2.1l-4.9-0.7l-4.2-2.8l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1l4.9,2.8l4.2,2.1l4.9-0.7l4.2-2.8l2.8-4.2l4.2-2.1L358.5,323.8z'
  },
  SE: {
    name: 'Sergipe',
    path: 'M538.5,203.8l2.1,2.8l-0.7,3.5l-2.8,2.1l-3.5,0.7l-2.8-2.1l-2.1-2.8l0.7-3.5l2.8-2.1l3.5-0.7L538.5,203.8z'
  },
  TO: {
    name: 'Tocantins',
    path: 'M358.5,163.8l4.2,2.8l2.8,4.2l4.2,2.8l2.8,4.9l-0.7,4.9l-2.8,4.2l-4.2,2.1l-4.9,0.7l-4.2-2.1l-4.9-2.8l-4.2-2.1l-4.9-2.8l-4.2-2.1l-2.8-4.2l0.7-4.9l2.8-4.2l4.2-2.1l4.9-0.7l4.2,2.1L358.5,163.8z'
  }
};

export const BrazilMap = ({ 
  onStateClick, 
  selectedState, 
  hoveredState, 
  onStateHover,
  statesWithData 
}: BrazilMapProps) => {
  return (
    <svg
      viewBox="0 0 600 500"
      className="w-full h-full"
      style={{ maxHeight: '500px' }}
    >
      <defs>
        <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" />
        </linearGradient>
        <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {Object.entries(brazilStates).map(([sigla, { path, name }]) => {
        const hasData = statesWithData.includes(sigla);
        const isSelected = selectedState === sigla;
        const isHovered = hoveredState === sigla;

        return (
          <motion.g key={sigla}>
            <motion.path
              d={path}
              fill={
                isSelected
                  ? 'url(#stateGradient)'
                  : hasData
                    ? isHovered
                      ? 'url(#hoverGradient)'
                      : 'hsl(var(--primary))'
                    : 'hsl(var(--muted))'
              }
              stroke="hsl(var(--background))"
              strokeWidth={isSelected ? 2 : 1}
              filter={isSelected ? 'url(#glow)' : undefined}
              style={{
                cursor: hasData ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
              }}
              whileHover={hasData ? { scale: 1.05 } : {}}
              whileTap={hasData ? { scale: 0.98 } : {}}
              onClick={() => hasData && onStateClick(sigla)}
              onMouseEnter={() => onStateHover(sigla)}
              onMouseLeave={() => onStateHover(null)}
            />
            
            {/* State label */}
            <motion.text
              x={getStateLabelPosition(sigla).x}
              y={getStateLabelPosition(sigla).y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isSelected || hasData ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))'}
              fontSize="10"
              fontWeight="bold"
              style={{ 
                pointerEvents: 'none',
                textShadow: hasData ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
              }}
            >
              {sigla}
            </motion.text>
          </motion.g>
        );
      })}
    </svg>
  );
};

// Helper function to get label positions for each state
function getStateLabelPosition(sigla: string): { x: number; y: number } {
  const positions: Record<string, { x: number; y: number }> = {
    AC: { x: 68, y: 210 },
    AL: { x: 548, y: 198 },
    AP: { x: 325, y: 52 },
    AM: { x: 170, y: 170 },
    BA: { x: 470, y: 235 },
    CE: { x: 490, y: 150 },
    DF: { x: 378, y: 268 },
    ES: { x: 472, y: 310 },
    GO: { x: 350, y: 280 },
    MA: { x: 395, y: 140 },
    MT: { x: 240, y: 250 },
    MS: { x: 280, y: 340 },
    MG: { x: 400, y: 300 },
    PA: { x: 285, y: 120 },
    PB: { x: 530, y: 168 },
    PR: { x: 320, y: 378 },
    PE: { x: 510, y: 190 },
    PI: { x: 435, y: 160 },
    RJ: { x: 430, y: 345 },
    RN: { x: 530, y: 148 },
    RS: { x: 305, y: 438 },
    RO: { x: 145, y: 235 },
    RR: { x: 175, y: 55 },
    SC: { x: 330, y: 410 },
    SP: { x: 365, y: 340 },
    SE: { x: 532, y: 208 },
    TO: { x: 360, y: 180 },
  };
  return positions[sigla] || { x: 300, y: 250 };
}
