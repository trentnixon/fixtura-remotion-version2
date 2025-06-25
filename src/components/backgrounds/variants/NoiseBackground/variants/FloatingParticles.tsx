import React from "react";
import { ParticleNoise } from "../ParticleNoise";
import { SupportedShape } from "../ShapeNoise";

interface FloatingParticlesProps {
  baseColor?: string;
  shape?: SupportedShape;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  baseColor,
  shape,
}) => {
  return (
    <ParticleNoise
      baseColor={baseColor}
      particleShape={shape}
      speed={0.015}
      circleRadius={10}
      maxOffset={60}
      particleColor="rgba(255, 255, 255, 0.5)"
      particleCount={{ rows: 30, cols: 30 }}
    />
  );
};

export default FloatingParticles;
