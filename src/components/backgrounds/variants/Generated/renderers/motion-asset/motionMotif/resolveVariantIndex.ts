import { hashStringToIndex } from "../../effects-solid/lightLeak/resolveVariantIndex";
import { MOTION_MOTIF_VARIANT_KEYS } from "./variants";

export const buildMotionMotifVariantSeed = (input: {
  compositionId: string;
  primary: string;
  secondary: string;
}): string => `${input.compositionId}|${input.primary}|${input.secondary}`;

export const resolveMotionMotifVariantIndex = (seed: string): number =>
  hashStringToIndex(seed, MOTION_MOTIF_VARIANT_KEYS.length);

export const resolveMotionMotifVariantKey = (seed: string) =>
  MOTION_MOTIF_VARIANT_KEYS[resolveMotionMotifVariantIndex(seed)];
