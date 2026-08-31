import tinycolor from "tinycolor2";

/**
 * Maps a CSS color (hex, rgb, named) to a 0–360 hue for lightLeak().
 * Returns 0 for missing or invalid input so WebGL effects always get a finite hue.
 */
export const colorToHue = (color: string | null | undefined): number => {
  if (color == null || color.trim() === "") {
    return 0;
  }

  const parsed = tinycolor(color);
  if (!parsed.isValid()) {
    return 0;
  }

  const hue = parsed.toHsv().h;
  return Number.isFinite(hue) ? hue : 0;
};

/** @deprecated Use colorToHue — kept for existing imports */
export const hexToHue = (hex: string): number => colorToHue(hex);
