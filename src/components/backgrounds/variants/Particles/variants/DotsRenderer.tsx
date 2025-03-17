// src/components/backgrounds/variants/ParticleBackground/variants/DotsParticles.tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ParticleBackgroundProps } from "../config";
import { generateParticles, updateParticlePositions } from "../utils";

const DotsParticles: React.FC<ParticleBackgroundProps> = ({
  particleColor = "#ffffff",
  particleSize = 4,
  particleCount = 100,
  speed = 1,
  direction = "random",
  background = "#000000",
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();

  // Generate particles
  const particles = React.useMemo(() => {
    return generateParticles({
      count: particleCount,
      size: particleSize,
      color: particleColor,
      speed,
      direction,
    });
  }, [particleCount, particleSize, particleColor, direction, speed]);

  // Update particle positions based on frame
  const updatedParticles = React.useMemo(() => {
    return updateParticlePositions(particles, frame);
  }, [particles, frame]);

  return (
    <AbsoluteFill
      className={`bg-particle bg-particle-dots ${className}`}
      style={{
        background,
        overflow: "hidden",
        zIndex: -1,
        ...style,
      }}
    >
      {updatedParticles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: "50%",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export default DotsParticles;
