// src/components/backgrounds/variants/ParticleBackground/variants/SnowParticles.tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ParticleBackgroundProps } from "../config";
import { generateParticles, updateParticlePositions } from "../utils";

const SnowParticles: React.FC<ParticleBackgroundProps> = ({
  particleColor = "#ffffff",
  particleSize = [1, 10],
  particleCount = 150,
  speed = 2,
  direction = "up",
  background = "#0a1128",
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
      className={`bg-particle bg-particle-snow ${className}`}
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
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: 0.8,
            boxShadow: `0 0 ${particle.size}px ${particle.size / 2}px white`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export default SnowParticles;
