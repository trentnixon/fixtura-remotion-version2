// src/components/backgrounds/variants/ParticleBackground/variants/index.ts
import { ParticleBackgroundProps, ParticleType } from "../config";
import LinesParticles from "./LinesRenderer";

export const particleVariants: Record<
  ParticleType,
  React.ComponentType<ParticleBackgroundProps>
> = {
  lines: LinesParticles,
};

export { LinesParticles };
