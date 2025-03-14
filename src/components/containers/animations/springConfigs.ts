import { ContainerSpringConfig } from "./animationTypes";

/**
 * Common spring configurations for container animations
 */
export const SPRING_CONFIGS: Record<string, ContainerSpringConfig> = {
  DEFAULT: {
    mass: 1,
    damping: 10,
    stiffness: 100,
    overshootClamping: false,
  },
  GENTLE: {
    mass: 1,
    damping: 15,
    stiffness: 80,
    overshootClamping: false,
  },
  WOBBLY: {
    mass: 1,
    damping: 8,
    stiffness: 150,
    overshootClamping: false,
  },
  STIFF: {
    mass: 1,
    damping: 20,
    stiffness: 200,
    overshootClamping: false,
  },
  SLOW: {
    mass: 2,
    damping: 15,
    stiffness: 50,
    overshootClamping: false,
  },
  MOLASSES: {
    mass: 3,
    damping: 20,
    stiffness: 30,
    overshootClamping: false,
  },
  BOUNCE: {
    mass: 1,
    damping: 4,
    stiffness: 150,
    overshootClamping: false,
  },
  NO_WOBBLE: {
    mass: 1,
    damping: 40,
    stiffness: 300,
    overshootClamping: false,
  },
};
