/**
 * Broadcast Pro result verdict typography — narrative tiers (hero / compact / abandoned).
 */

export type BroadcastProRoundedVerdictTier = "hero" | "compact" | "abandoned";

export type BroadcastProRoundedVerdictRole =
  | "bandHero"
  | "bandCompact"
  | "bandAbandoned"
  | "winner"
  | "context"
  | "line"
  | "status"
  | "fixtureResult";

export const BROADCAST_PRO_VERDICT_ROLE_THEME_KEY: Record<
  BroadcastProRoundedVerdictRole,
  string
> = {
  bandHero: "broadcastProRoundedVerdictBandHero",
  bandCompact: "broadcastProRoundedVerdictBandCompact",
  bandAbandoned: "broadcastProRoundedVerdictBandAbandoned",
  winner: "broadcastProRoundedVerdictWinner",
  context: "broadcastProRoundedVerdictContext",
  line: "broadcastProRoundedVerdictLine",
  status: "broadcastProRoundedVerdictStatus",
  fixtureResult: "broadcastProRoundedVerdictFixtureResult",
};

export const BROADCAST_PRO_VERDICT_TIER_BAND_KEY: Record<
  BroadcastProRoundedVerdictTier,
  string
> = {
  hero: BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.bandHero,
  compact: BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.bandCompact,
  abandoned: BROADCAST_PRO_VERDICT_ROLE_THEME_KEY.bandAbandoned,
};
