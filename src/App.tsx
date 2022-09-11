import React, { useState } from 'react';
import { Scene } from './components/sceneWebgl';
import { SceneDeck } from './components/sceneDeckgl';
import { ImageSelector } from './components/imageSelector';
import f1 from './components/images/1.png';
import { useWindowSize } from './hooks/useWindowSize';
import './index.css';

const App: React.FC = () => {
  const { width, height } = useWindowSize();
  const [selectedPNG, setSelectedPNG] = useState<string>(f1);

  return (
    <>
      <div className="webgl-scene">
        <Scene width={width / 2} height={height} imgSrc={selectedPNG} />
      </div>

      <div className="deckgl-scene">
        <SceneDeck imgSrc={selectedPNG} />
      </div>

      <div className="image-selector">
        <ImageSelector onClick={setSelectedPNG} />
      </div>
    </>
  );
};

export default App;
