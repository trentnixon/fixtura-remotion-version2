import {
  OVERLAY_INNER_TIER_OFFSETS,
  calculateOverlayInnerDelay,
  type OverlayInnerTier,
} from "../overlayFamily/innerAnimationTier";

export const SCORELINE_INNER_TIER_OFFSETS = OVERLAY_INNER_TIER_OFFSETS;
export type ScorelineInnerTier = OverlayInnerTier;
export const calculateScorelineInnerDelay = calculateOverlayInnerDelay;
