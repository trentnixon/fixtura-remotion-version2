import type { CSSProperties } from "react";
import { useMemo } from "react";
import { staticFile } from "remotion";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { deriveScorelineThemeVars } from "./applyScorelineTheme";
import {
  resolveScorelineContainerCopyTokens,
  resolveScorelineMatchContextTokens,
  resolveScorelineModeSurfaceVars,
  resolveScorelineLeaderboardHeroRowSurface,
  resolveScorelineLadderRowSurface,
  resolveScorelinePerformanceAreaSurface,
  resolveScorelineRosterRowSurface,
} from "./resolveScorelineOverlayTokens";

export const getScorelineCanvasStyle = (
  primary?: string,
  secondary?: string,
): CSSProperties => {
  const theme = deriveScorelineThemeVars({ primary, secondary });

  return {
    "--club-primary": theme.clubPrimary,
    "--club-secondary": theme.clubSecondary,
    "--surface-strong-primary": theme.surfaceStrongPrimary,
    "--surface-strong-secondary": theme.surfaceStrongSecondary,
    "--on-surface": theme.onSurface,
    "--contrast-score": theme.contrastScore,
    "--contrast-team": theme.contrastTeam,
    "--contrast-meta-on-surface": theme.contrastMetaOnSurface,
    "--on-surface-muted": theme.onSurfaceMuted,
    "--on-surface-label": theme.onSurfaceLabel,
    "--accent-on-light-primary": theme.accentOnLightPrimary,
    "--accent-on-light-secondary": theme.accentOnLightSecondary,
    "--texture-noise-url": `url("${staticFile("textures/fine-noise.svg")}")`,
  } as CSSProperties;
};

export const useScorelineCanvasStyle = (): CSSProperties => {
  const { colors, selectedPalette } = useThemeContext();
  const headerText = selectedPalette.text.onContainer.title;
  const headerAccent = selectedPalette.text.onContainer.accent;
  const matchContext = useMemo(
    () => resolveScorelineMatchContextTokens(selectedPalette),
    [selectedPalette],
  );
  const modeSurfaces = useMemo(
    () => resolveScorelineModeSurfaceVars(selectedPalette),
    [selectedPalette],
  );
  const containerCopy = useMemo(
    () => resolveScorelineContainerCopyTokens(selectedPalette),
    [selectedPalette],
  );
  const performanceAreaSurface = useMemo(
    () => resolveScorelinePerformanceAreaSurface(selectedPalette),
    [selectedPalette],
  );
  const ladderRowSurface = useMemo(
    () => resolveScorelineLadderRowSurface(selectedPalette),
    [selectedPalette],
  );
  const leaderboardHeroRowSurface = useMemo(
    () => resolveScorelineLeaderboardHeroRowSurface(selectedPalette),
    [selectedPalette],
  );
  const rosterRowSurface = useMemo(
    () => resolveScorelineRosterRowSurface(selectedPalette),
    [selectedPalette],
  );

  return useMemo(
    () =>
      ({
        ...getScorelineCanvasStyle(colors?.primary, colors?.secondary),
        background: "transparent",
        "--container-background": modeSurfaces.containerBackground,
        "--container-background-alt": modeSurfaces.containerBackgroundAlt,
        "--container-surface": containerCopy.surface,
        "--container-surface-solid": containerCopy.surfaceSolid,
        "--container-inset": containerCopy.inset,
        "--container-text": containerCopy.text,
        "--container-text-muted": containerCopy.textMuted,
        "--container-text-support": containerCopy.textSupport,
        "--container-text-accent": containerCopy.accent,
        "--surface-muted": modeSurfaces.surfaceMuted,
        "--surface": modeSurfaces.surface,
        "--header-text": headerText,
        "--header-accent": headerAccent,
        "--match-context-surface": matchContext.surface,
        "--match-context-inset": matchContext.inset,
        "--match-context-text-muted": matchContext.textMuted,
        "--match-context-text": matchContext.text,
        "--match-context-accent": matchContext.accent,
        "--performance-area-surface": performanceAreaSurface,
        "--ladder-row-surface": ladderRowSurface,
        "--leaderboard-hero-row-surface": leaderboardHeroRowSurface,
        "--roster-row-surface": rosterRowSurface,
      }) as CSSProperties,
    [
      colors?.primary,
      colors?.secondary,
      containerCopy,
      headerAccent,
      headerText,
      ladderRowSurface,
      leaderboardHeroRowSurface,
      rosterRowSurface,
      matchContext,
      modeSurfaces,
      performanceAreaSurface,
    ],
  );
};
