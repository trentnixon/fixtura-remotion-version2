import {
  BattingPerformanceData,
  BowlingPerformanceData,
  PerformanceData,
  PERFORMANCES_COMPOSITIONS,
} from "../types";

/**
 * Transform raw performance data based on the composition type
 * @param rawData Raw data from API/JSON
 * @param compositionId The ID of the composition (batting or bowling performances)
 * @returns Properly typed performance data
 */
export const transformPerformanceData = (
  rawData: unknown[],
  compositionId: string,
): PerformanceData[] => {
  if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
    return [];
  }

  return rawData.map((item) => {
    if (compositionId === PERFORMANCES_COMPOSITIONS.BATTING) {
      // Transform batting performance data
      const battingItem = item as Partial<BattingPerformanceData>;
      return {
        ...battingItem,
        type: "batting",
      } as BattingPerformanceData;
    } else {
      // Transform bowling performance data
      const bowlingItem = item as Partial<BowlingPerformanceData>;
      return {
        ...bowlingItem,
        type: "bowling",
      } as BowlingPerformanceData;
    }
  });
};

/**
 * Get the title based on composition type
 * @param compositionId The ID of the composition
 * @returns The appropriate title for the composition
 */
export const getTitle = (compositionId: string): string => {
  switch (compositionId) {
    case PERFORMANCES_COMPOSITIONS.BATTING:
      return "Batting Performances";
    case PERFORMANCES_COMPOSITIONS.BOWLING:
      return "Bowling Performances";
    default:
      return "Performances";
  }
};
