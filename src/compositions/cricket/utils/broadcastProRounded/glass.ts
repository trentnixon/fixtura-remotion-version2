import {
  resolveBroadcastProRoundedTransparentLayers,
  type BroadcastProRoundedGlassOpacityPreset,
  type BroadcastProRoundedTransparentLayers,
} from "../../../../templates/types/broadcast-pro-rounded/transparent-layers";
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

export type BroadcastProRoundedGlassSurfaceRole =
  BroadcastProCoreGlassSurfaceRole;
export type BroadcastProRoundedSurfaceConnection =
  BroadcastProCoreSurfaceConnection;
export type BroadcastProRoundedGlassStyle = BroadcastProCoreGlassStyle;

export const getBroadcastProRoundedGlassSurface =
  getBroadcastProCoreGlassSurface;

export const resolveBroadcastProRoundedGlass = (opts: {
  surfaceBase: string;
  broadcastProRoundedGlassOpacity?: BroadcastProRoundedGlassOpacityPreset;
  broadcastProRoundedTransparentLayers?: BroadcastProRoundedTransparentLayers;
}): BroadcastProRoundedGlassStyle =>
  resolveBroadcastProCoreGlass({
    surfaceBase: opts.surfaceBase,
    layers: resolveBroadcastProRoundedTransparentLayers({
      broadcastProRoundedGlassOpacity: opts.broadcastProRoundedGlassOpacity,
      broadcastProRoundedTransparentLayers:
        opts.broadcastProRoundedTransparentLayers,
    }),
  });
