import tinycolor from "tinycolor2";
import type { DesignPalette } from "../../../../core/utils/designPalettes/types";
import {
  resolveBroadcastProTextOnContainer,
  resolveBroadcastProTextOnGlass,
} from "../broadcastPro/themeColors";

const MATCH_CONTEXT_PANEL_LIGHT = "rgba(243, 240, 234, 0.72)";
const MATCH_CONTEXT_PANEL_DARK = "rgba(8, 11, 13, 0.35)";

export type ScorelineMatchContextTokens = {
  surface: string;
  inset: string;
  textMuted: string;
  text: string;
  accent: string;
};

const resolveOverlaySurfaceBase = (
  selectedPalette: DesignPalette,
  lightTitle: boolean,
): string => {
  const background = selectedPalette.container.background;
  if (
    background &&
    background !== "transparent" &&
    tinycolor(background).getAlpha() > 0
  ) {
    return background;
  }

  return lightTitle ? "#080b0d" : "#f3f0ea";
};

/** Mode-aware match-context strip: panel surface + contrast-safe copy. */
export const resolveScorelineMatchContextTokens = (
  selectedPalette: DesignPalette,
): ScorelineMatchContextTokens => {
  const onContainer = resolveBroadcastProTextOnContainer(selectedPalette);
  const lightTitle = tinycolor(onContainer.title).isLight();
  const surface = lightTitle ? MATCH_CONTEXT_PANEL_DARK : MATCH_CONTEXT_PANEL_LIGHT;
  const surfaceBase = resolveOverlaySurfaceBase(selectedPalette, lightTitle);
  const onPanel = resolveBroadcastProTextOnGlass(
    surfaceBase,
    surface,
    onContainer,
  );

  return {
    surface,
    inset: lightTitle
      ? "inset 0 1px 0 rgb(255 255 255 / 12%)"
      : "inset 0 1px 0 rgb(255 255 255 / 55%)",
    textMuted: onPanel.muted,
    text: onPanel.copy,
    accent: onPanel.accent,
  };
};
