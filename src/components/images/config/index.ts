/**
 * Export all image animation related functionality
 */

// Export types
export * from "./types";

// Export spring configurations
export { IMAGE_SPRING_CONFIGS } from "./springConfigs";

// Export easing functions
export { getImageEasingFunction } from "./easingFunctions";

// Export animation utilities
export { normalizeImageAnimation } from "./animationUtils";

// Export animation hooks
export { useImageAnimation, useDualImageAnimation } from "./useImageAnimation";

// Export all animations
export * from "./animations";
