import type { MissingAssetFallback } from "./types";

export const resolveMissingAssetFallback = (): MissingAssetFallback =>
  "gradient";

export const resolveMissingAssetFallbackChain =
  (): readonly MissingAssetFallback[] => ["gradient", "solid"] as const;
