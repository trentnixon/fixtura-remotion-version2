import React from "react";
import { NoiseBackground } from "../NoiseBackground";

/**
 * SubtleNoise - A very light, subtle noise effect
 *
 * This variant creates a gentle, barely noticeable noise texture
 * that adds just a hint of grain to solid backgrounds.
 * Perfect for adding subtle texture without being distracting.
 */
const SubtleNoise: React.FC<React.ComponentProps<typeof NoiseBackground>> = (
  props,
) => {
  return (
    <NoiseBackground
      noiseOpacity={0.15}
      noiseScale={0.8}
      noiseSpeed={0.02}
      noiseDimension="2d"
      {...props}
    />
  );
};

export default SubtleNoise;
