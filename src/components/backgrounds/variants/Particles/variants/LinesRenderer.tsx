// src/components/backgrounds/variants/ParticleBackground/variants/LinesParticles.tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ParticleBackgroundProps } from "../config";
import { generateParticles, updateParticlePositions } from "../utils";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

const LinesParticles: React.FC<ParticleBackgroundProps> = ({
  particleColor = "#ffffff",
  particleSize = 2,
  particleCount = 100,
  speed = 1,
  direction = "random",
  background = "#000000",
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { selectedPalette } = useThemeContext();

  // Generate particles
  const particles = React.useMemo(() => {
    return generateParticles({
      count: particleCount,
      size: particleSize,
      color: selectedPalette.text.onContainer.light,
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
      className={`bg-particle bg-particle-lines ${className}`}
      style={{
        background,
        overflow: "hidden",
        zIndex: -1,
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {updatedParticles.map((particle) => {
          const endX = particle.x + Math.cos(particle.angle) * 5;
          const endY = particle.y + Math.sin(particle.angle) * 5;

          return (
            <line
              key={particle.id}
              x1={`${particle.x}%`}
              y1={`${particle.y}%`}
              x2={`${endX}%`}
              y2={`${endY}%`}
              stroke={particle.color}
              strokeWidth={particle.size / 2}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export default LinesParticles;
