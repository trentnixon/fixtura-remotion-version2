import type { LuminanceMapConfig } from "./types";
import type { LuminanceSupersampleScale } from "./types";
import { isLuminanceSupersampleScale } from "./supersample/supersampleLuminance";

export { isLuminanceSupersampleScale } from "./supersample/supersampleLuminance";

/**
 * Protected-linework masters default to 2× supersampling.
 * Keep 4× as a diagnostic override only.
 */
export const resolveLuminanceSupersampleScale = (
  map: LuminanceMapConfig,
  explicit?: number | null,
): LuminanceSupersampleScale => {
  if (isLuminanceSupersampleScale(explicit)) {
    return explicit;
  }

  if (map.kind === "theme" && map.preset === "protected-brand") {
    return 2;
  }

  return 1;
};
