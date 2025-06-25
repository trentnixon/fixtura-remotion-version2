// src/components/backgrounds/variants/ParticleBackground/index.tsx
import React from "react";
import {
  ParticleBackgroundProps,
  ParticleType,
  ParticleDirection,
  ParticleAnimation,
} from "./config";
import { particleVariants } from "./variants";

// Import individual particle variants
import DotsParticles from "./variants/DotsRenderer";
import LinesParticles from "./variants/LinesRenderer";
import BubblesParticles from "./variants/BubblesRenderer";
import SnowParticles from "./variants/SnowRenderer";
import ConfettiParticles from "./variants/ConfettiRenderer";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useStylesContext } from "../../../../core/context/StyleContext";

// Define interface for template variation
interface ParticleTemplateVariation {
  type?: ParticleType;
  particleCount?: number;
  speed?: number;
  direction?: ParticleDirection;
  animation?: ParticleAnimation;
}

/**
 * ParticleBackground component that dynamically renders different particle effects
 * based on the specified type.
 */
export const ParticleBackground: React.FC<ParticleBackgroundProps> = () => {
  const { video } = useVideoDataContext();
  const { selectedPalette } = useStylesContext();

  const particleConfig = (video.templateVariation?.particle ||
    {}) as ParticleTemplateVariation;

  const particleProps = {
    particleColor: selectedPalette.background.contrast,
    background: selectedPalette.background.gradient.primaryRadial.css.DEFAULT,
    particleType: particleConfig.type || "dots",
    particleCount: particleConfig.particleCount || 300,
    speed: particleConfig.speed || 1,
    direction: particleConfig.direction || "random",
    animation: particleConfig.animation || "fade",
  };

  // Get the appropriate particle variant component
  const ParticleVariant =
    particleVariants[particleConfig.type as ParticleType] ||
    particleVariants.dots;

  // Render the selected particle variant
  return <ParticleVariant {...particleProps} />;
};

// Export individual variants for direct use
export {
  DotsParticles,
  LinesParticles,
  BubblesParticles,
  SnowParticles,
  ConfettiParticles,
};

// Export types and constants
export * from "./config";

// Default export
export default ParticleBackground;
