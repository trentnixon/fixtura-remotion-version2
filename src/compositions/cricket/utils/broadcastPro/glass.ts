import {
  resolveBroadcastProTransparentLayers,
  type BroadcastProGlassOpacityPreset,
  type BroadcastProTransparentLayers,
} from "../../../../templates/types/TemplateThemeConfig";
import {
  cellBlur,
  getBroadcastProCoreGlassSurface,
  glassFromSurface,
  resolveBroadcastProCoreGlass,
  type BroadcastProCoreGlassStyle,
  type BroadcastProCoreGlassSurfaceRole,
  type BroadcastProCoreSurfaceConnection,
} from "../broadcastProCore";

export { cellBlur, glassFromSurface };

export type BroadcastProGlassSurfaceRole = BroadcastProCoreGlassSurfaceRole;
export type BroadcastProSurfaceConnection = BroadcastProCoreSurfaceConnection;
export type BroadcastProGlassStyle = BroadcastProCoreGlassStyle;

export const getBroadcastProGlassSurface = getBroadcastProCoreGlassSurface;

export const resolveBroadcastProGlass = (opts: {
  surfaceBase: string;
  broadcastProGlassOpacity?: BroadcastProGlassOpacityPreset;
  broadcastProTransparentLayers?: BroadcastProTransparentLayers;
}): BroadcastProGlassStyle =>
  resolveBroadcastProCoreGlass({
    surfaceBase: opts.surfaceBase,
    layers: resolveBroadcastProTransparentLayers({
      broadcastProGlassOpacity: opts.broadcastProGlassOpacity,
      broadcastProTransparentLayers: opts.broadcastProTransparentLayers,
    }),
  });
