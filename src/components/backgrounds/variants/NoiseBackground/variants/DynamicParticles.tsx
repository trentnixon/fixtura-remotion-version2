import React from "react";
import { ParticleNoise } from "../ParticleNoise";
import { SupportedShape } from "../ShapeNoise";

interface DynamicParticlesProps {
  baseColor?: string;
  shape?: SupportedShape;
}

const DynamicParticles: React.FC<DynamicParticlesProps> = ({
  baseColor,
  shape,
}) => {
  return (
    <ParticleNoise
      baseColor={baseColor}
      particleShape={shape}
      speed={0.015}
      circleRadius={4}
      maxOffset={60}
      particleColor="rgba(255, 255, 255, 0.7)"
      particleCount={{ rows: 10, cols: 15 }}
    />
  );
};

export default DynamicParticles;
