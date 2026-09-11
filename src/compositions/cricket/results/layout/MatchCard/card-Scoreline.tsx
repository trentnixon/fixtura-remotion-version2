import React from "react";
import { ScorelineResultMatchContent } from "../../../utils/scoreline/results/ScorelineResultMatchContent";
import { MatchCardProps } from "./_types/MatchCardProps";

const MatchCardScoreline: React.FC<MatchCardProps> = ({
  match,
  className,
  delay,
  exitFrame,
}) => {
  return (
    <ScorelineResultMatchContent
      match={match}
      className={className}
      rowDelay={delay}
      exitFrame={exitFrame}
    />
  );
};

export default MatchCardScoreline;
