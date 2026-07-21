import tinycolor from "tinycolor2";

/**
 * Diagonal hatch in the shallow angular family (top-left → bottom-right),
 * consistent with header gradients. Integer px spacing reduces moiré at 1080p.
 */
export const PANEL_TEXTURE_ANGLE_DEG = 168;

/** Distance between hatch lines (px). Wider spacing reads softer on broadcast panels. */
export const PANEL_TEXTURE_LINE_SPACING_PX = 6;

/** Line opacity — very restrained; increase only after render review. */
export const PANEL_TEXTURE_LINE_OPACITY = 0.022;

/** Build a repeating diagonal hatch tuned to the panel surface luminance. */
export const getPanelDiagonalTextureImage = (
  surfaceColor: string,
  lineOpacity = PANEL_TEXTURE_LINE_OPACITY,
): string => {
  const isLightSurface = tinycolor(surfaceColor).isLight();
  const lineColor = tinycolor(isLightSurface ? "#000000" : "#ffffff")
    .setAlpha(lineOpacity)
    .toRgbString();
  const gap = PANEL_TEXTURE_LINE_SPACING_PX - 1;

  return `repeating-linear-gradient(${PANEL_TEXTURE_ANGLE_DEG}deg, transparent 0px, transparent ${gap}px, ${lineColor} ${gap}px, ${lineColor} ${PANEL_TEXTURE_LINE_SPACING_PX}px)`;
};
