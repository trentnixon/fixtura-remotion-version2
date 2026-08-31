import { LIGHT_LEAK_VARIANT_KEYS } from "./variants";

export const buildLightLeakVariantSeed = (input: {
  compositionId: string;
  primary: string;
  secondary: string;
}): string =>
  `${input.compositionId}|${input.primary}|${input.secondary}`;

export const hashStringToIndex = (input: string, count: number): number => {
  if (count <= 0) {
    throw new Error("Variant count must be greater than zero");
  }

  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) | 0;
  }

  return Math.abs(hash) % count;
};

export const resolveLightLeakVariantIndex = (seed: string): number =>
  hashStringToIndex(seed, LIGHT_LEAK_VARIANT_KEYS.length);

export const resolveLightLeakVariantKey = (seed: string) =>
  LIGHT_LEAK_VARIANT_KEYS[resolveLightLeakVariantIndex(seed)];
