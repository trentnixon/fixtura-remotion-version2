import { getTitle } from "../utils/dataTransformer";

/**
 * Get title for CNSW variant using grouping category
 * @param videoMeta - Video metadata from context
 * @returns Title string (grouping category or empty string)
 */
export const getCNSWTitle = (videoMeta: {
  video?: { groupingCategory?: string };
} | undefined): string => {
  return videoMeta?.video?.groupingCategory || "";
};

/**
 * Get title for CNSW-private variant using grade name from first player
 * @param playersData - Players data array
 * @returns Title string (grade name or empty string)
 */
export const getCNSWPrivateTitle = (
  playersData: unknown[],
): string => {
  if (!playersData || playersData.length === 0) {
    return "";
  }
  const firstPlayer = playersData[0] as {
    assignSponsors?: { grade?: { name?: string } };
  };
  return firstPlayer?.assignSponsors?.grade?.name || "";
};

/**
 * Get title for standard variants using composition ID
 * @param compositionId - Composition ID string
 * @returns Title string from data transformer
 */
export const getStandardTitle = (compositionId: string): string => {
  return getTitle(compositionId);
};
