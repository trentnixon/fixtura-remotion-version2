import React from "react";
import { GridNoise } from "../GridNoise";

/**
 * WaveNoise - Flowing, wave-like noise pattern
 *
 * This variant creates a more fluid, wave-like noise pattern
 * that gives the impression of flowing movement.
 * Great for creating a sense of motion or water-like effects.
 */
const WaveNoise: React.FC<React.ComponentProps<typeof GridNoise>> = (props) => {
  return (
    <GridNoise
      noiseOpacity={0.2}
      noiseScale={2}
      noiseSpeed={0.03}
      noiseDimension="2d" // 2D noise creates a more directional, wave-like flow
      gridSize={15}
      {...props}
    />
  );
};

export default WaveNoise;
