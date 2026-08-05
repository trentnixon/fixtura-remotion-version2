import React from "react";
import { BroadcastProRoundedResultMatchContent } from "../../../utils/broadcastProRounded";
import { MatchCardProps } from "./_types/MatchCardProps";

const MatchCardBroadcastProRounded: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
  exitFrame,
}) => {
  return (
    <BroadcastProRoundedResultMatchContent
      match={match}
      delay={delay}
      exitFrame={exitFrame}
      style={{ maxHeight: rowHeight }}
    />
  );
};

export default MatchCardBroadcastProRounded;
