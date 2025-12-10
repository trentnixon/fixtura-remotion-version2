// src/core/utils/compositionMapping.ts
/**
 * Maps dataset IDs to their corresponding composition IDs
 */
export const datasetToCompositionMap = {
  CricketLadder: "CricketLadder",
  CricketResults: "CricketResults",
  CricketRoster: "CricketRoster",
  CricketResultSingle: "CricketResultSingle",
  CricketTop5Batting: "CricketTop5Batting",
  CricketTop5Bowling: "CricketTop5Bowling",
  CricketBattingPerformances: "CricketBattingPerformances",
  CricketBowlingPerformances: "CricketBowlingPerformances",
  CricketUpcoming: "CricketUpcoming",

  AFLLadder: "AFLLadder",
  AFLResults: "AFLResults",
  AFLSingleGameResult: "AFLSingleGameResult",
  AFLTop5: "AFLTop5",
  AFLUpcoming: "AFLUpcoming",

  NetballLadder: "NetballLadder",
  NetballResults: "NetballResults",
  NetballSingleGameResult: "NetballSingleGameResult",
  NetballTop5: "NetballTop5",
  NetballUpcoming: "NetballUpcoming",
};

/**
 * Maps composition type IDs to dataset IDs (reverse of datasetToCompositionMap)
 */
export const compositionToDatasetMap: Record<string, string> = {};

// Initialize the reverse map
Object.entries(datasetToCompositionMap).forEach(
  ([datasetId, compositionId]) => {
    compositionToDatasetMap[compositionId] = datasetId;
  },
);

/**
 * Extracts composition type from a full composition ID (e.g., "Basic-Graphics-CricketLadder" -> "CricketLadder")
 */
export function extractCompositionType(fullId: string): string {
  // If it contains hyphens, it's likely a composite ID
  if (fullId.includes("-")) {
    const parts = fullId.split("-");
    return parts[parts.length - 1]; // Return the last part
  }
  return fullId;
}

/**
 * Converts dataset ID to composition ID
 */
export function getCompositionIdFromDatasetId(datasetId: string): string {
  return (
    datasetToCompositionMap[
      datasetId as keyof typeof datasetToCompositionMap
    ] || datasetId
  );
}

/**
 * Converts composition ID to dataset ID
 */
export function getDatasetIdFromCompositionId(compositionId: string): string {
  // First try to extract the actual composition type if it's a compound ID
  const extractedId = extractCompositionType(compositionId);
  return compositionToDatasetMap[extractedId] || extractedId;
}

/**
 * Normalizes a composition ID to ensure consistent format
 */
export function normalizeCompositionId(compositionId: string): string {
  if (!compositionId) {
    console.warn("Empty composition ID received");
    return "Ladder"; // Default to Ladder as fallback
  }

  // If it's already a simple ID like "Ladder", return it
  if (!compositionId.includes("-")) {
    //console.log(`Using simple composition ID: ${compositionId}`);
    return compositionId;
  }

  // Otherwise extract the last part as the actual composition type
  const extractedId = extractCompositionType(compositionId);
  /*console.log(
    `Extracted composition ID from ${compositionId} -> ${extractedId}`,
  ); */
  return extractedId;
}
