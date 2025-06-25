import React from "react";
import { GridNoise } from "../GridNoise";

/**
 * FogNoise - Soft, foggy noise effect
 *
 * This variant creates a soft, cloudy noise pattern
 * that resembles fog or mist.
 * Perfect for creating atmospheric, dreamy backgrounds.
 */
const FogNoise: React.FC<React.ComponentProps<typeof GridNoise>> = (props) => {
  return (
    <GridNoise
      noiseOpacity={0.15}
      noiseScale={0.7}
      noiseSpeed={0.01}
      noiseDimension="3d" // 3D for a more volumetric feel
      gridSize={10}
      {...props}
    />
  );
};

export default FogNoise;
