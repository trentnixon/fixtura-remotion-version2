import React from "react";
import { NightSessionResultsMatchContent } from "../../../utils/nightSession/results/NightSessionResultsMatchContent";
import { MatchCardProps } from "./_types/MatchCardProps";

const MatchCardNightSession: React.FC<MatchCardProps> = ({
  match,
  className,
  delay,
  exitFrame,
}) => {
  return (
    <NightSessionResultsMatchContent
      match={match}
      className={className}
      rowDelay={delay}
      exitFrame={exitFrame}
    />
  );
};

export default MatchCardNightSession;
