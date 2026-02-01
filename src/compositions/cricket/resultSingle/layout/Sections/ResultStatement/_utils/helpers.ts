import { ResultSummary } from "../../../../types";

/**
 * Builds the result statement text from result summary
 * @param resultSummary - The result summary object containing homeTeam, resultWord, and winner
 * @returns Formatted statement text
 */
export const buildResultStatementText = (
  resultSummary: ResultSummary,
): string => {
  return `${resultSummary.homeTeam} ${resultSummary.resultWord} to ${resultSummary.winner}`;
};

/**
 * Swaps result words with custom replacements
 * @param resultWord - The original result word (e.g., "lost", "won")
 * @param lostReplacement - Replacement for "lost" (default: "Lost to")
 * @param wonReplacement - Replacement for "won" (default: "defeated")
 * @returns The swapped word or original if no match
 */
export const swapResultWord = (
  resultWord: string,
  lostReplacement: string = "Lost to",
  wonReplacement: string = "defeated",
): string => {
  const normalizedWord = resultWord.toLowerCase().trim();

  if (normalizedWord === "lost") {
    return lostReplacement;
  }
  if (normalizedWord === "won") {
    return wonReplacement;
  }

  return resultWord;
};
