import React from "react";
import { ScorelineResultMatchContent } from "../../../utils/scoreline/results/ScorelineResultMatchContent";
import { MatchCardProps } from "./_types/MatchCardProps";

const MatchCardScoreline: React.FC<MatchCardProps> = ({ match }) => {
  return <ScorelineResultMatchContent match={match} />;
};

export default MatchCardScoreline;
