// src/components/backgrounds/variants/ParticleBackground/utils.ts
import { Particle, ParticleDirection } from "./config";
import { random } from "remotion";

/**
 * Generates an array of particles with random positions and specified properties
 */
export function generateParticles({
  count,
  size,
  color,
  speed,
  direction,
}: {
  count: number;
  size: number | [number, number];
  color: string | string[];
  speed: number;
  direction: ParticleDirection;
}): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    // Determine particle size
    let particleSize: number;
    if (Array.isArray(size)) {
      const [min, max] = size;
      particleSize = min + random(`size-${i}`) * (max - min);
    } else {
      particleSize = size;
    }

    // Determine particle color
    let particleColor: string;
    if (Array.isArray(color)) {
      const index = Math.floor(random(`color-index-${i}`) * color.length);
      particleColor = color[index];
    } else {
      particleColor = color as string;
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
        angle = random(`angle-${i}`) * Math.PI * 2;
        break;
    }

    // Create particle
    particles.push({
      id: i,
      x: random(`x-pos-${i}`) * 100, // Position as percentage of container width
      y: random(`y-pos-${i}`) * 100, // Position as percentage of container height
      size: particleSize,
      color: particleColor,
      speed: speed * (0.5 + random(`speed-offset-${i}`)), // Add some randomness to speed
      angle,
    });
  }

  return particles;
}

/**
 * Updates particle positions based on their speed, angle and current frame
 */
export function updateParticlePositions(
  particles: Particle[],
  frame: number,
): Particle[] {
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
}
