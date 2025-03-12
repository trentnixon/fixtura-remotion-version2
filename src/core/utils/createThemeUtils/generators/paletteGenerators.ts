import tinycolor from "tinycolor2";
import { ColorPalettes } from "../core/types";
import { lightenColor, darkenColor } from "../core/baseManipulation";

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
