/**
 * Broadcast Pro glass surfaces: alphas applied on top of the mode surface color (`#fff` / `#000`).
 * Semantic roles: panel (cards), muted (supporting), strong (decisive values), dataCell/dataCellStrong (dense tables).
 */

/** Broadcast Pro: sm / md / lg glass alpha presets (see resolveBroadcastProTransparentLayers). */
export type BroadcastProGlassOpacityPreset = "sm" | "md" | "lg";

export interface BroadcastProTransparentLayers {
  glass: {
    /** Primary card/row glass — Results, Top 5, Performances, Upcoming body */
    panelAlpha: number;
    borderAlpha: number;
    /** Supporting surfaces — non-featured rank badges, placeholders, 12th-man de-emphasis */
    mutedAlpha: number;
    /** Decisive values — score badges, featured emphasis */
    strongAlpha: number;
    /** Dense tabular standard cells — ladder rank, team, P/W/L */
    dataCellAlpha: number;
    /** Dense tabular emphasis — ladder points column */
    dataCellStrongAlpha: number;
  };
  logoWell: {
    /** Crest isolation wells — upcoming, roster, player ranking */
    alpha: number;
  };
  fixtureHeader: {
    /** Metadata strip gradient — upcoming fixture header, results meta strip */
    gradientStartAlpha: number;
    gradientEndAlpha: number;
  };
}

/**
 * sm: original stitch-style subtle glass. md/lg: higher panel alpha for better copy contrast.
 * dataCell/dataCellStrong target ladder parity with legacy backgroundTransparent tiers (~0.55 / ~0.85 on md).
 */
export const BROADCAST_PRO_TRANSPARENT_BY_PRESET: Record<
  BroadcastProGlassOpacityPreset,
  BroadcastProTransparentLayers
> = {
  sm: {
    glass: {
      panelAlpha: 0.08,
      borderAlpha: 0.1,
      mutedAlpha: 0.05,
      strongAlpha: 0.12,
      dataCellAlpha: 0.4,
      dataCellStrongAlpha: 0.7,
    },
    logoWell: { alpha: 0.1 },
    fixtureHeader: { gradientStartAlpha: 0.15, gradientEndAlpha: 0.05 },
  },
  md: {
    glass: {
      panelAlpha: 0.18,
      borderAlpha: 0.22,
      mutedAlpha: 0.1,
      strongAlpha: 0.28,
      dataCellAlpha: 0.55,
      dataCellStrongAlpha: 0.85,
    },
    logoWell: { alpha: 0.16 },
    fixtureHeader: { gradientStartAlpha: 0.24, gradientEndAlpha: 0.1 },
  },
  lg: {
    glass: {
      panelAlpha: 0.3,
      borderAlpha: 0.38,
      mutedAlpha: 0.16,
      strongAlpha: 0.42,
      dataCellAlpha: 0.65,
      dataCellStrongAlpha: 0.9,
    },
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
