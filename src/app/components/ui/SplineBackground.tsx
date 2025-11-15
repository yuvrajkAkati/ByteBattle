'use client';

import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineBackground: React.FC = () => {
  const handleLoad = (spline: any) => {
    if (spline && spline.camera) {
      spline.camera.enableControls = false;
      spline.camera.enableZoom = false;
      spline.camera.enablePan = false;
      spline.camera.enableRotate = false;
    }
  };

  return (
    <div className="w-full h-full pointer-events-none select-none">
      <Spline 
        scene="https://prod.spline.design/4SIjTrT0rrLp7sBB/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          pointerEvents: 'none'
        }}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default SplineBackground;