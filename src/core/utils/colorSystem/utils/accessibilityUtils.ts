import tinycolor from "tinycolor2";
import { ContrastSafety } from "../core/types";
import { WCAG } from "../config/constants";

/**
 * Calculates the contrast ratio between two colors
 * @param foreground The foreground color (typically text)
 * @param background The background color
 * @returns The contrast ratio as a number
 */
export const getContrastRatio = (
  foreground: string,
  background: string,
): number => {
  return tinycolor.readability(foreground, background);
};

/**
 * Determines if the contrast between two colors meets WCAG standards
 * @param foreground The foreground color (typically text)
 * @param background The background color
 * @param level Accessibility level ('AA' or 'AAA')
 * @param isLargeText Whether the text is large (> 18pt or bold > 14pt)
 * @returns Boolean indicating if the contrast meets the standard
 */
export const meetsContrastStandard = (
  foreground: string,
  background: string,
  level: "AA" | "AAA" = "AA",
  isLargeText = false,
): boolean => {
  const ratio = getContrastRatio(foreground, background);

  if (level === "AAA") {
    return isLargeText
      ? ratio >= WCAG.AAA_LARGE_TEXT
      : ratio >= WCAG.AAA_NORMAL_TEXT;
  }

  return isLargeText
    ? ratio >= WCAG.AA_LARGE_TEXT
    : ratio >= WCAG.AA_NORMAL_TEXT;
};

/**
 * Calculates detailed contrast safety information for a color
 * @param color The color to analyze
 * @returns Contrast safety information
 */
export const calculateContrastSafety = (color: string): ContrastSafety => {
  //const colorObj = tinycolor(color);

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
    adjustedColor = findAccessibleVariant(color, safeColor);
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
 * Finds an accessible variant of a color that meets contrast standards
 * @param color The original color
 * @param textColor The text color to contrast with
 * @param targetRatio The target contrast ratio (default: WCAG AA)
 * @returns An adjusted color that meets the contrast standard
 */
export const findAccessibleVariant = (
  color: string,
  textColor: string = "#000000",
  targetRatio: number = WCAG.AA_NORMAL_TEXT,
): string => {
  const colorObj = tinycolor(color);
  const isLight = colorObj.isLight();
  let adjustedColorObj = colorObj.clone();
  let adjustmentAmount = 0;
  const maxAdjustments = 20;

  // Try lightening or darkening the color until it meets the target ratio
  while (
    tinycolor.readability(adjustedColorObj.toString(), textColor) <
      targetRatio &&
    adjustmentAmount < maxAdjustments
  ) {
    adjustmentAmount += 5;
    adjustedColorObj = isLight
      ? colorObj.darken(adjustmentAmount)
      : colorObj.lighten(adjustmentAmount);
  }

  return adjustedColorObj.toString();
};

/**
 * Gets the most accessible text color for a background
 * @param backgroundColor The background color
 * @param customTextColors Array of possible text colors to choose from
 * @returns The most accessible text color
 */
export const getMostAccessibleTextColor = (
  backgroundColor: string,
  customTextColors: string[] = ["#FFFFFF", "#000000"],
): string => {
  let bestColor = customTextColors[0];
  let bestRatio = 0;

  customTextColors.forEach((textColor) => {
    const ratio = getContrastRatio(textColor, backgroundColor);
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestColor = textColor;
    }
  });

  return bestColor;
};

/**
 * Checks if a color is suitable for use as a background with standard text
 * @param color The color to check
 * @param requiredRatio The minimum contrast ratio required
 * @returns Boolean indicating if the color is suitable
 */
export const isSuitableBackground = (
  color: string,
  requiredRatio: number = WCAG.AA_NORMAL_TEXT,
): boolean => {
  const whiteContrast = getContrastRatio("#FFFFFF", color);
  const blackContrast = getContrastRatio("#000000", color);

  return Math.max(whiteContrast, blackContrast) >= requiredRatio;
};

/**
 * Generates a comprehensive contrast report for multiple color combinations
 * @param foregroundColors Array of foreground colors
 * @param backgroundColors Array of background colors
 * @returns Matrix of contrast ratios and accessibility information
 */
export const generateContrastMatrix = (
  foregroundColors: string[],
  backgroundColors: string[],
): {
  ratio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  foreground: string;
  background: string;
}[][] => {
  return backgroundColors.map((bgColor) =>
    foregroundColors.map((fgColor) => ({
      foreground: fgColor,
      background: bgColor,
      ratio: getContrastRatio(fgColor, bgColor),
      meetsAA: meetsContrastStandard(fgColor, bgColor, "AA"),
      meetsAAA: meetsContrastStandard(fgColor, bgColor, "AAA"),
    })),
  );
};

/**
 * Improves a color's accessibility by adjusting it to meet contrast standards
 * @param color The color to improve
 * @param backgroundColor The background it will be displayed on
 * @param targetRatio The target contrast ratio
 * @returns An improved color that meets the contrast standard
 */
export const improveColorAccessibility = (
  color: string,
  backgroundColor: string,
  targetRatio: number = WCAG.AA_NORMAL_TEXT,
): string => {
  const currentRatio = getContrastRatio(color, backgroundColor);

  if (currentRatio >= targetRatio) {
    return color; // Already meets the standard
  }

  // Determine if we need to lighten or darken based on background
  const bgIsDark = tinycolor(backgroundColor).isDark();
  const colorObj = tinycolor(color);

  const step = 2;
  let adjustedColor = color;
  let attempts = 0;
  const maxAttempts = 25;

  // Iteratively adjust the color until it meets the target ratio
  while (
    getContrastRatio(adjustedColor, backgroundColor) < targetRatio &&
    attempts < maxAttempts
  ) {
    if (bgIsDark) {
      // If background is dark, lighten the text
      adjustedColor = colorObj.lighten(step * attempts).toString();
    } else {
      // If background is light, darken the text
      adjustedColor = colorObj.darken(step * attempts).toString();
    }
    attempts++;
  }

  // If we still haven't reached target, try saturating/desaturating
  if (getContrastRatio(adjustedColor, backgroundColor) < targetRatio) {
    const saturatedColor = colorObj.saturate(20).toString();
    const desaturatedColor = colorObj.desaturate(20).toString();

    const saturatedRatio = getContrastRatio(saturatedColor, backgroundColor);
    const desaturatedRatio = getContrastRatio(
      desaturatedColor,
      backgroundColor,
    );

    if (saturatedRatio > desaturatedRatio && saturatedRatio > currentRatio) {
      return saturatedColor;
    } else if (desaturatedRatio > currentRatio) {
      return desaturatedColor;
    }
  }

  return adjustedColor;
};
