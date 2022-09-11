import React, { memo } from 'react';
import f7 from './../images/f7.png';
import f1 from './../images/1.png';
import f2 from './../images/2.png';
import f3 from './../images/3.png';
import f4 from './../images/4.png';
import f5 from './../images/5.png';
import f6 from './../images/6.png';

export const srcData = {
  f1,
  f2,
  f3,
  f4,
  f5,
  f6,
  f7,
};

export const ImageSelector = memo(
  ({ onClick }: { onClick: (src: string) => void }) => {
    return (
      <>
        {Object.values(srcData).map(src => (
          <div>
            <img
              onClick={() => onClick(src)}
              src={src}
              width={80}
              height={80}
            />
          </div>
        ))}
      </>
    );
  }
);
