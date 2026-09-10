import React from "react";
import { ScorelineResultMatchContent } from "../../../utils/scoreline/results/ScorelineResultMatchContent";
import { MatchCardProps } from "./_types/MatchCardProps";

const MatchCardScoreline: React.FC<MatchCardProps> = ({ match, rowHeight }) => {
  return (
    <ScorelineResultMatchContent
      match={match}
      style={{ maxHeight: rowHeight }}
    />
  );
};

export default MatchCardScoreline;
