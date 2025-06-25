import tinycolor from "tinycolor2";
import { ContrastSafety, ContrastSafetyCollection } from "../core/types";
import { WCAG } from "../config/constants";

/**
 * Calculates contrast safety information for a color
 * @param color The color to check
 * @returns Contrast safety information
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
  const isAccessible = contrastRatio >= WCAG.AA_NORMAL_TEXT;
  const isLargeTextAccessible = contrastRatio >= WCAG.AA_LARGE_TEXT;

  // If not accessible, create an adjusted version that is
  let adjustedColor;
  if (!isAccessible) {
    // Adjust the color by lightening or darkening until it meets standards
    const isLight = colorObj.isLight();
    let adjustedColorObj = colorObj.clone();
    let adjustmentAmount = 0;
    const maxAdjustments = 20;

    while (
      tinycolor.readability(adjustedColorObj.toString(), safeColor) <
        WCAG.AA_NORMAL_TEXT &&
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
 * @param primary Primary color
 * @param secondary Secondary color
 * @param backgrounds Background colors
 * @returns Collection of contrast safety info
 */
export const generateContrastSafety = (
  primary: string,
  secondary: string,
  backgrounds: Record<string, string>,
): ContrastSafetyCollection => {
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
 * Ensures a color pair has sufficient contrast
 * @param backgroundColor Background color
 * @param textColor Text color
 * @param minContrast Minimum contrast ratio required
 * @returns Text color with sufficient contrast
 */
export const ensureContrast = (
  backgroundColor: string,
  textColor: string,
  minContrast = WCAG.AA_NORMAL_TEXT,
): string => {
  const contrast = tinycolor.readability(backgroundColor, textColor);

  if (contrast >= minContrast) {
    return textColor;
  }

  // Try white and black to see which has better contrast
  const whiteContrast = tinycolor.readability(backgroundColor, "#FFFFFF");
  const blackContrast = tinycolor.readability(backgroundColor, "#000000");

  // Use the better contrasting color
  if (whiteContrast >= minContrast || blackContrast >= minContrast) {
    return whiteContrast > blackContrast ? "#FFFFFF" : "#000000";
  }

  // If neither white nor black provides enough contrast, adjust the background
  const bgObj = tinycolor(backgroundColor);
  const isLight = bgObj.isLight();

  // Adjust the text color to meet contrast
  let adjustedColor = tinycolor(textColor);
  let attempts = 0;
  const maxAttempts = 20;

  while (
    tinycolor.readability(backgroundColor, adjustedColor.toString()) <
      minContrast &&
    attempts < maxAttempts
  ) {
    adjustedColor = isLight
      ? adjustedColor.darken(5)
      : adjustedColor.lighten(5);
    attempts++;
  }

  return adjustedColor.toString();
};
