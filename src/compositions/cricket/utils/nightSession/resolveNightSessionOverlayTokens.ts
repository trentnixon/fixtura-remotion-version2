import type { DesignPalette } from "../../../../core/utils/designPalettes/types";
import {
  isScorelineDarkContainerMode,
  resolveScorelineContainerCopyTokens,
} from "../scoreline/resolveScorelineOverlayTokens";

export type NightSessionBandTokens = {
  "--ns-band-bg": string;
  "--ns-band-border": string;
  "--ns-band-score": string;
  "--ns-band-team": string;
  "--ns-band-meta": string;
  "--ns-outcome-bg": string;
  "--ns-outcome-text": string;
  "--ns-schedule-lockup-bg": string;
  "--ns-performance-row-bg": string;
  "--ns-performance-border": string;
  "--ns-performance-row-rule": string;
  "--ns-performance-player": string;
  "--ns-performance-figure": string;
  "--ns-grade-rail-gradient-mid": string;
  "--ns-grade-rail-gradient-end": string;
};

export const resolveNightSessionBandTokens = (
  selectedPalette: DesignPalette,
): NightSessionBandTokens => {
  const containerCopy = resolveScorelineContainerCopyTokens(selectedPalette);
  const isDark = isScorelineDarkContainerMode(selectedPalette);
  const accent =
    selectedPalette.text.onContainer.accent ||
    selectedPalette.text.onContainer.title;

  return {
    "--ns-band-bg": isDark
      ? "linear-gradient(180deg, rgb(22 25 29 / 80%) 0%, rgb(10 12 14 / 80%) 100%)"
      : "linear-gradient(180deg, rgb(243 240 234 / 80%) 0%, rgb(255 255 255 / 80%) 100%)",
    "--ns-band-border": isDark ? "rgb(255 255 255 / 7%)" : "rgb(8 11 13 / 10%)",
    "--ns-band-score": isDark ? "#ffffff" : containerCopy.text,
    "--ns-band-team": isDark ? "rgb(255 255 255 / 92%)" : containerCopy.text,
    "--ns-band-meta": isDark
      ? "rgb(244 243 241 / 58%)"
      : containerCopy.textMuted,
    "--ns-outcome-bg": isDark
      ? "rgb(10 12 14 / 92%)"
      : "rgb(255 255 255 / 94%)",
    "--ns-outcome-text": isDark ? "rgb(244 243 241 / 92%)" : containerCopy.text,
    "--ns-schedule-lockup-bg": isDark
      ? "rgb(10 12 14 / 95%)"
      : "rgb(255 255 255 / 95%)",
    "--ns-performance-row-bg": isDark
      ? "rgb(10 12 14 / 28%)"
      : "rgb(243 240 234 / 35%)",
    "--ns-performance-border": isDark
      ? "rgb(255 255 255 / 10%)"
      : "rgb(8 11 13 / 12%)",
    "--ns-performance-row-rule": isDark
      ? "rgb(255 255 255 / 7%)"
      : "rgb(8 11 13 / 8%)",
    "--ns-performance-player": isDark
      ? "rgb(244 243 241 / 78%)"
      : containerCopy.textSupport,
    "--ns-performance-figure": isDark ? "#ffffff" : containerCopy.text,
    "--ns-grade-rail-gradient-mid": `color-mix(in srgb, ${accent} 10%, transparent)`,
    "--ns-grade-rail-gradient-end": `color-mix(in srgb, ${accent} 32%, transparent)`,
  };
};
