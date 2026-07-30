import { MatchResult } from "../../../types";

export interface MatchCardProps {
  match: MatchResult;
  /** Max drawable height for single-result hero layout (Broadcast Pro asset zone). */
  contentHeight?: number;
}
