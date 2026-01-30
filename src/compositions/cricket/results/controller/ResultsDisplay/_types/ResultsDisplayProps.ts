import { MatchResult } from "../../../_types/types";

export interface ResultsDisplayProps {
  results: MatchResult[];
  resultsPerScreen: number;
  screenIndex: number;
}
