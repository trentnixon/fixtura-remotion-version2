import tinycolor from "tinycolor2";
import { ContrastSafety } from "../core/types";

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
    const maxAdjustments = 20;

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
