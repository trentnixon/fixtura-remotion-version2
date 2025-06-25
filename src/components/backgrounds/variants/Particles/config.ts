// src/components/backgrounds/variants/ParticleBackground/config.ts

// Supported particle types
export type ParticleType = "dots" | "lines" | "bubbles" | "snow" | "confetti";

// Direction for particle movement
export type ParticleDirection = "up" | "down" | "left" | "right" | "random";

// Animation types
export type ParticleAnimation = "fade" | "scale" | "slide" | "none";

// Basic particle data structure
export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
}

// Props for particle background component
export interface ParticleBackgroundProps {
  // Particle appearance
  particleType?: ParticleType;
  particleColor?: string | string[];
  particleSize?: number | [number, number]; // Single value or [min, max] range
  particleCount?: number;

  // Motion
  speed?: number;
  direction?: ParticleDirection;

  // Background
  background?: string;

  // Animation
  animation?: ParticleAnimation;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: ParticleAnimation;
  exitAnimationDuration?: number;
  exitFrame?: number;

  // For extensibility
  customProps?: Record<string, unknown>;

  // Optional className and style props
  className?: string;
  style?: React.CSSProperties;
}

// Props for individual particle variants
export interface ParticleVariantProps {
  particles: Particle[];
  frame: number;
}

// Export particle types as constants for use in template configuration
export const PARTICLE_TYPES: Record<string, ParticleType> = {
  DOTS: "dots",
  LINES: "lines",
  BUBBLES: "bubbles",
  SNOW: "snow",
  CONFETTI: "confetti",
};

// Export available particle types as an array
export const PARTICLE_VARIANTS: ParticleType[] = [
  "dots",
  "lines",
  "bubbles",
  "snow",
  "confetti",
];

// Default particle settings
export const DEFAULT_PARTICLE_SETTINGS = {
  type: PARTICLE_TYPES.DOTS,
  count: 100,
  size: 4,
  speed: 1,
  direction: "random" as ParticleDirection,
};
