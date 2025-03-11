import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ParticleBackgroundProps } from "../config";
import { useStylesContext } from "../../../core/context/StyleContext";

interface Props extends Partial<ParticleBackgroundProps> {
  className?: string;
  style?: React.CSSProperties;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
}

export const ParticleBackground: React.FC<Props> = ({
  particleType = "dots",
  particleColor,
  particleSize = 4,
  particleCount = 100,
  speed = 1,
  direction = "random",
  backgroundColor,
  animation,
  animationDuration,
  animationDelay,
  exitAnimation,
  exitAnimationDuration,
  exitFrame,
  customProps,
  className = "",
  style = {},
}) => {
  const { THEME } = useStylesContext();
  const frame = useCurrentFrame();

  // Use provided colors or theme colors
  const bgColor = backgroundColor || THEME.primary;
  const pColor = particleColor || THEME.secondary;

  // Generate particles
  const particles = useMemo(() => {
    const result: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Determine particle size
      let size: number;
      if (Array.isArray(particleSize)) {
        const [min, max] = particleSize;
        size = min + Math.random() * (max - min);
      } else {
        size = particleSize;
      }

      // Determine particle color
      let color: string;
      if (Array.isArray(particleColor)) {
        const index = Math.floor(Math.random() * particleColor.length);
        color = particleColor[index];
      } else {
        color = pColor as string;
      }

      // Determine particle angle based on direction
      let angle: number;
      switch (direction) {
        case "up":
          angle = -Math.PI / 2;
          break;
        case "down":
          angle = Math.PI / 2;
          break;
        case "left":
          angle = Math.PI;
          break;
        case "right":
          angle = 0;
          break;
        case "random":
        default:
          angle = Math.random() * Math.PI * 2;
          break;
      }

      // Create particle
      result.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        color,
        speed: speed * (0.5 + Math.random()),
        angle,
      });
    }

    return result;
  }, [particleCount, particleSize, particleColor, pColor, direction, speed]);

  // Update particle positions based on frame
  const updatedParticles = useMemo(() => {
    return particles.map((particle) => {
      const { x, y, speed, angle } = particle;

      // Calculate new position
      const frameSpeed = speed * 0.05; // Adjust speed for frame rate
      const deltaX = Math.cos(angle) * frameSpeed * frame;
      const deltaY = Math.sin(angle) * frameSpeed * frame;

      // Wrap around screen
      const newX = (x + deltaX) % 100;
      const newY = (y + deltaY) % 100;

      return {
        ...particle,
        x: newX < 0 ? newX + 100 : newX,
        y: newY < 0 ? newY + 100 : newY,
      };
    });
  }, [particles, frame]);

  // Render particles based on type
  const renderParticles = () => {
    switch (particleType) {
      case "dots":
        return updatedParticles.map((particle) => (
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
        ));

      case "lines":
        return (
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
        );

      case "bubbles":
        return updatedParticles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size * 2}px`,
              height: `${particle.size * 2}px`,
              backgroundColor: "transparent",
              border: `${particle.size / 4}px solid ${particle.color}`,
              borderRadius: "50%",
              opacity: 0.7,
            }}
          />
        ));

      case "snow":
        return updatedParticles.map((particle) => (
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
        ));

      case "confetti":
        return updatedParticles.map((particle) => {
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
                backgroundColor: particle.color,
                transform: `rotate(${rotation}rad)`,
              }}
            />
          );
        });

      default:
        return null;
    }
  };

  return (
    <AbsoluteFill
      className={`bg-particle bg-particle-${particleType} ${className}`}
      style={{
        backgroundColor: bgColor,
        overflow: "hidden",
        zIndex: -1,
        ...style,
      }}
    >
      {renderParticles()}
    </AbsoluteFill>
  );
};
