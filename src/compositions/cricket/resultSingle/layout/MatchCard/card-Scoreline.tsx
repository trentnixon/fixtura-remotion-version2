import React from "react";
import { ScorelineResultSingleContent } from "../../../utils/scoreline/results/ScorelineResultSingleContent";
import { MatchCardProps } from "./_types/MatchCardProps";

const MatchCardScoreline: React.FC<MatchCardProps> = ({
  match,
  contentHeight,
}) => {
  return (
    <ScorelineResultSingleContent
      match={match}
      style={{ maxHeight: contentHeight }}
    />
  );
};

export default MatchCardScoreline;
