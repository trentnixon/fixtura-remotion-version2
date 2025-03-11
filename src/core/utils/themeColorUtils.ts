import tinycolor from "tinycolor2";
import { DesignPalette, generateAllPalettes } from "./designPalettes";

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
  saturated: string;
  desaturated: string;
  muted: string;
  accent: string;
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

export interface ContrastSafety {
  safeColor: string;
  contrastRatio: number;
  isAccessible: boolean;
  isLargeTextAccessible: boolean;
  adjustedColor?: string;
}

export interface ThemeColorUtils {
  variations: {
    primary: ColorVariations;
    secondary: ColorVariations;
  };
  designPalettes: {
    primary: DesignPalette;
    secondary: DesignPalette;
    dark: DesignPalette;
    light: DesignPalette;
    accent: DesignPalette;
    complementary: DesignPalette;
    triadic: DesignPalette;
    monochromatic: DesignPalette;
    [key: string]: DesignPalette;
  };
}

/**
 * Gets a contrasting color (black or white) for the provided color
 */
export const getContrastColor = (color: string): string => {
  return tinycolor(color).isDark() ? "#FFFFFF" : "#000000";
};

/**
 * Lightens a color by a specified amount
 */
export const lightenColor = (color: string, amount: number): string => {
  return tinycolor(color).lighten(amount).toString();
};

/**
 * Darkens a color by a specified amount
 */
export const darkenColor = (color: string, amount: number): string => {
  return tinycolor(color).darken(amount).toString();
};

/**
 * Sets the opacity of a color
 */
export const setOpacity = (color: string, alpha: number): string => {
  return tinycolor(color).setAlpha(alpha).toRgbString();
};

/**
 * Get a background color based on primary and secondary colors
 */
export const getBackgroundColor = (
  primary: string,
  secondary: string,
): string => {
  return tinycolor(primary).isDark()
    ? lightenColor(primary, 45)
    : darkenColor(primary, 5);
};

/**
 * Get the complementary color
 */
export const getComplementaryColor = (color: string): string => {
  return tinycolor(color).complement().toString();
};

/**
 * Get split complementary colors
 */
export const getSplitComplementaryColors = (color: string): string[] => {
  const colorObj = tinycolor(color);
  return [
    colorObj.complement().spin(30).toString(),
    colorObj.complement().spin(-30).toString(),
  ];
};

/**
 * Get a monochromatic palette from a color
 */
export const getMonochromaticPalette = (color: string, steps = 5): string[] => {
  return tinycolor(color)
    .monochromatic(steps)
    .map((c) => c.toString());
};

/**
 * Get an analogous palette from a color
 */
export const getAnalogousPalette = (color: string, steps = 5): string[] => {
  return tinycolor(color)
    .analogous(steps)
    .map((c) => c.toString());
};

/**
 * Get a triadic palette from a color
 */
export const getTriadPalette = (color: string): string[] => {
  return tinycolor(color)
    .triad()
    .map((c) => c.toString());
};

/**
 * Generate gradient colors
 */
export const generateGradientArray = (
  startColor: string,
  endColor: string,
  steps: number,
): string[] => {
  const result = [];
  const startObj = tinycolor(startColor);
  const endObj = tinycolor(endColor);

  for (let i = 0; i < steps; i++) {
    const percent = i / (steps - 1);
    result.push(tinycolor.mix(startObj, endObj, percent * 100).toString());
  }

  return result;
};

/**
 * Saturate or desaturate a color
 */
export const saturateOrDesaturateColor = (
  color: string,
  amount: number,
): string => {
  return amount >= 0
    ? tinycolor(color).saturate(amount).toString()
    : tinycolor(color).desaturate(Math.abs(amount)).toString();
};

/**
 * Get title color for gradient background
 */
export const getTitleColorOverGradient = (
  color1: string,
  color2: string,
): string => {
  // Choose title color based on contrast with both gradient colors
  const color1IsDark = tinycolor(color1).isDark();
  const color2IsDark = tinycolor(color2).isDark();

  // If both colors have the same brightness profile, easy decision
  if (color1IsDark === color2IsDark) {
    return color1IsDark ? "#FFFFFF" : "#111827";
  }

  // Otherwise, choose based on which has higher contrast
  const whiteContrast1 = tinycolor.readability(color1, "#FFFFFF");
  const whiteContrast2 = tinycolor.readability(color2, "#FFFFFF");
  const blackContrast1 = tinycolor.readability(color1, "#111827");
  const blackContrast2 = tinycolor.readability(color2, "#111827");

  const whiteAvgContrast = (whiteContrast1 + whiteContrast2) / 2;
  const blackAvgContrast = (blackContrast1 + blackContrast2) / 2;

  return whiteAvgContrast > blackAvgContrast ? "#FFFFFF" : "#111827";
};

/**
 * Get foreground color based on background
 */
export const getForegroundColor = (color1: string, color2: string): string => {
  const isDark = tinycolor.mix(color1, color2, 50).isDark();
  return isDark ? "#F9FAFB" : "#1F2937";
};

/**
 * Generate themed shadow
 */
export const generateThemedShadow = (color: string, size: number): string => {
  const shadowColor = setOpacity(color, 0.2);
  const defaultShadows = {
    5: `0 1px 3px 0 ${shadowColor}, 0 1px 2px 0 ${setOpacity(color, 0.1)}`,
    10: `0 4px 6px -1px ${shadowColor}, 0 2px 4px -1px ${setOpacity(color, 0.1)}`,
    20: `0 10px 15px -3px ${shadowColor}, 0 4px 6px -2px ${setOpacity(color, 0.1)}`,
  };

  return (
    defaultShadows[size as keyof typeof defaultShadows] || defaultShadows[10]
  );
};

/**
 * Generate gradient background
 */
export const generateGradientBackground = (
  color1: string,
  color2: string,
  direction = "to right",
): string => {
  return `linear-gradient(${direction}, ${color1}, ${color2})`;
};

/**
 * Generate alert colors
 */
export const generateAlertColors = (baseColor: string) => {
  return {
    success: tinycolor(baseColor).spin(-110).saturate(20).toString(),
    warning: tinycolor(baseColor).spin(40).saturate(50).toString(),
    error: tinycolor(baseColor).spin(90).saturate(50).toString(),
  };
};

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
  // Generate color variations
  const primaryVariations = generateColorVariations(primary);
  const secondaryVariations = generateColorVariations(secondary);

  // Generate gradients
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

  // Generate utility colors
  const utility = generateUtilityColors(primary);

  // Generate text colors
  const text = generateTextColors(primary, secondary);

  // Generate background colors
  const background = generateBackgroundColors(primary, secondary);

  // Generate shadows
  const shadows = generateShadows(primary);

  // Generate contrast safety
  const contrast = generateContrastSafety(primary, secondary, background);

  // Generate design palettes using the imported function
  const designPalettes = generateAllPalettes(
    primary,
    secondary,
    {
      primary: primaryVariations,
      secondary: secondaryVariations,
    },
    text,
    background,
    utility,
    shadows,
    contrast,
    {
      primary: primaryGradient,
      secondary: secondaryGradient,
      primaryToSecondary: primaryToSecondaryGradient,
      secondaryToPrimary: secondaryToPrimaryGradient,
    },
  );

  // Return theme color utils
  return {
    variations: {
      primary: primaryVariations,
      secondary: secondaryVariations,
    },
    designPalettes,
  };
};
