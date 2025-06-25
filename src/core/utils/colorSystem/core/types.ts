import { DesignPalette } from "../../designPalettes";

// Basic color variation structure
export interface ColorVariations {
  base: string;
  light: string;
  lighter: string;
  lightest: string;
  dark: string;
  darker: string;
  darkest: string;
  transparent: string;
  semiTransparent: string;
  contrastText: string;
  saturated: string;
  desaturated: string;
  muted: string;
  accent: string;
  [key: string]: string;
}

// Gradient options interface
export interface GradientOptions {
  direction: string;
  type: "linear" | "radial";
  stops: string[];
  css: {
    [key: string]: string;
  };
}

// Gradient collection interface
export interface GradientCollection {
  primary: GradientOptions;
  secondary: GradientOptions;
  primaryToSecondary: GradientOptions;
  secondaryToPrimary: GradientOptions;
  [key: string]: GradientOptions;
}

// Contrast safety information
export interface ContrastSafety {
  safeColor: string;
  contrastRatio: number;
  isAccessible: boolean;
  isLargeTextAccessible: boolean;
  adjustedColor?: string;
}

// Text colors for different backgrounds
export interface TextColors {
  onPrimary: string;
  onSecondary: string;
  onLight: string;
  onDark: string;
  title: string;
  body: string;
  muted: string;
  [key: string]: string;
}

// Background colors
export interface BackgroundColors {
  light: string;
  dark: string;
  paper: string;
  default: string;
  primary: string;
  secondary: string;
  subtle: string;
  highlight: string;
  [key: string]: string;
}

// Shadow styles
export interface Shadows {
  small: string;
  medium: string;
  large: string;
  glow: string;
  [key: string]: string;
}

// Utility colors like success, error, etc.
export interface UtilityColors {
  success: string;
  warning: string;
  error: string;
  info: string;
  neutral: string;
  muted: string;
  [key: string]: string;
}

// Contrast safety collection
export interface ContrastSafetyCollection {
  primary: ContrastSafety;
  secondary: ContrastSafety;
  background: {
    light: ContrastSafety;
    dark: ContrastSafety;
    primary: ContrastSafety;
    secondary: ContrastSafety;
    [key: string]: ContrastSafety;
  };
}

// Common utilities needed for palette generation
export interface CommonColorUtils {
  variations: {
    primary: ColorVariations;
    secondary: ColorVariations;
  };
  text: TextColors;
  background: BackgroundColors;
  utility: UtilityColors;
  shadows: Shadows;
  contrast: ContrastSafetyCollection;
  gradients: GradientCollection;
}

// Palette configuration
export interface PaletteConfiguration {
  name: string;
  colors: [string, string]; // Tuple of two colors
  options?: PaletteOptions;
}

// Optional configuration for palette generation
export interface PaletteOptions {
  includeGradients?: boolean;
  includeShadows?: boolean;
  highContrast?: boolean;
  colorSpace?: "rgb" | "hsl" | "lab" | "lch";
}

// Standard output of all color palettes
export interface StandardizedPalettes {
  primary: DesignPalette | unknown;
  secondary: DesignPalette | unknown;
  [key: string]: DesignPalette | unknown;
}

// Complete color system output type
export interface ColorSystem {
  // Color variations for the main colors
  variations: {
    primary: ColorVariations;
    secondary: ColorVariations;
    [key: string]: ColorVariations;
  };

  // Generated palettes
  palettes: StandardizedPalettes;

  // Common utility functions/properties
  utils: {
    getContrastColor: (color: string) => string;
    lightenColor: (color: string, amount: number) => string;
    darkenColor: (color: string, amount: number) => string;
    setOpacity: (color: string, alpha: number) => string;
  };
}
