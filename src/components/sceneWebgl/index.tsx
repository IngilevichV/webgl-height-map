import React, { useRef, useEffect } from 'react';
import { draw } from './draw';

export const Scene = ({
  width,
  height,
  imgSrc,
}: {
  width: number;
  height: number;
  imgSrc: string;
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref?.current) {
      draw({ canvas: ref.current, imgSrc });
    }
  }, [width, height, imgSrc]);

  return <canvas ref={ref} id="canvas" width={width} height={height} />;
};
