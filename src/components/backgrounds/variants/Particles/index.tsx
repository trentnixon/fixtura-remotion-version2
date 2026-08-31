// src/components/backgrounds/variants/ParticleBackground/index.tsx
import React from "react";
import {
  ParticleBackgroundProps,
  ParticleType,
  ParticleDirection,
  ParticleAnimation,
} from "./config";
import { particleVariants } from "./variants";
import LinesParticles from "./variants/LinesRenderer";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useStylesContext } from "../../../../core/context/StyleContext";

interface ParticleTemplateVariation {
  type?: ParticleType;
  particleCount?: number;
  speed?: number;
  direction?: ParticleDirection;
  animation?: ParticleAnimation;
}

const particleTypeByAnimationType: Record<string, ParticleType> = {
  "streak-lines": "lines",
};

export const ParticleBackground: React.FC<ParticleBackgroundProps> = () => {
  const { video } = useVideoDataContext();
  const { selectedPalette } = useStylesContext();

  const animationConfig = video.templateVariation?.animation;
  const existingParticle =
    video.templateVariation?.useBackground !== "Animated"
      ? (video.templateVariation?.particle as
          | ParticleTemplateVariation
          | undefined)
      : undefined;
  const particleConfig: ParticleTemplateVariation = existingParticle || {
    type: particleTypeByAnimationType[animationConfig?.type || ""] ?? "lines",
    particleCount: animationConfig?.particleCount,
    speed: animationConfig?.speed,
    direction: animationConfig?.direction as ParticleDirection | undefined,
    animation: animationConfig?.animation as ParticleAnimation | undefined,
  };

  const particleProps = {
    particleColor: selectedPalette.background.contrast,
    background: selectedPalette.background.gradient.primaryRadial.css.DEFAULT,
    particleType: (particleConfig.type || "lines") as ParticleType,
    particleCount: particleConfig.particleCount || 300,
    speed: particleConfig.speed || 1,
    direction: particleConfig.direction || "random",
    animation: particleConfig.animation || "fade",
  };

  const ParticleVariant =
    particleVariants[particleConfig.type as ParticleType] ||
    particleVariants.lines;

  return <ParticleVariant {...particleProps} />;
};

export { LinesParticles };

export * from "./config";

export default ParticleBackground;
