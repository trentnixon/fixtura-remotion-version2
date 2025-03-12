import { TextColors } from "../core/types";
import { getContrastColor, setOpacity } from "../core/baseManipulation";
import { ensureContrast } from "./contrastGenerator";

/**
 * Get title color for gradient background
 * @param color1 First gradient color
 * @param color2 Second gradient color
 * @returns Optimal title color
 */
export const getTitleColorOverGradient = (
  color1: string,
  color2: string,
): string => {
  // Get contrast colors for both gradient colors
  const color1Contrast = getContrastColor(color1);
  const color2Contrast = getContrastColor(color2);

  // If they're the same, easy decision
  if (color1Contrast === color2Contrast) {
    return color1Contrast;
  }

  // Otherwise, use ensureContrast to get the best color
  // We'll check contrast against both colors and choose the better option
  const color1WithWhite = ensureContrast(color1, "#FFFFFF");
  const color1WithBlack = ensureContrast(color1, "#000000");
  const color2WithWhite = ensureContrast(color2, "#FFFFFF");
  const color2WithBlack = ensureContrast(color2, "#000000");

  // Count how many times white vs. black was chosen
  const whiteCount = [color1WithWhite, color2WithWhite].filter(
    (color) => color === "#FFFFFF",
  ).length;

  const blackCount = [color1WithBlack, color2WithBlack].filter(
    (color) => color === "#000000",
  ).length;

  // Return the color that was chosen more often
  return whiteCount >= blackCount ? "#FFFFFF" : "#000000";
};

/**
 * Get foreground color based on background
 * @param color1 First background color
 * @param color2 Second background color (for gradients)
 * @returns Optimal foreground color
 */
export const getForegroundColor = (
  color1: string,
  color2: string = color1,
): string => {
  // For a single color background
  if (color1 === color2) {
    return getContrastColor(color1);
  }

  // For gradient or multiple background colors
  return getTitleColorOverGradient(color1, color2);
};

/**
 * Generates text colors optimized for different backgrounds
 * @param primary Primary color
 * @param secondary Secondary color
 * @returns Text colors object
 */
export const generateTextColors = (
  primary: string,
  secondary: string,
): TextColors => {
  const onPrimary = getContrastColor(primary);
  const onSecondary = getContrastColor(secondary);

  return {
    onPrimary,
    onSecondary,
    onLight: "#1F2937", // Dark gray for light backgrounds
    onDark: "#F9FAFB", // Light gray for dark backgrounds
    title: getTitleColorOverGradient(primary, secondary),
    body: getForegroundColor(primary, secondary),
    muted: setOpacity(getContrastColor(primary), 0.7),
  };
};

/**
 * Generates accessible text colors with specific contrast ratios
 * @param backgroundColor Background color
 * @param options Configuration options
 * @returns Object with accessible text colors
 */
export const generateAccessibleTextColors = (
  backgroundColor: string,
  options: {
    preferredTextColor?: string;
    contrast?: number;
    includeMuted?: boolean;
  } = {},
) => {
  const { preferredTextColor, contrast = 4.5, includeMuted = true } = options;

  // Get base text color with sufficient contrast
  const baseTextColor = preferredTextColor
    ? ensureContrast(backgroundColor, preferredTextColor, contrast)
    : getContrastColor(backgroundColor);

  // Create result object
  const result = {
    base: baseTextColor,
    // Generate heading variants if needed
    heading: baseTextColor,
    // Generate emphasis variant
    emphasis: baseTextColor,
  };

  // Add muted variant if requested
  if (includeMuted) {
    return {
      ...result,
      muted: setOpacity(baseTextColor, 0.7),
      subtle: setOpacity(baseTextColor, 0.5),
    };
  }

  return result;
};
