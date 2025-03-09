/**
 * Animation system exports
 */

// Export types
export * from "./types";

// Export spring configurations
export { SPRING_CONFIGS } from "./springConfigs";

// Export easing functions
export { getEasingFunction } from "./easingFunctions";

// Export animation utilities
export { normalizeAnimation } from "./animationUtils";

// Export animation hook
export { useAnimation } from "./useAnimation";

// Export individual animations
export { fadeIn, fadeInUp, fadeInDown } from "./fadeAnimations";
export { scaleIn, typewriter } from "./scaleAnimations";
export { springFadeIn, springScale } from "./springAnimations";
export { bounce, elastic } from "./specialAnimations";
