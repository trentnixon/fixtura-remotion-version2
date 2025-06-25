import React from "react";
import { GridNoise } from "../GridNoise";

const PulsingCircles: React.FC<React.ComponentProps<typeof GridNoise>> = (
  props,
) => {
  return (
    <GridNoise
      cellShape="circle"
      noiseOpacity={0.2}
      noiseScale={1.5}
      noiseSpeed={0.01}
      noiseDimension="3d"
      gridSize={15}
      {...props}
    />
  );
};

export default PulsingCircles;
