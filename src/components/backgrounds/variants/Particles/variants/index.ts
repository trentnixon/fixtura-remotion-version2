// src/components/backgrounds/variants/ParticleBackground/variants/index.ts
import { ParticleBackgroundProps, ParticleType } from "../config";
import DotsParticles from "./DotsRenderer";
import LinesParticles from "./LinesRenderer";
import BubblesParticles from "./BubblesRenderer";
import SnowParticles from "./SnowRenderer";
import ConfettiParticles from "./ConfettiRenderer";

// Map of particle types to their variant components
export const particleVariants: Record<
  ParticleType,
  React.ComponentType<ParticleBackgroundProps>
> = {
  dots: DotsParticles,
  lines: LinesParticles,
  bubbles: BubblesParticles,
  snow: SnowParticles,
  confetti: ConfettiParticles,
};

// Export all variants
export {
  DotsParticles,
  LinesParticles,
  BubblesParticles,
  SnowParticles,
  ConfettiParticles,
};
