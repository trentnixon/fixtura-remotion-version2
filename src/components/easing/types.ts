import React from "react";

/**
 * Image animation types
 */
export type ImageAnimationType =
  | "none"
  | "fadeIn"
  | "fadeOut"
  | "zoomIn"
  | "zoomOut"
  | "slideInLeft"
  | "slideInRight"
  | "slideInTop"
  | "slideInBottom"
  | "slideOutLeft"
  | "slideOutRight"
  | "slideOutTop"
  | "slideOutBottom"
  | "kenBurns"
  | "pulse"
  | "rotate"
  | "rotateIn"
  | "rotateOut"
  | "springScale"
  // Camera-inspired animations
  | "focusIn"
  | "focusOut"
  | "exposureIn"
  | "exposureOut"
  // Cinematic transitions
  | "wipeLeft"
  | "wipeRight"
  | "wipeUp"
  | "wipeDown"
  | "splitHorizontal"
  | "splitVertical"
  // Visual effects
  | "desaturate"
  | "saturate"
  | "tint"
  | "glitch"
  | "ripple"
  // 3D animations
  | "flipX"
  | "flipY"
  | "swing"
  | "zoomPerspective"
  | "depthOfField"
  // Broadcast-style animations
  | "lowerThirdIn"
  | "lowerThirdOut"
  | "scoreboardIn"
  | "statReveal"
  // Advanced composite animations
  | "popAndSpin"
  | "bounceAndFade";

/**
 * Easing types for image animations
 */
export type ImageEasingType =
  | "linear"
  | "ease"
  | "quad"
  | "cubic"
  | "sin"
  | "circle"
  | "exp"
  | "bounce"
  | { type: "poly"; n: number }
  | { type: "elastic"; bounciness?: number }
  | { type: "back"; s?: number }
  | { type: "bezier"; values: [number, number, number, number] }
  | { type: "in" | "out" | "inOut"; base: ImageEasingType };

/**
 * Spring configuration for image animations
 */
export interface ImageSpringConfig {
  mass?: number;
  damping?: number;
  stiffness?: number;
  overshootClamping?: boolean;
}

/**
 * Image animation configuration
 */
export interface ImageAnimationConfig {
  type: ImageAnimationType;
  delay?: number;
  duration?: number;
  easing?: ImageEasingType;
  springConfig?: ImageSpringConfig;
  custom?: Record<string, unknown>;
}

/**
 * Image animation props
 */
export interface ImageAnimationProps {
  animation?: ImageAnimationType | ImageAnimationConfig;
  animationDelay?: number;
  animationDuration?: number;
  animationEasing?: ImageEasingType;
  springConfig?: ImageSpringConfig;
}

/**
 * Animation function type
 */
export type AnimationFunction = (
  frame: number,
  startFrame: number,
  endFrame: number,
  config: ImageAnimationConfig,
  fps?: number,
) => React.CSSProperties;
