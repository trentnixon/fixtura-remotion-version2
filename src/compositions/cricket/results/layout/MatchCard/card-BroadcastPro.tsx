import React from "react";
import { BroadcastProResultMatchContent } from "../../../utils/broadcastPro";
import { MatchCardProps } from "./_types/MatchCardProps";

const MatchCardBroadcastPro: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  return (
    <BroadcastProResultMatchContent
      match={match}
      delay={delay}
      style={{ maxHeight: rowHeight }}
    />
  );
};

export default MatchCardBroadcastPro;
