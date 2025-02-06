import React from 'react';
import HandCell from './HandCell';

var HandData = "..."

interface PokerGridProps {
  data: Record<string, Record<string, HandData[]>>;
}

const PokerGrid: React.FC<PokerGridProps> = ({ data }) => {
  const rankOrder = "AKQJT98765432";

  return (
    <table style={{ 
      borderCollapse: 'collapse', 
      textAlign: 'center', 
      width: '100%', 
      border: '1px solid black'
    }}>
      <tbody>
        {rankOrder.split('').map(rowRank => (
          <tr key={rowRank}>
            {rankOrder.split('').map(colRank => {
              const handData = data[rowRank]?.[colRank] || [];
              const isPair = rowRank === colRank;
              const suited = rankOrder.indexOf(rowRank) < rankOrder.indexOf(colRank);
              
              const handKey = isPair 
                ? `${rowRank}${colRank}`
                : suited 
                  ? `${rowRank}${colRank}s` 
                  : `${colRank}${rowRank}o`;

              return (
                <HandCell
                  key={`${rowRank}-${colRank}`}
                  handKey={handKey}
                  handData={handData}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PokerGrid;