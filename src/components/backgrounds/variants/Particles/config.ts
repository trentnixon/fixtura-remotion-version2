// src/components/backgrounds/variants/ParticleBackground/config.ts

export type ParticleType = "lines";

export type ParticleDirection = "up" | "down" | "left" | "right" | "random";

export type ParticleAnimation = "fade" | "scale" | "slide" | "none";

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
}

export interface ParticleBackgroundProps {
  particleType?: ParticleType;
  particleColor?: string | string[];
  particleSize?: number | [number, number];
  particleCount?: number;
  speed?: number;
  direction?: ParticleDirection;
  background?: string;
  animation?: ParticleAnimation;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: ParticleAnimation;
  exitAnimationDuration?: number;
  exitFrame?: number;
  customProps?: Record<string, unknown>;
  className?: string;
  style?: React.CSSProperties;
}

export interface ParticleVariantProps {
  particles: Particle[];
  frame: number;
}

export const PARTICLE_TYPES: Record<string, ParticleType> = {
  LINES: "lines",
};

export const PARTICLE_VARIANTS: ParticleType[] = ["lines"];

export const DEFAULT_PARTICLE_SETTINGS = {
  type: PARTICLE_TYPES.LINES,
  count: 100,
  size: 4,
  speed: 1,
  direction: "random" as ParticleDirection,
};
