import React from "react";
import { NoiseBackground } from "../NoiseBackground";

/**
 * FogNoise - Soft, foggy noise effect
 *
 * This variant creates a soft, cloudy noise pattern
 * that resembles fog or mist.
 * Perfect for creating atmospheric, dreamy backgrounds.
 */
const FogNoise: React.FC<React.ComponentProps<typeof NoiseBackground>> = (
  props,
) => {
  return (
    <NoiseBackground
      noiseOpacity={0.2}
      noiseScale={0.3}
      noiseSpeed={0.01}
      noiseDimension="3d"
      gridSize={15} // Larger cells for a softer look
      {...props}
    />
  );
};

export default FogNoise;
