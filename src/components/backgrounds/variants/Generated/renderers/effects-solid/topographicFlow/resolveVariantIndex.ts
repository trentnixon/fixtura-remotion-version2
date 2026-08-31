import { hashStringToIndex } from "../lightLeak/resolveVariantIndex";
import { TOPOGRAPHIC_FLOW_VARIANT_KEYS } from "./variants";

export const buildTopographicFlowVariantSeed = (input: {
  compositionId: string;
  primary: string;
  secondary: string;
}): string =>
  `${input.compositionId}|${input.primary}|${input.secondary}`;

export const resolveTopographicFlowVariantIndex = (seed: string): number =>
  hashStringToIndex(seed, TOPOGRAPHIC_FLOW_VARIANT_KEYS.length);

export const resolveTopographicFlowVariantKey = (seed: string) =>
  TOPOGRAPHIC_FLOW_VARIANT_KEYS[resolveTopographicFlowVariantIndex(seed)];
