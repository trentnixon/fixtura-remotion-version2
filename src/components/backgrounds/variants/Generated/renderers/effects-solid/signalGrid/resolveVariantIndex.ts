import { hashStringToIndex } from "../lightLeak/resolveVariantIndex";
import { SIGNAL_GRID_VARIANT_KEYS } from "./variants";

export const buildSignalGridVariantSeed = (input: {
  compositionId: string;
  primary: string;
  secondary: string;
}): string =>
  `${input.compositionId}|${input.primary}|${input.secondary}`;

export const resolveSignalGridVariantIndex = (seed: string): number =>
  hashStringToIndex(seed, SIGNAL_GRID_VARIANT_KEYS.length);

export const resolveSignalGridVariantKey = (seed: string) =>
  SIGNAL_GRID_VARIANT_KEYS[resolveSignalGridVariantIndex(seed)];
