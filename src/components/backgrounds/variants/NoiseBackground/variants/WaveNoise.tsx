import React from "react";
import { NoiseBackground } from "../NoiseBackground";

/**
 * WaveNoise - Flowing, wave-like noise pattern
 *
 * This variant creates a more fluid, wave-like noise pattern
 * that gives the impression of flowing movement.
 * Great for creating a sense of motion or water-like effects.
 */
const WaveNoise: React.FC<React.ComponentProps<typeof NoiseBackground>> = (
  props,
) => {
  return (
    <NoiseBackground
      noiseOpacity={0.25}
      noiseScale={0.5}
      noiseSpeed={0.03}
      noiseDimension="3d" // 3D noise creates more flowing patterns
      gridSize={25}
      {...props}
    />
  );
};

export default WaveNoise;
