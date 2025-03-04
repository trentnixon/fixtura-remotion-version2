// src/utils/dataProcessing.ts
import { FixturaDataset } from "../types/data/index";
import _ from "lodash";

/**
 * Merges data objects using deep merge
 */
export const mergeData = (
  baseData: FixturaDataset,
  overrideData: Partial<FixturaDataset>,
): FixturaDataset => {
  // Deep merge implementation
  const mergeDeep = (target: any, source: any): any => {
    if (typeof source !== "object" || source === null) {
      return source;
    }

    if (typeof target !== "object" || target === null) {
      return { ...source };
    }

    const result = { ...target };

    for (const key in source) {
      if (source.hasOwnProperty(key)) {
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

export const calculateDuration = (data: any) => {
  return (
    data.TIMINGS.FPS_INTRO +
    data.TIMINGS.FPS_MAIN +
    (data.VIDEOMETA.Video.includeSponsors ? 60 : 0)
  );
};
