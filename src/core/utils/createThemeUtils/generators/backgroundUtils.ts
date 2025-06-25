import tinycolor from "tinycolor2";
import {
  lightenColor,
  darkenColor,
  setOpacity,
} from "../core/baseManipulation";

/**
 * Get a background color based on primary and secondary colors
 */
export const getBackgroundColor = (primary: string): string => {
  return tinycolor(primary).isDark()
    ? lightenColor(primary, 45)
    : darkenColor(primary, 5);
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
    default: getBackgroundColor(primary),
    primary: primary,
    secondary: secondary,
    subtle: setOpacity(primary, 0.05),
    highlight: setOpacity(secondary, 0.2),
  };
};
