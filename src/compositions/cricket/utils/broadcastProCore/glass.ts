import tinycolor from "tinycolor2";

export const cellBlur = {
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as const;

export type BroadcastProCoreGlassSurfaceRole =
  | "panel"
  | "muted"
  | "strong"
  | "dataCell"
  | "dataCellStrong"
  | "logoWell";

export type BroadcastProCoreSurfaceConnection = "standalone" | "attached";

export interface BroadcastProCoreTransparentLayers {
  glass: {
    panelAlpha: number;
    borderAlpha: number;
    mutedAlpha: number;
    strongAlpha: number;
    dataCellAlpha: number;
    dataCellStrongAlpha: number;
  };
  logoWell: { alpha: number };
  fixtureHeader: { gradientStartAlpha: number; gradientEndAlpha: number };
}

export interface BroadcastProCoreGlassStyle {
  panel: string;
  border: string;
  logoWell: string;
  headerGradient: string;
  muted: string;
  strong: string;
  dataCell: string;
  dataCellStrong: string;
}

/** Base color is `mode.container.background`; alphas from theme preset. */
export const glassFromSurface = (
  surface: string,
  layers: BroadcastProCoreTransparentLayers,
): BroadcastProCoreGlassStyle => ({
  panel: tinycolor(surface).setAlpha(layers.glass.panelAlpha).toRgbString(),
  border: `1px solid ${tinycolor(surface).setAlpha(layers.glass.borderAlpha).toRgbString()}`,
  logoWell: tinycolor(surface).setAlpha(layers.logoWell.alpha).toRgbString(),
  headerGradient: `linear-gradient(90deg, ${tinycolor(surface).setAlpha(layers.fixtureHeader.gradientStartAlpha).toRgbString()} 0%, ${tinycolor(surface).setAlpha(layers.fixtureHeader.gradientEndAlpha).toRgbString()} 100%)`,
  muted: tinycolor(surface).setAlpha(layers.glass.mutedAlpha).toRgbString(),
  strong: tinycolor(surface).setAlpha(layers.glass.strongAlpha).toRgbString(),
  dataCell: tinycolor(surface)
    .setAlpha(layers.glass.dataCellAlpha)
    .toRgbString(),
  dataCellStrong: tinycolor(surface)
    .setAlpha(layers.glass.dataCellStrongAlpha)
    .toRgbString(),
});

export const getBroadcastProCoreGlassSurface = (
  glass: BroadcastProCoreGlassStyle,
  role: BroadcastProCoreGlassSurfaceRole,
): string => {
  switch (role) {
    case "panel":
      return glass.panel;
    case "muted":
      return glass.muted;
    case "strong":
      return glass.strong;
    case "dataCell":
      return glass.dataCell;
    case "dataCellStrong":
      return glass.dataCellStrong;
    case "logoWell":
      return glass.logoWell;
  }
};

export const resolveBroadcastProCoreGlass = (opts: {
  surfaceBase: string;
  layers: BroadcastProCoreTransparentLayers;
}): BroadcastProCoreGlassStyle =>
  glassFromSurface(opts.surfaceBase, opts.layers);
