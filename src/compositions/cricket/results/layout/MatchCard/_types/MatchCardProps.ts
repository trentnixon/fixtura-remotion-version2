import { MatchResult } from "../../../_types/types";

export interface MatchCardProps {
  match: MatchResult;
  index: number;
  rowHeight: number;
  delay: number;
  /** Frame to begin exit animations (scorecard end). */
  exitFrame?: number;
}
