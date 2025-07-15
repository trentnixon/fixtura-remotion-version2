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

import { ImageEasingType } from "../../easing/types";

// Animation easing options
export type AnimationEasing = ImageEasingType;

// Container animation configuration
export interface ContainerAnimationConfig {
  type: ContainerAnimationType;
  delay?: number;
  duration?: number;
  easing?: AnimationEasing;
  springConfig?: ContainerSpringConfig;
  custom?: Record<string, unknown>;
}

// Animation props
export interface AnimationProps {
  // Animation
  animation?: ContainerAnimationType | ContainerAnimationConfig;
  animationDelay?: number;
  animationDuration?: number;
  animationEasing?: AnimationEasing;
  springConfig?: ContainerSpringConfig;

  // Exit Animation
  exitAnimation?: ContainerAnimationType | ContainerAnimationConfig;
  exitAnimationDelay?: number;
  exitAnimationDuration?: number;
  exitAnimationEasing?: AnimationEasing;
  exitSpringConfig?: ContainerSpringConfig;
  exitFrame?: number;
}

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
 * Spring configuration for container animations
 */
export interface ContainerSpringConfig {
  mass?: number;
  damping?: number;
  stiffness?: number;
  overshootClamping?: boolean;
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
 * Text styling configuration
 */
export interface TextStyleConfig {
  color?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  fontFamily?: string;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  textAlign?: "left" | "center" | "right" | "justify";
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  textShadow?: string;
}

/**
 * Flex layout configuration
 */
export interface FlexLayoutConfig {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  alignContent?:
    | "stretch"
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  gap?: string | number;
}

/**
 * Grid layout configuration
 */
export interface GridLayoutConfig {
  columns?: string;
  rows?: string;
  gap?: string | number;
  columnGap?: string | number;
  rowGap?: string | number;
  autoFlow?: "row" | "column" | "row dense" | "column dense";
  justifyItems?: "start" | "end" | "center" | "stretch";
  alignItems?: "start" | "end" | "center" | "stretch";
  justifyContent?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-around"
    | "space-between"
    | "space-evenly";
  alignContent?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-around"
    | "space-between"
    | "space-evenly";
}

/**
 * Positioning configuration
 */
export interface PositionConfig {
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: number;
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
  paddingTop?: string | number;
  paddingRight?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  margin?: string | number;
  marginTop?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;

  // Appearance
  backgroundColor?: string;
  backgroundGradient?: GradientConfig;
  border?: BorderConfig | string;
  borderRadius?: string | number;
  boxShadow?: ShadowConfig | string;
  opacity?: number;

  // Text Styling
  textStyle?: TextStyleConfig;

  // Layout
  display?: "flex" | "grid" | "block" | "inline" | "inline-block" | "none";
  flexLayout?: FlexLayoutConfig;
  gridLayout?: GridLayoutConfig;
  position?: PositionConfig;
  overflow?: "visible" | "hidden" | "scroll" | "auto";

  // Animation
  animation?: ContainerAnimationType | ContainerAnimationConfig;
  animationDelay?: number;
  animationDuration?: number;
  animationEasing?: AnimationEasing;
  springConfig?: ContainerSpringConfig;

  // Exit Animation
  exitAnimation?: ContainerAnimationType | ContainerAnimationConfig;
  exitAnimationDelay?: number;
  exitAnimationDuration?: number;
  exitAnimationEasing?: AnimationEasing;
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
