import { hashStringToIndex } from "../lightLeak/resolveVariantIndex";
import { REACTIVE_PATH_VARIANT_KEYS } from "./variants";

export const buildReactivePathVariantSeed = (input: {
  compositionId: string;
  primary: string;
  secondary: string;
}): string => `${input.compositionId}|${input.primary}|${input.secondary}`;

export const resolveReactivePathVariantIndex = (seed: string): number =>
  hashStringToIndex(seed, REACTIVE_PATH_VARIANT_KEYS.length);

export const resolveReactivePathVariantKey = (seed: string) =>
  REACTIVE_PATH_VARIANT_KEYS[resolveReactivePathVariantIndex(seed)];
