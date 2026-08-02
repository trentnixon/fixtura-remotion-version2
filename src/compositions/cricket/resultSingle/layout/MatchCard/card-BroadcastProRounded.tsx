import React from "react";
import { BroadcastProRoundedResultMatchContent } from "../../../utils/broadcastProRounded";
import { MatchCardProps } from "./_types/MatchCardProps";

const MatchCardBroadcastProRounded: React.FC<MatchCardProps> = ({
  match,
  contentHeight,
}) => {
  return (
    <BroadcastProRoundedResultMatchContent
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

export default MatchCardBroadcastProRounded;
