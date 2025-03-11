import {
  ContainerVariant,
  ContainerSize,
  ContainerAnimationType,
  ContainerSpringConfig,
  TextStyleConfig,
  FlexLayoutConfig,
  GridLayoutConfig,
  PositionConfig,
} from "./types";

/**
 * Container variants
 */
export const CONTAINER_VARIANTS: Record<string, ContainerVariant> = {
  BASIC: "basic",
  GRADIENT: "gradient",
  BORDER: "border",
  CARD: "card",
  FIXTURE: "fixture",
  SCORE: "score",
  PLAYER: "player",
  LEADERBOARD: "leaderboard",
};

/**
 * Container sizes
 */
export const CONTAINER_SIZES: Record<
  ContainerSize,
  { width: string; padding: string }
> = {
  xs: { width: "100px", padding: "0.25rem" },
  sm: { width: "200px", padding: "0.5rem" },
  md: { width: "300px", padding: "0.75rem" },
  lg: { width: "400px", padding: "1rem" },
  xl: { width: "500px", padding: "1.25rem" },
  full: { width: "100%", padding: "1rem" },
  auto: { width: "auto", padding: "1rem" },
};

/**
 * Container animations
 */
export const CONTAINER_ANIMATIONS: Record<string, ContainerAnimationType> = {
  NONE: "none",
  // Fade animations
  FADE_IN: "fadeIn",
  FADE_OUT: "fadeOut",
  // Slide animations
  SLIDE_IN_LEFT: "slideInLeft",
  SLIDE_IN_RIGHT: "slideInRight",
  SLIDE_IN_TOP: "slideInTop",
  SLIDE_IN_BOTTOM: "slideInBottom",
  SLIDE_OUT_LEFT: "slideOutLeft",
  SLIDE_OUT_RIGHT: "slideOutRight",
  SLIDE_OUT_TOP: "slideOutTop",
  SLIDE_OUT_BOTTOM: "slideOutBottom",
  // Scale animations
  SCALE_IN: "scaleIn",
  SCALE_OUT: "scaleOut",
  SCALE_IN_X: "scaleInX",
  SCALE_IN_Y: "scaleInY",
  SCALE_OUT_X: "scaleOutX",
  SCALE_OUT_Y: "scaleOutY",
  // Special animations
  REVEAL_LEFT: "revealLeft",
  REVEAL_RIGHT: "revealRight",
  REVEAL_TOP: "revealTop",
  REVEAL_BOTTOM: "revealBottom",
  COLLAPSE_LEFT: "collapseLeft",
  COLLAPSE_RIGHT: "collapseRight",
  COLLAPSE_TOP: "collapseTop",
  COLLAPSE_BOTTOM: "collapseBottom",
  // Spring animations
  SPRING_IN: "springIn",
  SPRING_OUT: "springOut",
  SPRING_SCALE: "springScale",
  SPRING_TRANSLATE_X: "springTranslateX",
  SPRING_TRANSLATE_Y: "springTranslateY",
  SPRING_ROTATE: "springRotate",
  // 3D animations
  FLIP_X: "flipX",
  FLIP_Y: "flipY",
  ROTATE_3D: "rotate3D",
  SWING: "swing",
  ZOOM_PERSPECTIVE: "zoomPerspective",
  GLITCH: "glitch",
  BLUR: "blur",
};

/**
 * Default animation duration in frames (assuming 30fps)
 */
export const DEFAULT_ANIMATION_DURATION = 30;

/**
 * Default animation delay in frames
 */
export const DEFAULT_ANIMATION_DELAY = 0;

/**
 * Default exit frame
 */
export const DEFAULT_EXIT_FRAME = 60;

/**
 * Spring configurations for container animations
 */
export const CONTAINER_SPRING_CONFIGS: Record<string, ContainerSpringConfig> = {
  DEFAULT: {
    mass: 1,
    damping: 10,
    stiffness: 100,
    overshootClamping: false,
  },
  GENTLE: {
    mass: 1,
    damping: 15,
    stiffness: 80,
    overshootClamping: false,
  },
  BOUNCY: {
    mass: 1,
    damping: 5,
    stiffness: 120,
    overshootClamping: false,
  },
  RESPONSIVE: {
    mass: 0.8,
    damping: 12,
    stiffness: 150,
    overshootClamping: false,
  },
  STIFF: {
    mass: 1,
    damping: 20,
    stiffness: 200,
    overshootClamping: true,
  },
};

/**
 * Default border radius
 */
export const DEFAULT_BORDER_RADIUS = "8px";

/**
 * Default box shadow
 */
export const DEFAULT_BOX_SHADOW = "0 4px 6px rgba(0, 0, 0, 0.1)";

/**
 * Default gradient
 */
export const DEFAULT_GRADIENT = {
  type: "linear" as const,
  colors: ["#4F46E5", "#7C3AED"],
  direction: "to right",
};

/**
 * Default border
 */
export const DEFAULT_BORDER = {
  width: "1px",
  style: "solid" as const,
  color: "rgba(0, 0, 0, 0.1)",
  radius: DEFAULT_BORDER_RADIUS,
};

/**
 * Default text styles
 */
export const DEFAULT_TEXT_STYLES: Record<string, TextStyleConfig> = {
  DEFAULT: {
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    textAlign: "left",
  },
  HEADING: {
    color: "#ffffff",
    fontSize: "1.5rem",
    fontWeight: 700,
    lineHeight: 1.2,
    textAlign: "center",
  },
  SUBHEADING: {
    color: "#ffffff",
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: 1.3,
    textAlign: "center",
  },
  BODY: {
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    textAlign: "left",
  },
  CAPTION: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.4,
    textAlign: "left",
  },
};

/**
 * Default flex layouts
 */
export const DEFAULT_FLEX_LAYOUTS: Record<string, FlexLayoutConfig> = {
  DEFAULT: {
    direction: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ROW: {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
  },
  COLUMN: {
    direction: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
  ROW_START: {
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "1rem",
  },
  ROW_END: {
    direction: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1rem",
  },
  COLUMN_START: {
    direction: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "1rem",
  },
  COLUMN_END: {
    direction: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1rem",
  },
};

/**
 * Default grid layouts
 */
export const DEFAULT_GRID_LAYOUTS: Record<string, GridLayoutConfig> = {
  DEFAULT: {
    columns: "1fr",
    gap: "1rem",
    justifyItems: "center",
    alignItems: "center",
  },
  TWO_COLUMN: {
    columns: "1fr 1fr",
    gap: "1rem",
    justifyItems: "center",
    alignItems: "center",
  },
  THREE_COLUMN: {
    columns: "1fr 1fr 1fr",
    gap: "1rem",
    justifyItems: "center",
    alignItems: "center",
  },
  FOUR_COLUMN: {
    columns: "1fr 1fr 1fr 1fr",
    gap: "1rem",
    justifyItems: "center",
    alignItems: "center",
  },
  AUTO_FIT: {
    columns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    justifyItems: "center",
    alignItems: "center",
  },
};

/**
 * Default positions
 */
export const DEFAULT_POSITIONS: Record<string, PositionConfig> = {
  DEFAULT: {
    position: "relative",
  },
  ABSOLUTE_CENTER: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1,
  },
  TOP_LEFT: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  TOP_RIGHT: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  BOTTOM_LEFT: {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  BOTTOM_RIGHT: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
};
