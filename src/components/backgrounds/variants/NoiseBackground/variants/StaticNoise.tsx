import React from "react";
import { GridNoise } from "../GridNoise";

/**
 * StaticNoise - TV static or electronic interference effect
 *
 * This variant creates a high-contrast, rapidly changing noise pattern
 * that resembles TV static or electronic interference.
 * Great for creating glitchy, tech-inspired backgrounds.
 */
const StaticNoise: React.FC<React.ComponentProps<typeof GridNoise>> = (
  props,
) => {
  return (
    <GridNoise
      noiseOpacity={0.3}
      noiseScale={10}
      noiseSpeed={0.05} // Faster movement for static effect
      noiseDimension="2d"
      gridSize={15} // Higher resolution for more detailed static
      {...props}
    />
  );
};

export default StaticNoise;
