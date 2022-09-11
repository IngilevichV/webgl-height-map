import React from 'react';
import DeckGL from '@deck.gl/react';
import { TerrainLayer } from '@deck.gl/geo-layers';

export const SceneDeck = ({ imgSrc }: { imgSrc: string }) => {
  const layer = new TerrainLayer({
    id: 'TerrainLayer',
    elevationDecoder: {
      rScaler: 30,
      gScaler: 0,
      bScaler: 0,
      offset: 0,
    },
    material: {
      diffuse: 1.01,
    },
    elevationData: imgSrc,
    bounds: [-122.1133, 37.6493, -122.3566, 37.8159],
  });

  return (
    <DeckGL
      initialViewState={{
        longitude: -122.25,
        latitude: 37.74,
        zoom: 10,
        maxZoom: 20,
        pitch: 30,
        bearing: 0,
      }}
      layers={[layer]}
      controller={true}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    />
  );
};
