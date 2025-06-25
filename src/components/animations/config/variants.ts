// Define all available animation variants
export type AnimationVariant =
  | "fadeIn"
  | "fadeOut"
  | "slideIn"
  | "slideOut"
  | "zoomIn"
  | "zoomOut"
  | "bounce"
  | "pulse";

// Animation configuration
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  keyframes?: Record<string, unknown>;
  initialStyles?: React.CSSProperties;
  finalStyles?: React.CSSProperties;
}

// Get animation configuration based on variant
export const getAnimationConfig = (
  variant: AnimationVariant,
  customDuration?: number,
  customDelay?: number,
): AnimationConfig => {
  const duration = customDuration || 1000; // Default 1 second
  const delay = customDelay || 0;

  switch (variant) {
    case "fadeIn":
      return {
        duration,
        delay,
        easing: "ease-in-out",
        initialStyles: { opacity: 0 },
        finalStyles: { opacity: 1 },
      };
    case "fadeOut":
      return {
        duration,
        delay,
        easing: "ease-in-out",
        initialStyles: { opacity: 1 },
        finalStyles: { opacity: 0 },
      };
    // Add more animation variants as needed
    default:
      return {
        duration,
        delay,
        easing: "ease-in-out",
      };
  }
};
