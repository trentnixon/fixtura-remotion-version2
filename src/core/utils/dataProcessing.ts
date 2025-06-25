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
 * Generic deep merge for any object type
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
    if (typeof target !== "object" || target === null) {
      return { ...source };
    }
    const result = { ...target };
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (
          typeof source[key] === "object" &&
          source[key] !== null &&
          typeof result[key] === "object" &&
          result[key] !== null
        ) {
          result[key] = mergeDeep(result[key], source[key]);
        } else {
          result[key] = source[key];
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
