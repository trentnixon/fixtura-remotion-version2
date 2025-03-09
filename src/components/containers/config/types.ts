import React from "react";

/**
 * Container variant types
 */
export type ContainerVariant =
  | "basic"
  | "gradient"
  | "border"
  | "card"
  | "fixture"
  | "score"
  | "player"
  | "leaderboard";

/**
 * Container size types
 */
export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto";

/**
 * Container animation types
 */
export type ContainerAnimationType =
  | "none"
  // Fade animations
  | "fadeIn"
  | "fadeOut"
  // Slide animations
  | "slideInLeft"
  | "slideInRight"
  | "slideInTop"
  | "slideInBottom"
  | "slideOutLeft"
  | "slideOutRight"
  | "slideOutTop"
  | "slideOutBottom"
  // Scale animations
  | "scaleIn"
  | "scaleOut"
  | "scaleInX"
  | "scaleInY"
  | "scaleOutX"
  | "scaleOutY"
  // Special animations
  | "revealLeft"
  | "revealRight"
  | "revealTop"
  | "revealBottom"
  | "collapseLeft"
  | "collapseRight"
  | "collapseTop"
  | "collapseBottom"
  // Spring animations
  | "springIn"
  | "springOut"
  | "springScale"
  | "springTranslateX"
  | "springTranslateY"
  | "springRotate"
  // 3D animations
  | "flipX"
  | "flipY"
  | "rotate3D"
  | "swing"
  | "zoomPerspective"
  | "glitch"
  | "blur";

/**
 * Easing types for container animations
 */
export type ContainerEasingType =
  | "linear"
  | "ease"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "cubic"
  | "bounce"
  | "elastic";

/**
 * Spring configuration for container animations
 */
export interface ContainerSpringConfig {
  mass?: number;
  damping?: number;
  stiffness?: number;
  overshootClamping?: boolean;
}

/**
 * Container animation configuration
 */
export interface ContainerAnimationConfig {
  type: ContainerAnimationType;
  delay?: number;
  duration?: number;
  easing?: ContainerEasingType;
  springConfig?: ContainerSpringConfig;
  custom?: Record<string, any>;
}

/**
 * Background gradient configuration
 */
export interface GradientConfig {
  type: "linear" | "radial";
  colors: string[];
  direction?: string; // e.g., 'to right', '45deg'
  positions?: string[]; // e.g., ['0%', '50%', '100%']
}

/**
 * Border configuration
 */
export interface BorderConfig {
  width?: string | number;
  style?: "solid" | "dashed" | "dotted" | "double";
  color?: string;
  radius?: string | number;
}

/**
 * Shadow configuration
 */
export interface ShadowConfig {
  offsetX?: string | number;
  offsetY?: string | number;
  blur?: string | number;
  spread?: string | number;
  color?: string;
  inset?: boolean;
}

/**
 * Base container props
 */
export interface ContainerProps {
  // Content
  children?: React.ReactNode;

  // Variant
  variant?: ContainerVariant;

  // Dimensions
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  size?: ContainerSize;

  // Spacing
  padding?: string | number;
  margin?: string | number;

  // Appearance
  backgroundColor?: string;
  backgroundGradient?: GradientConfig;
  border?: BorderConfig | string;
  borderRadius?: string | number;
  boxShadow?: ShadowConfig | string;
  opacity?: number;

  // Animation
  animation?: ContainerAnimationType | ContainerAnimationConfig;
  animationDelay?: number;
  animationDuration?: number;
  animationEasing?: ContainerEasingType;
  springConfig?: ContainerSpringConfig;

  // Exit Animation
  exitAnimation?: ContainerAnimationType | ContainerAnimationConfig;
  exitAnimationDelay?: number;
  exitAnimationDuration?: number;
  exitAnimationEasing?: ContainerEasingType;
  exitSpringConfig?: ContainerSpringConfig;
  exitFrame?: number;

  // Other
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;

  // Accessibility
  role?: string;
  ariaLabel?: string;
  tabIndex?: number;
}

/**
 * Animation function type
 */
export type ContainerAnimationFunction = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: ContainerAnimationConfig,
  fps?: number,
) => React.CSSProperties;
