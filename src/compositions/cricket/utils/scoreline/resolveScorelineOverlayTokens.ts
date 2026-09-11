import tinycolor from "tinycolor2";
import type { DesignPalette } from "../../../../core/utils/designPalettes/types";
import { ensureContrast } from "../../../../core/utils/designPalettes/types";

const MATCH_CONTEXT_PANEL_LIGHT = "rgba(243, 240, 234, 0.2)";
const MATCH_CONTEXT_PANEL_DARK = "rgba(8, 11, 13, 0.2)";
const SCORELINE_DEFAULT_SURFACE = "#ffffff";

export type ScorelineModeSurfaceVars = {
  containerBackground: string;
  containerBackgroundAlt: string;
  surfaceMuted: string;
  surface: string;
};

const isTransparentContainerBackground = (background: string): boolean =>
  !background ||
  background === "transparent" ||
  tinycolor(background).getAlpha() === 0;

/** Dark family = dark/darkAlt (opaque container.background). Alt flips header copy only. */
export const isScorelineDarkContainerMode = (
  selectedPalette: DesignPalette,
): boolean =>
  !isTransparentContainerBackground(selectedPalette.container.background);

/** Mode container tokens for copy panels — not the overlay canvas fill. */
export const resolveScorelineModeSurfaceVars = (
  selectedPalette: DesignPalette,
): ScorelineModeSurfaceVars => {
  const containerBackground = selectedPalette.container.background;
  const containerBackgroundAlt = selectedPalette.container.backgroundAlt;

  return {
    containerBackground,
    containerBackgroundAlt,
    surfaceMuted: containerBackgroundAlt,
    surface: isScorelineDarkContainerMode(selectedPalette)
      ? containerBackground
      : SCORELINE_DEFAULT_SURFACE,
  };
};

export type ScorelineContainerCopyTokens = {
  surface: string;
  surfaceSolid: string;
  inset: string;
  text: string;
  textMuted: string;
  textSupport: string;
  accent: string;
};

const resolveMutedContainerCopy = (
  background: string,
  copy: string,
): string => {
  const base = ensureContrast(background, copy);
  const dimmed = tinycolor(base).isDark()
    ? tinycolor(base).lighten(25)
    : tinycolor(base).darken(25);

  return ensureContrast(background, dimmed.toRgbString());
};

/**
 * Copy panels: light + lightAlt → light hue + dark copy;
 * dark + darkAlt → dark hue + white copy.
 */
export const resolveScorelineContainerCopyTokens = (
  selectedPalette: DesignPalette,
): ScorelineContainerCopyTokens => {
  const isDark = isScorelineDarkContainerMode(selectedPalette);
  const surfaceSolid = isDark
    ? selectedPalette.container.background
    : selectedPalette.container.backgroundAlt;
  const surface = isDark ? MATCH_CONTEXT_PANEL_DARK : MATCH_CONTEXT_PANEL_LIGHT;
  const copy = ensureContrast(
    surfaceSolid,
    selectedPalette.text.onContainer.copy,
  );
  const textMuted = resolveMutedContainerCopy(surfaceSolid, copy);
  const textSupport = resolveMutedContainerCopy(
    surfaceSolid,
    tinycolor(copy).isDark()
      ? tinycolor(copy).darken(8).toRgbString()
      : tinycolor(copy).lighten(8).toRgbString(),
  );

  return {
    surface,
    surfaceSolid,
    inset: isDark
      ? "inset 0 1px 0 rgb(255 255 255 / 12%)"
      : "inset 0 1px 0 rgb(255 255 255 / 55%)",
    text: copy,
    textMuted,
    textSupport,
    accent:
      selectedPalette.text.onContainer.accent ??
      selectedPalette.container.accent,
  };
};

export type ScorelineMatchContextTokens = {
  surface: string;
  inset: string;
  textMuted: string;
  text: string;
  accent: string;
};

/** Mode-aware match-context strip — follows container family, not Alt title flip. */
export const resolveScorelineMatchContextTokens = (
  selectedPalette: DesignPalette,
): ScorelineMatchContextTokens => {
  const container = resolveScorelineContainerCopyTokens(selectedPalette);

  return {
    surface: container.surface,
    inset: container.inset,
    textMuted: container.textMuted,
    text: container.text,
    accent: container.accent,
  };
};
