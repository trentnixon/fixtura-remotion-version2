/**
 * Broadcast Pro result verdict typography — narrative tiers (hero / compact / abandoned).
 */

export type BroadcastProVerdictTier = "hero" | "compact" | "abandoned";

export type BroadcastProVerdictRole =
  | "bandHero"
  | "bandCompact"
  | "bandAbandoned"
  | "winner"
  | "context"
  | "line"
  | "status"
  | "fixtureResult";

export const BROADCAST_PRO_VERDICT_ROLE_THEME_KEY: Record<
  BroadcastProVerdictRole,
  string
> = {
  bandHero: "broadcastProVerdictBandHero",
  bandCompact: "broadcastProVerdictBandCompact",
  bandAbandoned: "broadcastProVerdictBandAbandoned",
  winner: "broadcastProVerdictWinner",
  context: "broadcastProVerdictContext",
  line: "broadcastProVerdictLine",
  status: "broadcastProVerdictStatus",
  fixtureResult: "broadcastProVerdictFixtureResult",
};

export const BROADCAST_PRO_VERDICT_TIER_BAND_KEY: Record<
  BroadcastProVerdictTier,
  string
> = {
  hero: BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.bandHero,
  compact: BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.bandCompact,
  abandoned: BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.bandAbandoned,
};
