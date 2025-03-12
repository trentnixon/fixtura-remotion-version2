import { GradientOptions } from "../core/types";
import { lightenColor } from "../core/baseManipulation";

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
