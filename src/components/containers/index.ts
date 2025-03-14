// Re-export container component
export { AnimatedContainer } from "./AnimatedContainer";

// Re-export types with explicit naming to avoid conflicts
export type {
  ContainerType,
  ContainerSize,
  ContainerRounded,
  ContainerShadow,
  ContainerBackgroundColor,
  ContainerProps,
} from "./types";

// Re-export animation types and utilities
export type {
  ContainerAnimationType,
  ContainerAnimationConfig,
  AnimationEasing,
  AnimationProps,
  ContainerSpringConfig,
} from "./animations";
export {
  normalizeContainerAnimation,
  calculateAnimationStyles,
  useAnimation,
  SPRING_CONFIGS,
} from "./animations";

// Re-export style utilities
export {
  getBackgroundColorStyle,
  getTypeStyles,
  getSizeStyles,
  getRoundedStyles,
  getShadowStyles,
} from "./styles";

// Re-export examples
export * from "./examples";

// Re-export modules
export * from "./modules";
