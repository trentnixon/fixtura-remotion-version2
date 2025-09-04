import {
  BackgroundType,
  GradientType,
  GradientDirection,
  BackgroundPosition,
  BackgroundSize,
  SolidBackgroundProps,
  GradientBackgroundProps,
} from "./types";

/**
 * Default background types
 */
export const BACKGROUND_TYPES: Record<string, BackgroundType> = {
  SOLID: "solid",
  GRADIENT: "gradient",
  IMAGE: "image",
  VIDEO: "video",
  GRAPHICS: "graphics",
  PATTERN: "pattern",
  PARTICLE: "particle",
  // add texture for tiled images with color overlay
  TEXTURE: "texture",
};

/**
 * Default gradient types
 */
export const GRADIENT_TYPES: Record<string, GradientType> = {
  LINEAR: "linear",
  RADIAL: "radial",
  CONIC: "conic",
};

/**
 * Default gradient directions
 */
export const GRADIENT_DIRECTIONS: Record<string, GradientDirection> = {
  RIGHT: "to right",
  LEFT: "to left",
  TOP: "to top",
  BOTTOM: "to bottom",
  TOP_RIGHT: "to top right",
  TOP_LEFT: "to top left",
  BOTTOM_RIGHT: "to bottom right",
  BOTTOM_LEFT: "to bottom left",
  DEG_45: "45deg",
  DEG_90: "90deg",
  DEG_135: "135deg",
  DEG_180: "180deg",
  DEG_225: "225deg",
  DEG_270: "270deg",
  DEG_315: "315deg",
};

/**
 * Default background positions
 */
export const BACKGROUND_POSITIONS: Record<string, BackgroundPosition> = {
  CENTER: "center",
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
};

/**
 * Default background sizes
 */
export const BACKGROUND_SIZES: Record<string, BackgroundSize> = {
  COVER: "cover",
  CONTAIN: "contain",
  AUTO: "auto",
  STRETCH: "stretch",
};

/**
 * Default solid background
 */
export const DEFAULT_SOLID_BACKGROUND: SolidBackgroundProps = {
  type: "solid",
  color: "#1e293b", // Slate-800
  opacity: 1,
  animation: "none",
  animationDuration: 30,
  animationDelay: 0,
  exitAnimation: "none",
  exitAnimationDuration: 30,
  exitFrame: 0,
};

/**
 * Default gradient background
 */
export const DEFAULT_GRADIENT_BACKGROUND: GradientBackgroundProps = {
  type: "gradient",
  gradientType: "linear",
  colors: ["#4F46E5", "#7C3AED"], // Indigo-600 to Purple-600
  direction: "to right",
  animation: "none",
  animationDuration: 30,
  animationDelay: 0,
  exitAnimation: "none",
  exitAnimationDuration: 30,
  exitFrame: 0,
};

/**
 * Default fallback background
 */
export const DEFAULT_FALLBACK_BACKGROUND: SolidBackgroundProps = {
  type: "solid",
  color: "#1e293b", // Slate-800
  opacity: 1,
  animation: "none",
};

// Default texture background
export const DEFAULT_TEXTURE_BACKGROUND = {
  type: "texture" as const,
  repeat: "repeat" as const,
  size: "auto" as const,
  position: "center" as const,
  overlay: {
    opacity: 0.35,
    blendMode: "multiply" as const,
  },
};
