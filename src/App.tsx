import React, { useState, useEffect } from 'react';
import PokerGrid from './PokerGrid';

interface HandData {
  fileName: string;
  ev: number;
  shadingPercentage: number;
}

const App: React.FC = () => {
  const [handData, setHandData] = useState<Record<string, Record<string, HandData[]>>>({});

  useEffect(() => {
    // Fetch data from your .NET Core API
    fetch('/api/hands')
      .then(response => response.json())
      .then(data => setHandData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Poker Hand Ranges Grid</h2>
      <PokerGrid data={handData} />
    </div>
  );
};

export default App;