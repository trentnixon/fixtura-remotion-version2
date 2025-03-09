/**
 * Animation type definitions
 */

// Define animation types
export type AnimationType =
  | "none"
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "scaleIn"
  | "typewriter"
  | "springFadeIn"
  | "springScale"
  | "bounce"
  | "elastic";

// Define easing types
export type EasingType =
  | "linear"
  | "ease"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "cubic"
  | "bounce"
  | "elastic";

// Spring configuration interface
export interface SpringConfig {
  mass?: number;
  damping?: number;
  stiffness?: number;
  overshootClamping?: boolean;
}

// Animation configuration interface
export interface AnimationConfig {
  type: AnimationType;
  delay?: number;
  duration?: number;
  easing?: EasingType;
  springConfig?: SpringConfig;
  custom?: Record<string, any>;
}

// Default animation props
export interface AnimationProps {
  animation?: AnimationType | AnimationConfig;
  animationDelay?: number;
  animationDuration?: number;
  animationEasing?: EasingType;
  springConfig?: SpringConfig;
}
