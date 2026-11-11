import tinycolor from "tinycolor2";
import type { DesignPalette } from "../../../../core/utils/designPalettes/types";
import { ensureContrast } from "../../../../core/utils/designPalettes/types";

const OVERLAY_PANEL_MIN_OPACITY = 0.4;
const OVERLAY_PANEL_LIGHT = `rgba(243, 240, 234, ${OVERLAY_PANEL_MIN_OPACITY})`;
const OVERLAY_PANEL_DARK = `rgba(8, 11, 13, ${OVERLAY_PANEL_MIN_OPACITY})`;
const OVERLAY_DEFAULT_SURFACE = "#ffffff";

export type OverlayModeSurfaceVars = {
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
export const isOverlayDarkContainerMode = (
  selectedPalette: DesignPalette,
): boolean =>
  !isTransparentContainerBackground(selectedPalette.container.background);

export const resolveOverlayModeSurfaceVars = (
  selectedPalette: DesignPalette,
): OverlayModeSurfaceVars => {
  const containerBackground = selectedPalette.container.background;
  const containerBackgroundAlt = selectedPalette.container.backgroundAlt;

  return {
    containerBackground,
    containerBackgroundAlt,
    surfaceMuted: containerBackgroundAlt,
    surface: isOverlayDarkContainerMode(selectedPalette)
      ? containerBackground
      : OVERLAY_DEFAULT_SURFACE,
  };
};

export type OverlayContainerCopyTokens = {
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

export const resolveOverlayContainerCopyTokens = (
  selectedPalette: DesignPalette,
): OverlayContainerCopyTokens => {
  const isDark = isOverlayDarkContainerMode(selectedPalette);
  const surfaceSolid = isDark
    ? selectedPalette.container.background
    : selectedPalette.container.backgroundAlt;
  const surface = isDark ? OVERLAY_PANEL_DARK : OVERLAY_PANEL_LIGHT;
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

export const resolveOverlayMatchContextTokens = (
  selectedPalette: DesignPalette,
) => {
  const container = resolveOverlayContainerCopyTokens(selectedPalette);
  const isDark = isOverlayDarkContainerMode(selectedPalette);
  const openCopy = selectedPalette.text.onContainer.copyNoBg;
  const openCopyMuted = tinycolor(openCopy).setAlpha(0.68).toRgbString();
  const openCopyStrong = tinycolor(openCopy).setAlpha(0.92).toRgbString();

  return {
    surface: isDark ? OVERLAY_PANEL_DARK : OVERLAY_PANEL_LIGHT,
    inset: container.inset,
    textMuted: openCopyMuted,
    text: openCopyStrong,
    accent: container.accent,
  };
};

/** Shared 50% performance-area panel tint (Scoreline + Night Session). */
export const resolveOverlayPerformanceAreaSurface = (
  selectedPalette: DesignPalette,
): string => {
  const PERFORMANCE_AREA_PANEL_LIGHT = "rgba(243, 240, 234, 0.5)";
  const PERFORMANCE_AREA_PANEL_DARK = "rgba(8, 11, 13, 0.5)";
  return isOverlayDarkContainerMode(selectedPalette)
    ? PERFORMANCE_AREA_PANEL_DARK
    : PERFORMANCE_AREA_PANEL_LIGHT;
};

/** Shared 75% hero-row panel tint (leaderboard #1, roster rows). */
export const resolveOverlayHeroRowSurface = (
  selectedPalette: DesignPalette,
): string => {
  const HERO_ROW_LIGHT = "rgba(243, 240, 234, 0.75)";
  const HERO_ROW_DARK = "rgba(8, 11, 13, 0.75)";
  return isOverlayDarkContainerMode(selectedPalette)
    ? HERO_ROW_DARK
    : HERO_ROW_LIGHT;
};
