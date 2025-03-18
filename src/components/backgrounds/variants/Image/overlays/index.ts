// src/components/backgrounds/variants/Image/overlays/index.ts

// Define overlay styles for image backgrounds
export enum OverlayStyle {
  None = "none",
  Solid = "solid",
  Gradient = "gradient",
  Vignette = "vignette",
  Duotone = "duotone",
  Pattern = "pattern",
  ColorFilter = "colorFilter",
}

// Blend modes that can be used with overlays
export enum BlendMode {
  Normal = "normal",
  Multiply = "multiply",
  Screen = "screen",
  Overlay = "overlay",
  Darken = "darken",
  Lighten = "lighten",
  ColorDodge = "color-dodge",
  ColorBurn = "color-burn",
  HardLight = "hard-light",
  SoftLight = "soft-light",
  Difference = "difference",
  Exclusion = "exclusion",
  Hue = "hue",
  Saturation = "saturation",
  Color = "color",
  Luminosity = "luminosity",
}

// Base configuration for all overlay types
export interface BaseOverlayConfig {
  opacity: number;
  animateOpacity?: boolean;
  blendMode?: BlendMode;
}

// Solid overlay configuration
export interface SolidOverlayConfig extends BaseOverlayConfig {
  style: OverlayStyle.Solid;
  color: string;
}

// Gradient overlay configuration
export interface GradientOverlayConfig extends BaseOverlayConfig {
  style: OverlayStyle.Gradient;
  primaryColor: string;
  secondaryColor: string;
  gradientAngle?: string; // e.g. "135deg"
  gradientType?: "linear" | "radial";
}

// Vignette overlay configuration
export interface VignetteOverlayConfig extends BaseOverlayConfig {
  style: OverlayStyle.Vignette;
  color: string;
  size?: number; // Size of the vignette effect in pixels
  shape?: "circle" | "ellipse";
}

// Duotone overlay configuration
export interface DuotoneOverlayConfig extends BaseOverlayConfig {
  style: OverlayStyle.Duotone;
  shadowColor: string;
  highlightColor: string;
  intensity?: number;
}

// Pattern overlay configuration
export interface PatternOverlayConfig extends BaseOverlayConfig {
  style: OverlayStyle.Pattern;
  patternUrl: string;
  backgroundColor?: string;
  patternScale?: number;
  patternOpacity?: number;
}

// Color filter overlay configuration
export interface ColorFilterOverlayConfig extends BaseOverlayConfig {
  style: OverlayStyle.ColorFilter;
  hueRotate?: number; // 0-360 degrees
  saturate?: number; // percentage, 100% is normal
  brightness?: number; // percentage, 100% is normal
  contrast?: number; // percentage, 100% is normal
  sepia?: number; // 0-100%
}

// Union type of all possible overlay configurations
export type OverlayConfig =
  | { style: OverlayStyle.None }
  | SolidOverlayConfig
  | GradientOverlayConfig
  | VignetteOverlayConfig
  | DuotoneOverlayConfig
  | PatternOverlayConfig
  | ColorFilterOverlayConfig;

// Helper function to create a solid overlay config
export const createSolidOverlay = (
  color: string,
  opacity: number = 0.3,
  blendMode: BlendMode = BlendMode.Normal,
): SolidOverlayConfig => ({
  style: OverlayStyle.Solid,
  color,
  opacity,
  blendMode,
});

// Helper function to create a gradient overlay config
export const createGradientOverlay = (
  primaryColor: string,
  secondaryColor: string,
  gradientAngle: string = "135deg",
  opacity: number = 0.3,
  blendMode: BlendMode = BlendMode.Normal,
): GradientOverlayConfig => ({
  style: OverlayStyle.Gradient,
  primaryColor,
  secondaryColor,
  gradientAngle,
  opacity,
  blendMode,
});

// Helper function to create a vignette overlay config
export const createVignetteOverlay = (
  color: string = "rgba(0,0,0,0.8)",
  size: number = 150,
  opacity: number = 0.7,
  shape: "circle" | "ellipse" = "circle",
): VignetteOverlayConfig => ({
  style: OverlayStyle.Vignette,
  color,
  size,
  shape,
  opacity,
});

// Helper function to create a duotone overlay config
export const createDuotoneOverlay = (
  shadowColor: string = "#222222",
  highlightColor: string = "#ffffff",
  intensity: number = 0.8,
  opacity: number = 0.85,
): DuotoneOverlayConfig => ({
  style: OverlayStyle.Duotone,
  shadowColor,
  highlightColor,
  intensity,
  opacity,
});

// Helper function to create a pattern overlay config
export const createPatternOverlay = (
  patternUrl: string,
  backgroundColor: string = "rgba(0,0,0,0.5)",
  patternScale: number = 1,
  opacity: number = 0.3,
  blendMode: BlendMode = BlendMode.Multiply,
): PatternOverlayConfig => ({
  style: OverlayStyle.Pattern,
  patternUrl,
  backgroundColor,
  patternScale,
  opacity,
  blendMode,
});

// Helper function to create a color filter overlay config
export const createColorFilterOverlay = (
  hueRotate: number = 0,
  saturate: number = 100,
  brightness: number = 100,
  contrast: number = 100,
  sepia: number = 0,
  opacity: number = 1,
): ColorFilterOverlayConfig => ({
  style: OverlayStyle.ColorFilter,
  hueRotate,
  saturate,
  brightness,
  contrast,
  sepia,
  opacity,
});

// Preset overlay configurations
/* export const overlayPresets = {
  // Dark overlays
  darkSolid: createSolidOverlay("rgba(0,0,0,0.9)"),
  darkGradient: createGradientOverlay("rgba(0,0,0,1)", "rgba(0,0,0,0.5)"),
  darkVignette: createVignetteOverlay(),

  // Colored overlays
  blueTint: createSolidOverlay("rgba(0,50,150,0.9)", 0.3, BlendMode.Multiply),
  redTint: createSolidOverlay("rgba(150,0,0,0.3)", 0.3, BlendMode.Multiply),
  greenTint: createSolidOverlay("rgba(0,100,0,0.3)", 0.3, BlendMode.Multiply),

  // Gradient overlays
  blueToGreen: createGradientOverlay(
    "rgba(0,50,150,0.5)",
    "rgba(0,100,50,0.5)",
  ),
  redToOrange: createGradientOverlay(
    "rgba(150,0,0,0.5)",
    "rgba(230,120,0,0.5)",
  ),
  purpleToPink: createGradientOverlay(
    "rgba(100,0,120,0.5)",
    "rgba(230,0,120,0.5)",
  ),

  // Filter effects
  warmFilter: createColorFilterOverlay(20, 110, 105, 105, 20),
  coolFilter: createColorFilterOverlay(180, 90, 95, 100, 0),
  vintageFilter: createColorFilterOverlay(0, 80, 90, 110, 30),
  blackAndWhite: createColorFilterOverlay(0, 0, 100, 110, 0),
};

export default overlayPresets;
 */
