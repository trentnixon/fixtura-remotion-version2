import tinycolor from "tinycolor2";
import { ensureContrast } from "../../../../core/utils/designPalettes/types";
import type { DesignPalette } from "../../../../core/utils/designPalettes/types";

export interface BroadcastProRoundedTextOnContainer {
  title: string;
  copy: string;
  muted: string;
  secondary: string;
  accent: string;
}

/** Composite a translucent glass layer over the mode surface for contrast math. */
export const compositeSurfaceColor = (
  surfaceBase: string,
  overlay: string,
): string => {
  const base = tinycolor(surfaceBase).toRgb();
  const layer = tinycolor(overlay).toRgb();
  const alpha = layer.a ?? 1;
  return tinycolor({
    r: layer.r * alpha + base.r * (1 - alpha),
    g: layer.g * alpha + base.g * (1 - alpha),
    b: layer.b * alpha + base.b * (1 - alpha),
  }).toRgbString();
};

const resolveMutedCopy = (background: string, copy: string): string => {
  const base = ensureContrast(background, copy);
  const dimmed = tinycolor(base).isDark()
    ? tinycolor(base).lighten(25)
    : tinycolor(base).darken(25);
  return ensureContrast(background, dimmed.toRgbString());
};

/**
 * Mode-aware on-container copy colours with WCAG contrast against
 * `selectedPalette.container.background` (light / lightAlt / dark / darkAlt).
 */
export const resolveBroadcastProRoundedTextOnContainer = (
  selectedPalette: DesignPalette,
): BroadcastProRoundedTextOnContainer => {
  const bg = selectedPalette.container.background;
  const oc = selectedPalette.text.onContainer;

  // Preserve mode-authored title (lightAlt/darkAlt flip title only, not copy).
  const title = oc.title;
  const copy = ensureContrast(bg, oc.copy);
  const secondary = ensureContrast(bg, oc.secondary ?? oc.copy);
  const accent = oc.accent ?? selectedPalette.container.accent;
  const muted = resolveMutedCopy(bg, oc.copy);

  return { title, copy, muted, secondary, accent };
};

/**
 * Re-resolve copy colours for text sitting on a glass panel (semi-transparent
 * overlay composited over the mode surface).
 */
export const resolveBroadcastProRoundedTextOnGlass = (
  surfaceBase: string,
  glassPanel: string,
  preferred: BroadcastProRoundedTextOnContainer,
): BroadcastProRoundedTextOnContainer => {
  const bg = compositeSurfaceColor(surfaceBase, glassPanel);

  const title = ensureContrast(bg, preferred.title);
  const copy = ensureContrast(bg, preferred.copy);
  const secondary = ensureContrast(bg, preferred.secondary);
  const muted = resolveMutedCopy(bg, preferred.copy);

  return {
    title,
    copy,
    muted,
    secondary,
    accent: preferred.accent,
  };
};

/** Pick readable label/text on an arbitrary background using mode copy preference. */
export const resolveBroadcastProRoundedCopyOnBackground = (
  background: string,
  selectedPalette: DesignPalette,
): string => ensureContrast(background, selectedPalette.text.onContainer.copy);
