import React from 'react';

interface HandData {
  fileName: string;
  ev: number;
  shadingPercentage: number;
}

interface HandCellProps {
  handKey: string;
  handData: HandData[];
}

const HandCell: React.FC<HandCellProps> = ({ handKey, handData }) => {
  // Calculate gradient stops
  const getGradient = () => {
    const orderedActions = [...handData].sort((a, b) => 
      a.fileName.replace(".rng", "").slice(-1).localeCompare(b.fileName.replace(".rng", "").slice(-1))
    );

    let currentPosition = 0;
    const gradientStops: string[] = [];

    orderedActions.forEach(h => {
      const cleanName = h.fileName.replace(".rng", "");
      const lastChar = cleanName.slice(-1);
      const percentage = h.shadingPercentage * 100;

      let color;
      switch(lastChar) {
        case '0': color = 'rgba(173, 216, 230, 0.5)'; break;
        case '5': color = 'rgba(255, 99, 71, 0.5)'; break;
        case '2': color = 'rgba(144, 238, 144, 0.5)'; break;
        case '3': color = 'rgba(255, 165, 0, 0.5)'; break;
        default: color = 'rgba(211, 211, 211, 0.5)';
      }

      gradientStops.push(`${color} ${currentPosition.toFixed(2)}% ${(currentPosition + percentage).toFixed(2)}%`);
      currentPosition += percentage;
    });

    gradientStops.push(`transparent ${currentPosition.toFixed(2)}% 100%`);
    return `linear-gradient(90deg, ${gradientStops.join(', ')})`;
  };

  // Generate tooltip content
  const tooltipContent = handData.map(h => {
    const cleanName = h.fileName.replace(".rng", "");
    const lastChar = cleanName.slice(-1);
    
    let action;
    switch(lastChar) {
      case '0': action = 'Fold'; break;
      case '2': action = 'Call'; break;
      case '3': action = 'ALLIN'; break;
      case '5': action = 'Min'; break;
      default: action = 'Unknown';
    }

    return `${action} ${h.ev.toFixed(3)} bb`;
  }).join('\n');

  return (
    <td 
      style={{ 
        padding: '8px',
        fontWeight: 'bold',
        position: 'relative',
        background: getGradient()
      }}
      title={tooltipContent}
    >
      <div style={{ textAlign: 'center', marginBottom: '5px', fontWeight: 'bold' }}>
        {handKey}
      </div>
    </td>
  );
};

export default HandCell;