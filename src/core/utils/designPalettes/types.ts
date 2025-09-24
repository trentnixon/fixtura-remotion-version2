// designPalettes/types.ts
import tinycolor from "tinycolor2";

export interface GradientOptions {
  direction: string;
  type: "linear" | "radial";
  stops: string[];
  css: CSSGradientOptions;
}

export interface CSSGradientOptions {
  CONIC: string;
  DEFAULT: string;
  DIAGONAL: string;
  DIAGONAL_REVERSE: string;
  HORIZONTAL: string;
  HORIZONTAL_REVERSE: string;
  VERTICAL: string;
  VERTICAL_REVERSE: string;
}

export interface BackgroundOptions {
  main: string;
  light: string;
  dark: string;
  primary: string;
  secondary: string;
  userPrimary: string;
  userSecondary: string;
  contrast: string;
  accent: string;
  gradient: {
    radial: string;
    conicGradient: GradientOptions;
    hardStopGradient: GradientOptions;
    meshGradient: GradientOptions;
    primaryAdvanced: GradientOptions;
    primaryRadial: GradientOptions;
    secondaryAdvanced: GradientOptions;
    secondaryRadial: GradientOptions;
    secondaryToPrimary: GradientOptions;
    secondary: GradientOptions;
    primaryToSecondary: GradientOptions;
    primary: GradientOptions;
  };
}

export interface ContainerOptions {
  primary: string;
  secondary: string;
  main: string;
  light: string;
  dark: string;
  accent: string;
  highlight: string;
  transparent: string;
  gradientPrimaryToSecondaryHorizontal: string;
  gradientPrimaryToSecondaryVertical: string;
  gradientSecondaryToPrimaryHorizontal: string;
  gradientSecondaryToPrimaryVertical: string;
  saturated: string;
  transparentAccent: string;
  transparentMain: string;
  transparentSecondary: string;
  transparentPrimary: string;
  muted: string;
  background: string;
  backgroundAlt: string;

  backgroundTransparent: {
    subtle: string;
    low: string;
    medium: string;
    high: string;
    strong: string;
  };
}

export interface TextOptions {
  onBackground: {
    main: string;
    light: string;
    dark: string;
    muted: string;
    accent: string;
  };
  onContainer: {
    primary: string;
    secondary: string;
    light: string;
    dark: string;
    muted: string;
    accent: string;
    title: string;
    copy: string;
    copyNoBg: string;
  };
  title?: string;
  body?: string;
  muted?: string;
  primary?: string;
  secondary?: string;
  accent?: string;
  contrast?: string;
  safePrimary?: string;
  safeSecondary?: string;
  highlight?: string;
}

export interface ShadowOptions {
  small: string;
  medium: string;
  large: string;
  glow: string;
}

export interface DesignPalette {
  name: string;
  background: BackgroundOptions;
  container: ContainerOptions;
  text: TextOptions;
  shadow: ShadowOptions;
}

export interface TextColors {
  onPrimary?: string;
  onSecondary?: string;
  onLight?: string;
  onDark?: string;
  title?: string;
  body?: string;
  [key: string]: string | undefined;
}

export interface UtilityColors {
  success: string;
  warning?: string;
  error?: string;
  [key: string]: string | undefined;
}

export interface ContrastOptions {
  primary: { safeColor: string };
  secondary: { safeColor: string };
}

export interface ColorVariation {
  base: string;
  light: string;
  dark: string;
  lighter?: string;
  darker?: string;
  accent?: string;
  contrastText?: string;
}

export interface ColorVariations {
  primary: ColorVariation;
  secondary: ColorVariation;
  [key: string]: ColorVariation;
}

// Helper function to ensure text has good contrast with background
export const ensureContrast = (
  bgColor: string,
  preferredTextColor: string,
): string => {
  const contrastRatio = tinycolor.readability(bgColor, preferredTextColor);
  if (contrastRatio >= 4.5) return preferredTextColor;

  // If contrast is poor, use the safe color
  const safeColor = tinycolor(bgColor).isDark() ? "#FFFFFF" : "#000000";
  return safeColor;
};

// Helper function to process potentially problematic user colors
export const processUserColor = (userColor: string): string => {
  const color = tinycolor(userColor);

  // If color is too light (might cause contrast issues)
  if (color.getBrightness() > 240) {
    return color.darken(15).toString();
  }

  // If color is too saturated (might be visually harsh)
  if (color.toHsl().s > 0.9) {
    return color.desaturate(20).toString();
  }

  return userColor;
};
