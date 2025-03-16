import React from "react";
import { NoiseBackground } from "../NoiseBackground";

/**
 * GrainNoise - Film grain or paper texture effect
 *
 * This variant creates a more pronounced grainy texture
 * that resembles film grain or paper texture.
 * Great for creating a vintage or analog feel.
 */
const GrainNoise: React.FC<React.ComponentProps<typeof NoiseBackground>> = (
  props,
) => {
  return (
    <NoiseBackground
      noiseOpacity={0.4}
      noiseScale={1}
      noiseSpeed={0.01}
      noiseDimension="3d"
      gridSize={100} // Higher resolution grain
      {...props}
    />
  );
};

export default GrainNoise;
