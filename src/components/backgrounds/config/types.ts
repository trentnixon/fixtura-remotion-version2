/**
 * Background type options
 */
export type BackgroundType =
  | "solid"
  | "gradient"
  | "image"
  | "video"
  | "graphics"
  | "pattern"
  | "particle"
  | "noise"
  | "layered"
  | "animated"
  | "texture";

/**
 * Background animation types
 */
export type BackgroundAnimationType =
  | "none"
  | "fade"
  | "zoom"
  | "pan"
  | "kenBurns"
  | "parallax"
  | "slideIn"
  | "slideOut";

/**
 * Background position options
 */
export type BackgroundPosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

/**
 * Background size options
 */
export type BackgroundSize = "cover" | "contain" | "auto" | "stretch";

/**
 * Gradient direction options
 */
export type GradientDirection =
  | "to right"
  | "to left"
  | "to top"
  | "to bottom"
  | "to top right"
  | "to top left"
  | "to bottom right"
  | "to bottom left"
  | string; // For custom degrees (e.g., '45deg')

/**
 * Gradient type options
 */
export type GradientType = "linear" | "radial" | "conic";

/**
 * Solid background props
 */
export interface SolidBackgroundProps {
  type: "solid";
  color?: string;
  opacity?: number;
  animation?: BackgroundAnimationType;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: BackgroundAnimationType;
  exitAnimationDuration?: number;
  exitFrame?: number;
}

/**
 * Gradient background props
 */
export interface GradientBackgroundProps {
  type: "gradient";
  gradientType?: GradientType;
  colors?: string[];
  direction?: GradientDirection;
  positions?: string[]; // For color stops (e.g., ['0%', '50%', '100%'])
  animation?: BackgroundAnimationType;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: BackgroundAnimationType;
  exitAnimationDuration?: number;
  exitFrame?: number;
}

/**
 * Image background props
 */
export interface ImageBackgroundProps {
  type: "image";
  src: string;
  fallbackSrc?: string;
  position?: BackgroundPosition;
  size?: BackgroundSize;
  repeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
  overlay?: {
    color: string;
    opacity: number;
  };
  animation?: BackgroundAnimationType;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: BackgroundAnimationType;
  exitAnimationDuration?: number;
  exitFrame?: number;
}

/**
 * Texture background props
 */
export interface TextureBackgroundProps {
  type: "texture";
  src?: string;
  name?: string; // maps to public/textures/{name}
  url?: string; // direct URL to texture image
  position?: BackgroundPosition;
  size?: BackgroundSize;
  repeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y" | "cover";
  scale?: number | string; // maps to backgroundSize (e.g., 50% or 400px)
  overlay?: {
    // Presentation
    style?: "solid" | "gradient"; // default: solid
    color?: string;
    opacity?: number; // 0..1
    blendMode?:
      | "multiply"
      | "overlay"
      | "screen"
      | "soft-light"
      | "hard-light"
      | "color-burn"
      | "color-dodge"
      | "darken"
      | "lighten"
      | "difference"
      | "exclusion"
      | "hue"
      | "saturation"
      | "color"
      | "luminosity";
    // Gradient-specific (used when style === 'gradient')
    gradientCss?: string; // full CSS string takes precedence if provided
    gradientType?: "linear" | "radial" | "conic";
    gradientDirection?: string; // e.g. 'to right', '45deg'
    gradientColors?: string[]; // e.g. ['#111', '#333']
  };
  animation?: BackgroundAnimationType;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: BackgroundAnimationType;
  exitAnimationDuration?: number;
  exitFrame?: number;
}

/**
 * Video background props
 */
export interface VideoBackgroundProps {
  type: "video";
  src: string;
  fallbackSrc?: string;
  position?: BackgroundPosition;
  size?: BackgroundSize;
  loop?: boolean;
  muted?: boolean;
  overlay?: {
    color: string;
    opacity: number;
  };
  animation?: BackgroundAnimationType;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: BackgroundAnimationType;
  exitAnimationDuration?: number;
  exitFrame?: number;
}

/**
 * Graphics background props
 */
export interface GraphicsBackgroundProps {
  type: "graphics";
  variant?: "abstract" | "geometric" | "waves" | "dots" | "lines" | "custom";
  primaryColor?: string;
  secondaryColor?: string;
  density?: "low" | "medium" | "high";
  animation?: BackgroundAnimationType;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: BackgroundAnimationType;
  exitAnimationDuration?: number;
  exitFrame?: number;
  customProps?: Record<string, unknown>;
}

/**
 * Pattern background props
 */
export interface PatternBackgroundProps {
  type: "pattern";
  pattern:
    | "dots"
    | "lines"
    | "grid"
    | "chevron"
    | "triangles"
    | "hexagons"
    | "custom";
  primaryColor?: string;
  secondaryColor?: string;
  scale?: number;
  rotation?: number;
  animation?: BackgroundAnimationType;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: BackgroundAnimationType;
  exitAnimationDuration?: number;
  exitFrame?: number;
  customProps?: Record<string, unknown>;
}

/**
 * Particle background props
 */
export interface ParticleBackgroundProps {
  type: "particle";
  particleType?: "dots" | "lines" | "bubbles" | "snow" | "confetti" | "custom";
  particleColor?: string | string[];
  particleSize?: number | [number, number]; // Single size or [min, max]
  particleCount?: number;
  speed?: number;
  direction?: "random" | "up" | "down" | "left" | "right";
  backgroundColor?: string;
  animation?: BackgroundAnimationType;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: BackgroundAnimationType;
  exitAnimationDuration?: number;
  exitFrame?: number;
  customProps?: Record<string, unknown>;
}

/**
 * Noise background props
 */
export interface NoiseBackgroundProps {
  type: "noise";
  baseColor?: string;
  noiseColor?: string;
  noiseOpacity?: number;
  noiseScale?: number;
  noiseSpeed?: number;
  noiseDimension?: "2d" | "3d";
  noiseSeed?: string;
  animation?: BackgroundAnimationType;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: BackgroundAnimationType;
  exitAnimationDuration?: number;
  exitFrame?: number;
}

/**
 * Layered background props
 */
export interface LayeredBackgroundProps {
  type: "layered";
  layers: BackgroundProps[];
  animation?: BackgroundAnimationType;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: BackgroundAnimationType;
  exitAnimationDuration?: number;
  exitFrame?: number;
}

/**
 * Animated background props
 */
export interface AnimatedBackgroundProps {
  type: "animated";
  animationType:
    | "pulsingGradient"
    | "movingGradient"
    | "breathingColor"
    | "waveEffect";
  colors?: string[];
  baseColor?: string;
  duration?: number;
  intensity?: number;
  direction?: string;
  animation?: BackgroundAnimationType;
  animationDuration?: number;
  animationDelay?: number;
  exitAnimation?: BackgroundAnimationType;
  exitAnimationDuration?: number;
  exitFrame?: number;
}

/**
 * Combined background props type
 */
export type BackgroundProps =
  | SolidBackgroundProps
  | GradientBackgroundProps
  | ImageBackgroundProps
  | VideoBackgroundProps
  | GraphicsBackgroundProps
  | PatternBackgroundProps
  | ParticleBackgroundProps
  | NoiseBackgroundProps
  | LayeredBackgroundProps
  | AnimatedBackgroundProps
  | TextureBackgroundProps;

/**
 * Background controller props
 */
export interface BackgroundControllerProps {
  background?: BackgroundProps;
  fallback?: BackgroundProps; // Fallback background if main one fails
  className?: string;
  style?: React.CSSProperties;
}
