import type { HtmlInCanvasPresetConfig, HtmlInCanvasPresetId } from "./types";

export const HTML_IN_CANVAS_PRESET_IDS = [
  "html-orbit-rings",
  "html-scoreboard-grid",
  "html-neon-beams",
] as const satisfies readonly HtmlInCanvasPresetId[];

export const HTML_IN_CANVAS_PRESETS: Record<
  HtmlInCanvasPresetId,
  HtmlInCanvasPresetConfig
> = {
  "html-orbit-rings": {
    graphicId: "orbit-rings",
    blurRadius: 0,
    glowRadius: 26,
    glowIntensity: 0.28,
    glowThreshold: 0.35,
    chromaticAmount: 0,
    vignetteAmount: 0.58,
  },
  "html-scoreboard-grid": {
    graphicId: "scoreboard-grid",
    blurRadius: 1,
    glowRadius: 18,
    glowIntensity: 0.2,
    glowThreshold: 0.48,
    chromaticAmount: 0,
    vignetteAmount: 0.55,
  },
  "html-neon-beams": {
    graphicId: "neon-beams",
    blurRadius: 2,
    glowRadius: 32,
    glowIntensity: 0.34,
    glowThreshold: 0.32,
    chromaticAmount: 2.4,
    vignetteAmount: 0.64,
  },
};

export const isHtmlInCanvasPresetId = (
  value: string,
): value is HtmlInCanvasPresetId =>
  HTML_IN_CANVAS_PRESET_IDS.includes(value as HtmlInCanvasPresetId);
