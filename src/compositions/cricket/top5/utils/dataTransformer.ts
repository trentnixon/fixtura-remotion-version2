import {
  BatterData,
  BowlerData,
  PlayerData,
  TOP5_COMPOSITIONS,
} from "../types";

/**
 * Transform raw player data based on the composition type
 * @param rawData Raw data from API/JSON
 * @param compositionId The ID of the composition (batting or bowling)
 * @returns Properly typed player data
 */
export const transformPlayerData = (
  rawData: PlayerData[],
  compositionId: string,
): PlayerData[] => {
  if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
    return [];
  }

  return rawData.map((player) => {
    if (compositionId === TOP5_COMPOSITIONS.BATTING) {
      // Transform batting data
      return {
        ...player,
        type: "batting",
      } as BatterData;
    } else {
      // Transform bowling data
      return {
        ...player,
        type: "bowling",
      } as BowlerData;
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
    case TOP5_COMPOSITIONS.BATTING:
      return "Top 5 Batters";
    case TOP5_COMPOSITIONS.BOWLING:
      return "Top 5 Bowlers";
    default:
      return "Top 5 Players";
  }
};
