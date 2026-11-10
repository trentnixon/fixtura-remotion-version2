import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { BroadcastProResultMatchContent } from "../../utils/broadcastPro/results/BroadcastProResultMatchContent";
import { MatchResult } from "../../results/_types/types";
import {
  calculateAnimationOutFrame,
  calculateDelay,
} from "../../results/controller/MatchRow/_utils/calculations";

export const LiteMatchCardBroadcastPro: React.FC<{
  match: MatchResult;
  index: number;
}> = ({ match, index }) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(
    data.timings?.FPS_SCORECARD,
  );

  return (
    <AnimatedContainer
      type="full"
      className="w-full rounded-none"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={animationOutFrame}
    >
      <BroadcastProResultMatchContent
        match={match}
        delay={delay}
        maxStatItems={0}
        showGround={false}
        showMetaStrip={false}
        className="h-auto"
      />
    </AnimatedContainer>
  );
};
