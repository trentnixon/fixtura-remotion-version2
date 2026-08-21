// src/utils/dataProcessing.ts
// Removed unused import: import { FixturaDataset } from "../types/data/index";

export interface Logo {
  url: string;
  width: number;
  height: number;
}

export interface TeamAllocation {
  level: string;
  id: number;
  allocationName: string;
  sponsorId: number;
  name: string;
  logo: Logo;
}
/**
 * Generic deep merge for any object type.
 * Arrays are replaced (not merged) so list fields like sponsors.primary stay arrays.
 */
export const mergeData = <T extends object>(
  baseData: T,
  overrideData: Partial<T>,
): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mergeDeep = (target: any, source: any): any => {
    if (typeof source !== "object" || source === null) {
      return source;
    }
    if (Array.isArray(source)) {
      return [...source];
    }
    if (typeof target !== "object" || target === null || Array.isArray(target)) {
      return { ...source };
    }
    const result = { ...target };
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        const targetValue = result[key];
        if (Array.isArray(sourceValue)) {
          result[key] = [...sourceValue];
        } else if (
          sourceValue !== null &&
          typeof sourceValue === "object" &&
          targetValue !== null &&
          typeof targetValue === "object" &&
          !Array.isArray(targetValue)
        ) {
          result[key] = mergeDeep(targetValue, sourceValue);
        } else {
          result[key] = sourceValue;
        }
      }
    }
    return result;
  };
  return mergeDeep(baseData, overrideData);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateDuration = (data: any) => {
  return (
    data.timings.FPS_INTRO +
    data.timings.FPS_MAIN +
    (data.videoMeta.video.includeSponsors ? 60 : 0)
  );
};
