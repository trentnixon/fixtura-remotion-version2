export type BroadcastProRoundedFixtureDensity =
  | "featured"
  | "standard"
  | "compact";

export const resolveBroadcastProRoundedFixtureDensity = (
  fixtureCount: number,
): BroadcastProRoundedFixtureDensity => {
  if (fixtureCount <= 1) return "featured";
  if (fixtureCount === 2) return "standard";
  return "compact";
};
