/**
 * Broadcast Pro glass surfaces: alphas applied on top of the mode surface color (`#fff` / `#000`).
 * Matches the three visual groups in upcoming (and can be reused by other Broadcast Pro chrome).
 */

/** Broadcast Pro: sm / md / lg glass alpha presets (see resolveBroadcastProTransparentLayers). */
export type BroadcastProGlassOpacityPreset = "sm" | "md" | "lg";

export interface BroadcastProTransparentLayers {
  glass: {
    panelAlpha: number;
    borderAlpha: number;
  };
  logoWell: {
    alpha: number;
  };
  fixtureHeader: {
    gradientStartAlpha: number;
    gradientEndAlpha: number;
  };
}

/**
 * sm: original stitch-style subtle glass. md/lg: higher panel alpha for better copy contrast on the gradient.
 */
export const BROADCAST_PRO_TRANSPARENT_BY_PRESET: Record<
  BroadcastProGlassOpacityPreset,
  BroadcastProTransparentLayers
> = {
  sm: {
    glass: { panelAlpha: 0.08, borderAlpha: 0.1 },
    logoWell: { alpha: 0.1 },
    fixtureHeader: { gradientStartAlpha: 0.15, gradientEndAlpha: 0.05 },
  },
  md: {
    glass: { panelAlpha: 0.18, borderAlpha: 0.22 },
    logoWell: { alpha: 0.16 },
    fixtureHeader: { gradientStartAlpha: 0.24, gradientEndAlpha: 0.1 },
  },
  lg: {
    glass: { panelAlpha: 0.3, borderAlpha: 0.38 },
    logoWell: { alpha: 0.24 },
    fixtureHeader: { gradientStartAlpha: 0.35, gradientEndAlpha: 0.18 },
  },
};

/** Alias for the `sm` preset (stitch-aligned). */
export const DEFAULT_BROADCAST_PRO_TRANSPARENT_LAYERS: BroadcastProTransparentLayers =
  BROADCAST_PRO_TRANSPARENT_BY_PRESET.sm;

export function resolveBroadcastProTransparentLayers(opts: {
  broadcastProGlassOpacity?: BroadcastProGlassOpacityPreset;
  broadcastProTransparentLayers?: BroadcastProTransparentLayers;
}): BroadcastProTransparentLayers {
  if (opts.broadcastProTransparentLayers) {
    return opts.broadcastProTransparentLayers;
  }
  const preset = opts.broadcastProGlassOpacity ?? "md";
  return BROADCAST_PRO_TRANSPARENT_BY_PRESET[preset];
}
