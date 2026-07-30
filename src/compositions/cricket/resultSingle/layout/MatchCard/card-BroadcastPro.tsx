import React from "react";
import { BroadcastProResultMatchContent } from "../../../utils/broadcastPro";
import { MatchCardProps } from "./_types/MatchCardProps";

const MatchCardBroadcastPro: React.FC<MatchCardProps> = ({
  match,
  contentHeight,
}) => {
  return (
    <BroadcastProResultMatchContent
      match={match}
      delay={0}
      maxStatItems={5}
      statementPosition="top"
      className="!h-auto shrink-0"
      style={contentHeight != null ? { maxHeight: contentHeight } : undefined}
      showGround={false}
      playerStatsTier="single"
    />
  );
};

export default MatchCardBroadcastPro;
