export type BroadcastProFixtureDensity = "featured" | "standard" | "compact";

export const resolveBroadcastProFixtureDensity = (
  fixtureCount: number,
): BroadcastProFixtureDensity => {
  if (fixtureCount <= 1) return "featured";
  if (fixtureCount === 2) return "standard";
  return "compact";
};
