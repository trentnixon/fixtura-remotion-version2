// variants/PatternBackground/variants/config.ts
import { CSSProperties } from "react";

export type PatternType = "dots";

export type AnimationType =
  | "none"
  | "panUp"
  | "panDown"
  | "panLeft"
  | "panRight"
  | "rotate"
  | "pulse";

export const PATTERN_TYPES = {
  DOTS: "dots",
};

export const ANIMATION_TYPES = {
  NONE: "none",
  PAN_UP: "panUp",
  PAN_DOWN: "panDown",
  PAN_LEFT: "panLeft",
  PAN_RIGHT: "panRight",
  ROTATE: "rotate",
  PULSE: "pulse",
};

export interface PatternBaseProps {
  primaryColor?: string;
  secondaryColor?: string;
  scale?: number;
  rotation?: number;
  opacity?: number;
  animation?: AnimationType;
  animationDuration?: number;
  animationSpeed?: number;
}

export interface PatternComponentProps extends PatternBaseProps {
  className?: string;
  style?: CSSProperties;
}

export interface PatternBackgroundProps extends PatternBaseProps {
  className?: string;
  style?: CSSProperties;
}
