import React from "react";
import { ScorelineResultMatchContent } from "../../../utils/scoreline/results/ScorelineResultMatchContent";
import type { MatchResult as ResultsMatchResult } from "../../../results/_types/types";
import { MatchCardProps } from "./_types/MatchCardProps";

const MatchCardScoreline: React.FC<MatchCardProps> = ({ match, contentHeight }) => {
  return (
    <ScorelineResultMatchContent
      match={match as ResultsMatchResult}
      style={{ maxHeight: contentHeight }}
    />
  );
};

export default MatchCardScoreline;
