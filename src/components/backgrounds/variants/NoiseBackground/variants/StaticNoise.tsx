import React from "react";
import { NoiseBackground } from "../NoiseBackground";

/**
 * StaticNoise - TV static or electronic interference effect
 *
 * This variant creates a high-contrast, rapidly changing noise pattern
 * that resembles TV static or electronic interference.
 * Great for creating glitchy, tech-inspired backgrounds.
 */
const StaticNoise: React.FC<React.ComponentProps<typeof NoiseBackground>> = (
  props,
) => {
  return (
    <NoiseBackground
      noiseOpacity={0.5}
      noiseScale={3}
      noiseSpeed={0.2} // Faster movement for static effect
      noiseDimension="2d"
      gridSize={50} // Higher resolution for more detailed static
      {...props}
    />
  );
};

export default StaticNoise;
