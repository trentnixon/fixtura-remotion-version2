import {
  ContainerVariant,
  ContainerSize,
  ContainerAnimationType,
  ContainerSpringConfig,
} from "./types";

/**
 * Container variants
 */
export const CONTAINER_VARIANTS: Record<string, ContainerVariant> = {
  BASIC: "basic",
  GRADIENT: "gradient",
  BORDER: "border",
  CARD: "card",
  FIXTURE: "fixture",
  SCORE: "score",
  PLAYER: "player",
  LEADERBOARD: "leaderboard",
};

/**
 * Container sizes
 */
export const CONTAINER_SIZES: Record<
  ContainerSize,
  { width: string; padding: string }
> = {
  xs: { width: "100px", padding: "0.25rem" },
  sm: { width: "200px", padding: "0.5rem" },
  md: { width: "300px", padding: "0.75rem" },
  lg: { width: "400px", padding: "1rem" },
  xl: { width: "500px", padding: "1.25rem" },
  full: { width: "100%", padding: "1rem" },
  auto: { width: "auto", padding: "1rem" },
};

/**
 * Container animations
 */
export const CONTAINER_ANIMATIONS: Record<string, ContainerAnimationType> = {
  NONE: "none",
  // Fade animations
  FADE_IN: "fadeIn",
  FADE_OUT: "fadeOut",
  // Slide animations
  SLIDE_IN_LEFT: "slideInLeft",
  SLIDE_IN_RIGHT: "slideInRight",
  SLIDE_IN_TOP: "slideInTop",
  SLIDE_IN_BOTTOM: "slideInBottom",
  SLIDE_OUT_LEFT: "slideOutLeft",
  SLIDE_OUT_RIGHT: "slideOutRight",
  SLIDE_OUT_TOP: "slideOutTop",
  SLIDE_OUT_BOTTOM: "slideOutBottom",
  // Scale animations
  SCALE_IN: "scaleIn",
  SCALE_OUT: "scaleOut",
  SCALE_IN_X: "scaleInX",
  SCALE_IN_Y: "scaleInY",
  SCALE_OUT_X: "scaleOutX",
  SCALE_OUT_Y: "scaleOutY",
  // Special animations
  REVEAL_LEFT: "revealLeft",
  REVEAL_RIGHT: "revealRight",
  REVEAL_TOP: "revealTop",
  REVEAL_BOTTOM: "revealBottom",
  COLLAPSE_LEFT: "collapseLeft",
  COLLAPSE_RIGHT: "collapseRight",
  COLLAPSE_TOP: "collapseTop",
  COLLAPSE_BOTTOM: "collapseBottom",
  // Spring animations
  SPRING_IN: "springIn",
  SPRING_OUT: "springOut",
};

/**
 * Default animation duration in frames (assuming 30fps)
 */
export const DEFAULT_ANIMATION_DURATION = 30;

/**
 * Default animation delay in frames
 */
export const DEFAULT_ANIMATION_DELAY = 0;

/**
 * Default exit frame
 */
export const DEFAULT_EXIT_FRAME = 60;

/**
 * Spring configurations for container animations
 */
export const CONTAINER_SPRING_CONFIGS: Record<string, ContainerSpringConfig> = {
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
  BOUNCY: {
    mass: 1,
    damping: 5,
    stiffness: 120,
    overshootClamping: false,
  },
  RESPONSIVE: {
    mass: 0.8,
    damping: 12,
    stiffness: 150,
    overshootClamping: false,
  },
  STIFF: {
    mass: 1,
    damping: 20,
    stiffness: 200,
    overshootClamping: true,
  },
};

/**
 * Default border radius
 */
export const DEFAULT_BORDER_RADIUS = "8px";

/**
 * Default box shadow
 */
export const DEFAULT_BOX_SHADOW = "0 4px 6px rgba(0, 0, 0, 0.1)";

/**
 * Default gradient
 */
export const DEFAULT_GRADIENT = {
  type: "linear" as const,
  colors: ["#4F46E5", "#7C3AED"],
  direction: "to right",
};

/**
 * Default border
 */
export const DEFAULT_BORDER = {
  width: "1px",
  style: "solid" as const,
  color: "rgba(0, 0, 0, 0.1)",
  radius: DEFAULT_BORDER_RADIUS,
};
