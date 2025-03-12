import tinycolor from "tinycolor2";
import { UtilityColors } from "../core/types";
import { COLOR_ANGLES } from "../config/constants";

/**
 * Generate alert colors based on a base color
 * @param baseColor The color to derive alert colors from
 * @returns Object with success, warning, and error colors
 */
export const generateAlertColors = (baseColor: string) => {
  return {
    success: tinycolor(baseColor).spin(-110).saturate(20).toString(),
    warning: tinycolor(baseColor).spin(40).saturate(50).toString(),
    error: tinycolor(baseColor).spin(90).saturate(50).toString(),
  };
};

/**
 * Generates utility colors based on a primary color
 * @param primary The primary color
 * @returns UtilityColors object
 */
export const generateUtilityColors = (primary: string): UtilityColors => {
  const alertColors = generateAlertColors(primary);

  return {
    ...alertColors,
    info: tinycolor(primary)
      .spin(COLOR_ANGLES.COMPLEMENTARY)
      .lighten(10)
      .toString(),
    neutral: "#6B7280", // Medium gray
    muted: "#9CA3AF", // Light gray
  };
};

/**
 * Generates a semantic color palette (using color meanings)
 * @param baseColor Base color to derive palette from
 * @returns Semantic color palette
 */
export const generateSemanticPalette = (baseColor: string) => {
  // Start with alert colors
  const alertColors = generateAlertColors(baseColor);

  return {
    ...alertColors,
    // Information-related colors
    info: tinycolor(baseColor)
      .spin(COLOR_ANGLES.COMPLEMENTARY)
      .lighten(10)
      .toString(),
    infoLight: tinycolor(baseColor)
      .spin(COLOR_ANGLES.COMPLEMENTARY)
      .lighten(30)
      .toString(),
    infoDark: tinycolor(baseColor)
      .spin(COLOR_ANGLES.COMPLEMENTARY)
      .darken(10)
      .toString(),

    // Success-related colors
    successLight: tinycolor(alertColors.success).lighten(15).toString(),
    successDark: tinycolor(alertColors.success).darken(15).toString(),

    // Warning-related colors
    warningLight: tinycolor(alertColors.warning).lighten(15).toString(),
    warningDark: tinycolor(alertColors.warning).darken(15).toString(),

    // Error-related colors
    errorLight: tinycolor(alertColors.error).lighten(15).toString(),
    errorDark: tinycolor(alertColors.error).darken(15).toString(),

    // Neutral colors
    neutral: "#6B7280",
    neutralLight: "#D1D5DB",
    neutralDark: "#374151",

    // Misc UI colors
    focus: tinycolor(baseColor).brighten(20).saturate(30).toString(),
    selected: tinycolor(baseColor).saturate(20).toString(),
    disabled: "#9CA3AF",
    placeholder: "#6B7280",
  };
};

/**
 * Generates color pairs for data visualization
 * @param baseColor Base color to derive from
 * @param pairsCount Number of pairs to generate
 * @returns Array of color pairs for data visualization
 */
export const generateDataVisualizationPalette = (
  baseColor: string,
  pairsCount: number = 5,
): Array<[string, string]> => {
  const result: Array<[string, string]> = [];
  const baseColorObj = tinycolor(baseColor);

  // First pair is always based on the primary color
  result.push([
    baseColorObj.toString(),
    baseColorObj.clone().lighten(30).toString(),
  ]);

  // Generate remaining pairs using the color wheel
  const angleStep = 360 / pairsCount;

  for (let i = 1; i < pairsCount; i++) {
    const angle = angleStep * i;
    const mainColor = baseColorObj.clone().spin(angle).toString();
    const secondaryColor = tinycolor(mainColor).lighten(30).toString();

    result.push([mainColor, secondaryColor]);
  }

  return result;
};
