// src/components/backgrounds/variants/ParticleBackground/variants/BubblesParticles.tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ParticleBackgroundProps } from "../config";
import { generateParticles, updateParticlePositions } from "../utils";

const BubblesParticles: React.FC<ParticleBackgroundProps> = ({
  particleColor = "#ffffff",
  particleSize = 6,
  particleCount = 50,
  speed = 0.5,
  direction = "up",
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
      className={`bg-particle bg-particle-bubbles ${className}`}
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
            width: `${particle.size * 2}px`,
            height: `${particle.size * 2}px`,
            background: "transparent",
            border: `${particle.size / 4}px solid ${particle.color}`,
            borderRadius: "50%",
            opacity: 0.7,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export default BubblesParticles;
