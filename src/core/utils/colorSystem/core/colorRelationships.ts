import tinycolor from "tinycolor2";
import { COLOR_ANGLES } from "../config/constants";

/**
 * Gets the complementary color (opposite on the color wheel)
 * @param color The base color
 * @returns Complementary color
 */
export const getComplementaryColor = (color: string): string => {
  return tinycolor(color).complement().toString();
};

/**
 * Gets an analogous color (adjacent on the color wheel)
 * @param color The base color
 * @param angle The angle of rotation (default: 30)
 * @returns Analogous color
 */
export const getAnalogousColor = (
  color: string,
  angle = COLOR_ANGLES.ANALOGOUS_1,
): string => {
  return tinycolor(color).spin(angle).toString();
};

/**
 * Gets a triadic color (forms an equilateral triangle on the color wheel)
 * @param color The base color
 * @param index Which triadic color to get (0, 1, or 2)
 * @returns Triadic color
 */
export const getTriadicColor = (color: string, index = 0): string => {
  const triad = tinycolor(color).triad();
  const normalizedIndex = ((index % 3) + 3) % 3; // Ensure index is positive and < 3
  return triad[normalizedIndex].toString();
};

/**
 * Gets split complementary colors
 * @param color The base color
 * @returns Array of split complementary colors
 */
export const getSplitComplementaryColors = (color: string): string[] => {
  const colorObj = tinycolor(color);
  return [
    colorObj.complement().spin(COLOR_ANGLES.ANALOGOUS_1).toString(),
    colorObj.complement().spin(COLOR_ANGLES.ANALOGOUS_2).toString(),
  ];
};

/**
 * Gets an accent color that works well with the base color
 * @param color The base color
 * @returns Accent color
 */
export const getAccentColor = (color: string): string => {
  return tinycolor(color).spin(COLOR_ANGLES.ACCENT).saturate(10).toString();
};

/**
 * Gets a complementary accent color
 * @param color The base color
 * @returns Complementary accent color
 */
export const getAccentComplementary = (color: string): string => {
  return tinycolor(color)
    .complement()
    .spin(COLOR_ANGLES.ACCENT * -1)
    .saturate(10)
    .toString();
};

/**
 * Gets monochromatic colors (different shades/tints of the same hue)
 * @param color The base color
 * @param count Number of colors to generate
 * @returns Array of monochromatic colors
 */
export const getMonochromaticColors = (color: string, count = 5): string[] => {
  return tinycolor(color)
    .monochromatic(count)
    .map((c) => c.toString());
};

/**
 * Gets analogous colors (adjacent on the color wheel)
 * @param color The base color
 * @param count Number of colors to generate
 * @returns Array of analogous colors
 */
export const getAnalogousColors = (color: string, count = 3): string[] => {
  return tinycolor(color)
    .analogous(count)
    .map((c) => c.toString());
};

/**
 * Gets tetradic colors (forms a rectangle on the color wheel)
 * @param color The base color
 * @returns Array of tetradic colors
 */
export const getTetradicColors = (color: string): string[] => {
  return tinycolor(color)
    .tetrad()
    .map((c) => c.toString());
};

/**
 * Determines if two colors have sufficient contrast for text readability
 * @param backgroundColor The background color
 * @param textColor The text color
 * @param isLargeText Whether the text is large (> 18pt or bold > 14pt)
 * @param level Accessibility level ('AA' or 'AAA')
 * @returns Boolean indicating if the contrast is sufficient
 */
export const hasSufficientContrast = (
  backgroundColor: string,
  textColor: string,
  isLargeText = false,
  level: "AA" | "AAA" = "AA",
): boolean => {
  const contrast = tinycolor.readability(backgroundColor, textColor);

  if (level === "AAA") {
    return isLargeText ? contrast >= 4.5 : contrast >= 7;
  }

  return isLargeText ? contrast >= 3 : contrast >= 4.5;
};
