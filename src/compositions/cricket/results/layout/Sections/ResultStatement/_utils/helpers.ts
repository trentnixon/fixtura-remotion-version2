import { ResultSummary } from "../../../../_types/types";

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
