import React from "react";
import { GridNoise } from "../GridNoise";

/**
 * GrainNoise - Film grain or paper texture effect
 *
 * This variant creates a more pronounced grainy texture
 * that resembles film grain or paper texture.
 * Great for creating a vintage or analog feel.
 */
const GrainNoise: React.FC<React.ComponentProps<typeof GridNoise>> = (
  props,
) => {
  return (
    <GridNoise
      {...props}
      noiseOpacity={0.05}
      noiseScale={1}
      noiseSpeed={0.005}
      noiseDimension="2d"
      gridSize={100}
    />
  );
};

export default GrainNoise;
