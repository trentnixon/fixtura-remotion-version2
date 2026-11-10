import React from "react";
import { BroadcastProRoundedResultMetaStrip } from "../../utils/broadcastProRounded/results/BroadcastProRoundedResultMetaStrip";

export const LiteGradeHeaderBroadcastProRounded: React.FC<{
  gradeName: string;
  delay?: number;
}> = ({ gradeName, delay = 0 }) => {
  return (
    <div className="mb-3 w-full shrink-0 px-6 md:px-8">
      <BroadcastProRoundedResultMetaStrip
        gradeLabel={gradeName.toUpperCase()}
        ground=""
        delay={delay + 1}
        showGround={false}
        connection="standalone"
      />
    </div>
  );
};
