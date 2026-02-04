import { memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { motion } from 'framer-motion';

const BRAZIL_TOPO_JSON = "/data/brazil-states.geojson";

// Mapeamento de nomes dos estados para siglas
const stateNameToCode: Record<string, string> = {
  'Acre': 'AC',
  'Alagoas': 'AL',
  'Amapá': 'AP',
  'Amazonas': 'AM',
  'Bahia': 'BA',
  'Ceará': 'CE',
  'Distrito Federal': 'DF',
  'Espírito Santo': 'ES',
  'Goiás': 'GO',
  'Maranhão': 'MA',
  'Mato Grosso': 'MT',
  'Mato Grosso do Sul': 'MS',
  'Minas Gerais': 'MG',
  'Pará': 'PA',
  'Paraíba': 'PB',
  'Paraná': 'PR',
  'Pernambuco': 'PE',
  'Piauí': 'PI',
  'Rio de Janeiro': 'RJ',
  'Rio Grande do Norte': 'RN',
  'Rio Grande do Sul': 'RS',
  'Rondônia': 'RO',
  'Roraima': 'RR',
  'Santa Catarina': 'SC',
  'São Paulo': 'SP',
  'Sergipe': 'SE',
  'Tocantins': 'TO',
};

interface BrazilMapProps {
  onStateClick: (stateCode: string) => void;
  selectedState: string | null;
  hoveredState: string | null;
  onStateHover: (stateCode: string | null) => void;
  statesWithData: string[];
}

export const BrazilMap = memo(({ 
  onStateClick, 
  selectedState, 
  hoveredState, 
  onStateHover,
  statesWithData 
}: BrazilMapProps) => {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 650,
        center: [-54, -15]
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Geographies geography={BRAZIL_TOPO_JSON}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const stateName = geo.properties.name;
            const stateCode = stateNameToCode[stateName] || '';
            const hasData = statesWithData.includes(stateCode);
            const isSelected = selectedState === stateCode;
            const isHovered = hoveredState === stateCode;

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => onStateHover(stateCode)}
                onMouseLeave={() => onStateHover(null)}
                onClick={() => hasData && onStateClick(stateCode)}
                style={{
                  default: {
                    fill: isSelected 
                      ? 'hsl(24, 95%, 53%)' // primary color
                      : hasData 
                        ? 'hsl(24, 95%, 53%)' 
                        : 'hsl(240, 4.8%, 85%)', // muted color
                    stroke: 'hsl(0, 0%, 100%)',
                    strokeWidth: isSelected ? 2 : 0.75,
                    outline: 'none',
                    cursor: hasData ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                  },
                  hover: {
                    fill: isSelected 
                      ? 'hsl(24, 95%, 53%)'
                      : hasData 
                        ? 'hsl(24, 95%, 45%)' 
                        : 'hsl(240, 4.8%, 85%)',
                    stroke: 'hsl(0, 0%, 100%)',
                    strokeWidth: hasData ? 1.5 : 0.75,
                    outline: 'none',
                    cursor: hasData ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                  },
                  pressed: {
                    fill: hasData ? 'hsl(24, 95%, 40%)' : 'hsl(240, 4.8%, 85%)',
                    stroke: 'hsl(0, 0%, 100%)',
                    strokeWidth: 1.5,
                    outline: 'none',
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
});

BrazilMap.displayName = 'BrazilMap';
