export type HtmlInCanvasPalette = {
  readonly main: string;
  readonly accent: string;
  readonly line: string;
};

export type HtmlInCanvasPresetId =
  | "html-orbit-rings"
  | "html-scoreboard-grid"
  | "html-neon-beams";

export type HtmlInCanvasGraphicId =
  | "orbit-rings"
  | "scoreboard-grid"
  | "neon-beams";

export type HtmlInCanvasPresetConfig = {
  readonly graphicId: HtmlInCanvasGraphicId;
  readonly blurRadius: number;
  readonly glowRadius: number;
  readonly glowIntensity: number;
  readonly glowThreshold: number;
  readonly chromaticAmount: number;
  readonly vignetteAmount: number;
};
