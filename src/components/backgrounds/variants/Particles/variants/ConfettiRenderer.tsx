// src/components/backgrounds/variants/ParticleBackground/variants/ConfettiParticles.tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ParticleBackgroundProps } from "../config";
import { generateParticles, updateParticlePositions } from "../utils";

const ConfettiParticles: React.FC<ParticleBackgroundProps> = ({
  particleColor = ["#ff4d4d", "#4dff4d", "#4d4dff", "#ffff4d", "#ff4dff"],
  particleSize = [3, 7],
  particleCount = 100,
  speed = 0.3,
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
      className={`bg-particle bg-particle-confetti ${className}`}
      style={{
        background,
        overflow: "hidden",
        zIndex: -1,
        ...style,
      }}
    >
      {updatedParticles.map((particle) => {
        const rotation = (particle.angle + frame * 0.01) % (Math.PI * 2);

        return (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size * 2}px`,
              height: `${particle.size}px`,
              background: particle.color,
              transform: `rotate(${rotation}rad)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export default ConfettiParticles;
