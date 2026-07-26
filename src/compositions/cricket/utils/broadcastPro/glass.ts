import tinycolor from "tinycolor2";
import {
  resolveBroadcastProTransparentLayers,
  type BroadcastProGlassOpacityPreset,
  type BroadcastProTransparentLayers,
} from "../../../../templates/types/TemplateThemeConfig";

export const cellBlur = {
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as const;

export type BroadcastProGlassSurfaceRole =
  | "panel"
  | "muted"
  | "strong"
  | "dataCell"
  | "dataCellStrong"
  | "logoWell";

export interface BroadcastProGlassStyle {
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
  layers: BroadcastProTransparentLayers,
): BroadcastProGlassStyle => ({
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

export const getBroadcastProGlassSurface = (
  glass: BroadcastProGlassStyle,
  role: BroadcastProGlassSurfaceRole,
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

export const resolveBroadcastProGlass = (opts: {
  surfaceBase: string;
  broadcastProGlassOpacity?: BroadcastProGlassOpacityPreset;
  broadcastProTransparentLayers?: BroadcastProTransparentLayers;
}): BroadcastProGlassStyle =>
  glassFromSurface(
    opts.surfaceBase,
    resolveBroadcastProTransparentLayers({
      broadcastProGlassOpacity: opts.broadcastProGlassOpacity,
      broadcastProTransparentLayers: opts.broadcastProTransparentLayers,
    }),
  );
