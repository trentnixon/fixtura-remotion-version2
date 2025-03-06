import tinycolor from "tinycolor2";
import {
  getContrastColor,
  lightenColor,
  darkenColor,
  setOpacity,
  getBackgroundColor,
  getComplementaryColor,
  getSplitComplementaryColors,
  getMonochromaticPalette,
  getAnalogousPalette,
  getTriadPalette,
  generateGradientArray,
  saturateOrDesaturateColor,
  getTitleColorOverGradient,
  getForegroundColor,
  generateThemedShadow,
  generateGradientBackground,
  generateAlertColors,
} from "./colors";

// Define interfaces for our color system
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
  [key: string]: string;
}

export interface GradientOptions {
  direction: string;
  type: "linear" | "radial";
  stops: string[];
  css: string;
}

export interface ColorPalettes {
  default: string[];
  monochromatic: string[];
  analogous: string[];
  complementary: string[];
  triadic: string[];
  categorical: string[];
  sequential: string[];
  diverging: string[];
  [key: string]: string[];
}

// Add contrast safety information
export interface ContrastSafety {
  safeColor: string; // Black or white, whichever has better contrast
  contrastRatio: number; // The actual contrast ratio
  isAccessible: boolean; // Whether it meets WCAG AA standard (4.5:1)
  isLargeTextAccessible: boolean; // Whether it meets WCAG AA for large text (3:1)
  adjustedColor?: string; // An adjusted version of the color that meets contrast requirements
}

export interface ThemeColorUtils {
  variations: {
    primary: ColorVariations;
    secondary: ColorVariations;
    [key: string]: ColorVariations;
  };
  gradients: {
    primary: GradientOptions;
    secondary: GradientOptions;
    primaryToSecondary: GradientOptions;
    secondaryToPrimary: GradientOptions;
    [key: string]: GradientOptions;
  };
  palettes: ColorPalettes;
  utility: {
    success: string;
    warning: string;
    error: string;
    info: string;
    [key: string]: string;
  };
  text: {
    onPrimary: string;
    onSecondary: string;
    onLight: string;
    onDark: string;
    [key: string]: string;
  };
  background: {
    light: string;
    dark: string;
    paper: string;
    default: string;
    primary: string;
    secondary: string;
    [key: string]: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
    [key: string]: string;
  };
  // Add contrast safety information
  contrast: {
    primary: ContrastSafety;
    secondary: ContrastSafety;
    background: {
      light: ContrastSafety;
      dark: ContrastSafety;
      primary: ContrastSafety;
      secondary: ContrastSafety;
      [key: string]: ContrastSafety;
    };
    [key: string]: any;
  };
}

/**
 * Calculates contrast safety information for a color
 * Determines the best text color to use and whether it meets accessibility standards
 */
export const calculateContrastSafety = (color: string): ContrastSafety => {
  const colorObj = tinycolor(color);

  // Calculate contrast with white and black
  const whiteContrast = tinycolor.readability(color, "#FFFFFF");
  const blackContrast = tinycolor.readability(color, "#000000");

  // Choose the color with better contrast
  const safeColor = whiteContrast > blackContrast ? "#FFFFFF" : "#000000";
  const contrastRatio = Math.max(whiteContrast, blackContrast);

  // Check accessibility standards
  const isAccessible = contrastRatio >= 4.5; // WCAG AA standard
  const isLargeTextAccessible = contrastRatio >= 3; // WCAG AA for large text

  // If not accessible, create an adjusted version that is
  let adjustedColor;
  if (!isAccessible) {
    // Adjust the color by lightening or darkening until it meets standards
    const isLight = colorObj.isLight();
    let adjustedColorObj = colorObj.clone();
    let adjustmentAmount = 0;
    let maxAdjustments = 20;

    while (
      tinycolor.readability(adjustedColorObj.toString(), safeColor) < 4.5 &&
      adjustmentAmount < maxAdjustments
    ) {
      adjustmentAmount += 5;
      adjustedColorObj = isLight
        ? colorObj.darken(adjustmentAmount)
        : colorObj.lighten(adjustmentAmount);
    }

    adjustedColor = adjustedColorObj.toString();
  }

  return {
    safeColor,
    contrastRatio,
    isAccessible,
    isLargeTextAccessible,
    adjustedColor,
  };
};

/**
 * Generates comprehensive color variations for a base color
 */
export const generateColorVariations = (color: string): ColorVariations => {
  const colorObj = tinycolor(color);
  const contrastText = getContrastColor(color);

  return {
    base: color,
    light: lightenColor(color, 10),
    lighter: lightenColor(color, 20),
    lightest: lightenColor(color, 30),
    dark: darkenColor(color, 10),
    darker: darkenColor(color, 20),
    darkest: darkenColor(color, 30),
    transparent: setOpacity(color, 0.8),
    semiTransparent: setOpacity(color, 0.5),
    contrastText,
    saturated: saturateOrDesaturateColor(color, 20),
    desaturated: saturateOrDesaturateColor(color, -20),
    muted: setOpacity(saturateOrDesaturateColor(color, -10), 0.9),
    accent: tinycolor(color).spin(30).toString(),
  };
};

/**
 * Generates gradient options for a color or pair of colors
 */
export const generateGradientOptions = (
  color1: string,
  color2?: string,
  direction: string = "to right",
): GradientOptions => {
  const secondColor = color2 || lightenColor(color1, 20);

  return {
    direction,
    type: "linear",
    stops: [color1, secondColor],
    css: generateGradientBackground(color1, secondColor, direction),
  };
};

/**
 * Generates comprehensive color palettes based on primary and secondary colors
 */
export const generateColorPalettes = (
  primary: string,
  secondary: string,
): ColorPalettes => {
  return {
    default: [primary, secondary],
    monochromatic: getMonochromaticPalette(primary),
    analogous: getAnalogousPalette(primary),
    complementary: [primary, getComplementaryColor(primary)],
    triadic: getTriadPalette(primary),
    categorical: [
      primary,
      secondary,
      getComplementaryColor(primary),
      getComplementaryColor(secondary),
      ...getSplitComplementaryColors(primary),
    ],
    sequential: generateGradientArray(
      lightenColor(primary, 40),
      darkenColor(primary, 20),
      7,
    ),
    diverging: [
      ...generateGradientArray(
        darkenColor(primary, 20),
        lightenColor(primary, 20),
        3,
      ),
      "#cccccc", // Neutral middle
      ...generateGradientArray(
        lightenColor(secondary, 20),
        darkenColor(secondary, 20),
        3,
      ),
    ],
  };
};

/**
 * Generates utility colors based on primary color
 */
export const generateUtilityColors = (primary: string) => {
  const alertColors = generateAlertColors(primary);

  return {
    ...alertColors,
    info: tinycolor(primary).spin(180).lighten(10).toString(),
    neutral: "#6B7280",
    muted: "#9CA3AF",
  };
};

/**
 * Generates text colors optimized for different backgrounds
 */
export const generateTextColors = (primary: string, secondary: string) => {
  return {
    onPrimary: getContrastColor(primary),
    onSecondary: getContrastColor(secondary),
    onLight: "#1F2937",
    onDark: "#F9FAFB",
    title: getTitleColorOverGradient(primary, secondary),
    body: getForegroundColor(primary, secondary),
    muted: setOpacity(getContrastColor(primary), 0.7),
  };
};

/**
 * Generates background colors based on primary and secondary colors
 * with enhanced contrast safety
 */
export const generateBackgroundColors = (
  primary: string,
  secondary: string,
) => {
  const isDarkPrimary = tinycolor(primary).isDark();

  return {
    light: "#F9FAFB",
    dark: "#111827",
    paper: isDarkPrimary ? "#1F2937" : "#FFFFFF",
    default: getBackgroundColor(primary, secondary),
    primary: primary,
    secondary: secondary,
    subtle: setOpacity(primary, 0.05),
    highlight: setOpacity(secondary, 0.2),
  };
};

/**
 * Generates shadow styles based on a color
 */
export const generateShadows = (color: string) => {
  return {
    small: generateThemedShadow(color, 5),
    medium: generateThemedShadow(color, 10),
    large: generateThemedShadow(color, 20),
    glow: `0 0 15px ${setOpacity(color, 0.5)}`,
  };
};

/**
 * Generates contrast safety information for all key colors
 */
export const generateContrastSafety = (
  primary: string,
  secondary: string,
  backgrounds: Record<string, string>,
) => {
  // Calculate contrast safety for primary and secondary colors
  const primarySafety = calculateContrastSafety(primary);
  const secondarySafety = calculateContrastSafety(secondary);

  // Ensure we have all the required background properties
  const backgroundSafety: {
    light: ContrastSafety;
    dark: ContrastSafety;
    primary: ContrastSafety;
    secondary: ContrastSafety;
    [key: string]: ContrastSafety;
  } = {
    light: calculateContrastSafety(backgrounds.light || "#F9FAFB"),
    dark: calculateContrastSafety(backgrounds.dark || "#111827"),
    primary: calculateContrastSafety(backgrounds.primary || primary),
    secondary: calculateContrastSafety(backgrounds.secondary || secondary),
  };

  // Add any additional background colors
  Object.entries(backgrounds).forEach(([key, color]) => {
    if (!["light", "dark", "primary", "secondary"].includes(key)) {
      backgroundSafety[key] = calculateContrastSafety(color);
    }
  });

  return {
    primary: primarySafety,
    secondary: secondarySafety,
    background: backgroundSafety,
  };
};

/**
 * Creates a comprehensive set of color utilities based on primary and secondary colors
 */
export const createThemeColorUtils = (
  primary: string,
  secondary: string,
): ThemeColorUtils => {
  // Generate all color variations and options
  const primaryVariations = generateColorVariations(primary);
  const secondaryVariations = generateColorVariations(secondary);

  const primaryGradient = generateGradientOptions(primary);
  const secondaryGradient = generateGradientOptions(secondary);
  const primaryToSecondaryGradient = generateGradientOptions(
    primary,
    secondary,
  );
  const secondaryToPrimaryGradient = generateGradientOptions(
    secondary,
    primary,
    "to left",
  );

  const palettes = generateColorPalettes(primary, secondary);
  const utility = generateUtilityColors(primary);
  const text = generateTextColors(primary, secondary);
  const background = generateBackgroundColors(primary, secondary);

  // Generate contrast safety information
  const contrast = generateContrastSafety(primary, secondary, background);

  const shadows = generateShadows(primary);

  return {
    variations: {
      primary: primaryVariations,
      secondary: secondaryVariations,
    },
    gradients: {
      primary: primaryGradient,
      secondary: secondaryGradient,
      primaryToSecondary: primaryToSecondaryGradient,
      secondaryToPrimary: secondaryToPrimaryGradient,
    },
    palettes,
    utility,
    text,
    background,
    shadows,
    contrast,
  };
};
