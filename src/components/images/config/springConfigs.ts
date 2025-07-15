import { ImageSpringConfig } from "../../easing/types";

/**
 * Predefined spring configurations for image animations
 */
export const IMAGE_SPRING_CONFIGS: Record<string, ImageSpringConfig> = {
  // Default configuration with balanced settings
  DEFAULT: {
    mass: 1,
    damping: 10,
    stiffness: 100,
  },

  // Responsive configuration with quick response and minimal oscillation
  RESPONSIVE: {
    mass: 1,
    damping: 15,
    stiffness: 120,
  },

  // Bouncy configuration with more oscillation
  BOUNCY: {
    mass: 1,
    damping: 8,
    stiffness: 100,
  },

  // Gentle configuration with slow, smooth movement
  GENTLE: {
    mass: 1.2,
    damping: 14,
    stiffness: 80,
  },

  // Elastic configuration with pronounced bounce
  ELASTIC: {
    mass: 1,
    damping: 4,
    stiffness: 80,
  },

  // Precise configuration with minimal overshoot
  PRECISE: {
    mass: 1,
    damping: 20,
    stiffness: 150,
    overshootClamping: true,
  },

  // Dramatic configuration with exaggerated movement
  DRAMATIC: {
    mass: 2,
    damping: 8,
    stiffness: 120,
  },
};
