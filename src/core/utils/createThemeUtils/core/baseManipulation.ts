import tinycolor from "tinycolor2";

/**
 * Gets a contrasting color (black or white) for the provided color
 */
export const getContrastColor = (color: string): string => {
  return tinycolor(color).isDark() ? "#FFFFFF" : "#000000";
};

/**
 * Lightens a color by a specified amount
 */
export const lightenColor = (color: string, amount: number): string => {
  return tinycolor(color).lighten(amount).toString();
};

/**
 * Darkens a color by a specified amount
 */
export const darkenColor = (color: string, amount: number): string => {
  return tinycolor(color).darken(amount).toString();
};

/**
 * Sets the opacity of a color
 */
export const setOpacity = (color: string, alpha: number): string => {
  return tinycolor(color).setAlpha(alpha).toRgbString();
};

/**
 * Saturate or desaturate a color
 */
export const saturateOrDesaturateColor = (
  color: string,
  amount: number,
): string => {
  return amount >= 0
    ? tinycolor(color).saturate(amount).toString()
    : tinycolor(color).desaturate(Math.abs(amount)).toString();
};
