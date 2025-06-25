import React from "react";
import { GridNoise } from "../GridNoise";

/**
 * SubtleNoise - A very light, subtle noise effect
 *
 * This variant creates a gentle, barely noticeable noise texture
 * that adds just a hint of grain to solid backgrounds.
 * Perfect for adding subtle texture without being distracting.
 */
const SubtleNoise: React.FC<React.ComponentProps<typeof GridNoise>> = (
  props,
) => {
  return (
    <GridNoise
      noiseOpacity={0.05}
      noiseScale={0.5}
      noiseSpeed={0.02}
      noiseDimension="3d"
      gridSize={10}
      {...props}
    />
  );
};

export default SubtleNoise;
