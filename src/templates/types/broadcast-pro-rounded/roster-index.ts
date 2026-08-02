import type { ColorVariant } from "../../../components/typography/AnimatedText";

export type BroadcastProRoundedRosterIndexVariant = "leader" | "default";

export interface BroadcastProRoundedRosterIndexResult {
  variant: BroadcastProRoundedRosterIndexVariant;
  colorVariant: ColorVariant;
}

/** Default pad width for lineup order indices (01, 02, …). */
export const BROADCAST_PRO_ROSTER_INDEX_PAD_WIDTH = 2;

/** Padded lineup index — stitch match-day sheet feel. */
export const formatBroadcastProRoundedRosterIndex = (
  index: number,
  padWidth: number = BROADCAST_PRO_ROSTER_INDEX_PAD_WIDTH,
): string => String(index + 1).padStart(padWidth, "0");

/** First row accent (captain/lead slot); remaining rows muted. */
export const resolveBroadcastProRoundedRosterIndex = (
  index: number,
): BroadcastProRoundedRosterIndexResult => {
  if (index === 0) {
    return { variant: "leader", colorVariant: "onContainerAccent" };
  }
  return { variant: "default", colorVariant: "onContainerMuted" };
};
