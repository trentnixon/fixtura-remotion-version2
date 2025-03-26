import tinycolor from "tinycolor2";
import { ColorVariations } from "../core/types";
import {
  getContrastColor,
  lightenColor,
  darkenColor,
  setOpacity,
  saturateOrDesaturateColor,
} from "../core/baseManipulation";

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
 * Generates comprehensive color variations for a base color
 */
export const generateColorVariations = (color: string): ColorVariations => {
  //const colorObj = tinycolor(color);
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
