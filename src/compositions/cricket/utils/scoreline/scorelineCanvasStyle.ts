import type { CSSProperties } from "react";
import { useMemo } from "react";
import { staticFile } from "remotion";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { deriveScorelineThemeVars } from "./applyScorelineTheme";
import { resolveScorelineMatchContextTokens } from "./resolveScorelineOverlayTokens";

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

  return useMemo(
    () =>
      ({
        ...getScorelineCanvasStyle(colors?.primary, colors?.secondary),
        "--header-text": headerText,
        "--header-accent": headerAccent,
        "--match-context-surface": matchContext.surface,
        "--match-context-inset": matchContext.inset,
        "--match-context-text-muted": matchContext.textMuted,
        "--match-context-text": matchContext.text,
        "--match-context-accent": matchContext.accent,
      }) as CSSProperties,
    [colors?.primary, colors?.secondary, headerAccent, headerText, matchContext],
  );
};
