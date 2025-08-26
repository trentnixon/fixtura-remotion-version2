/**
 * Animation type definitions
 */

import { ImageEasingType } from "../../../easing/types";
export type { ImageEasingType };

// Define animation types
export type AnimationType =
  | "none"
  | "fadeIn"
  | "fadeOut"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "scaleIn"
  | "scaleOutY"
  | "typewriter"
  | "springFadeIn"
  | "springScale"
  | "bounce"
  | "elastic"
  | "slideInLeft"
  | "slideInRight"
  | "slideInUp"
  | "slideInDown"
  | "slideOutLeft"
  | "slideOutRight"
  | "slideOutUp"
  | "slideOutDown";

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
  easing?: ImageEasingType;
  springConfig?: SpringConfig;
  custom?: Record<string, unknown>;
}

// Default animation props
export interface AnimationProps {
  animation?: AnimationType | AnimationConfig;
  animationDelay?: number;
  animationDuration?: number;
  animationEasing?: ImageEasingType;
  springConfig?: SpringConfig;
}
