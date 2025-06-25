// variants/PatternBackground/variants/config.ts
import { CSSProperties } from "react";

// Pattern types
export type PatternType =
  | "dots"
  | "lines"
  | "grid"
  | "crosshatch"
  | "triangles"
  | "chevron";

// Animation types
export type AnimationType =
  | "none"
  | "panUp"
  | "panDown"
  | "panLeft"
  | "panRight"
  | "rotate"
  | "pulse";

// Export all available pattern types
export const PATTERN_TYPES = {
  DOTS: "dots",
  LINES: "lines",
  GRID: "grid",
  CROSSHATCH: "crosshatch",
  TRIANGLES: "triangles",
  CHEVRON: "chevron",
};

// Export all available animation types
export const ANIMATION_TYPES = {
  NONE: "none",
  PAN_UP: "panUp",
  PAN_DOWN: "panDown",
  PAN_LEFT: "panLeft",
  PAN_RIGHT: "panRight",
  ROTATE: "rotate",
  PULSE: "pulse",
};

// Base pattern properties
export interface PatternBaseProps {
  primaryColor?: string;
  secondaryColor?: string;
  scale?: number;
  rotation?: number;
  opacity?: number;
  style?: CSSProperties;
}

// Animation properties
export interface AnimationProps {
  animation?: AnimationType;
  animationDuration?: number; // in frames
  animationDelay?: number; // in frames
  animationSpeed?: number; // multiplier for animation speed
}

// Pattern background properties extending base properties
export interface PatternBackgroundProps
  extends PatternBaseProps,
    AnimationProps {
  pattern?: PatternType;
  className?: string;
  customProps?: Record<string, unknown>;
}

// Pattern component shared props
export interface PatternComponentProps
  extends PatternBaseProps,
    AnimationProps {
  frame?: number; // Current frame for animation
}

// Pattern configuration for templates
export interface PatternTemplateConfig {
  type: PatternType;
  scale?: number;
  rotation?: number;
  opacity?: number;
  animation?: AnimationType;
  animationDuration?: number;
  animationSpeed?: number;
}
