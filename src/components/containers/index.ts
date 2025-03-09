/**
 * Export all container components for easy imports
 */

// Export base container
export { Container } from "./Container";

// Export container variants
export { BasicContainer } from "./variants/BasicContainer";
export { GradientContainer } from "./variants/GradientContainer";
export { BorderContainer } from "./variants/BorderContainer";
export { CardContainer } from "./variants/CardContainer";

// Comment out exports for components that don't exist yet
// export { FixtureContainer } from "./variants/FixtureContainer";
// export { ScoreContainer } from "./variants/ScoreContainer";
// export { PlayerContainer } from "./variants/PlayerContainer";
// export { LeaderboardContainer } from "./variants/LeaderboardContainer";

// Export container types
export type {
  ContainerProps,
  ContainerVariant,
  ContainerSize,
  ContainerAnimationType,
  ContainerAnimationConfig,
} from "./config/types";

// Export container constants
export {
  CONTAINER_VARIANTS,
  CONTAINER_SIZES,
  CONTAINER_ANIMATIONS,
  DEFAULT_BORDER,
  DEFAULT_BOX_SHADOW,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_GRADIENT,
} from "./config/constants";
