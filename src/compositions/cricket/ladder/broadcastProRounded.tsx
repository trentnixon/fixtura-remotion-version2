import React from "react";

import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { LadderData } from "./types";
import NoLadderData from "./modules/NoLadderData/no-data";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import LadderDisplayBroadcastProRounded from "./controller/Display/display-BroadcastProRounded";
import {
  hasValidLadderData,
  castToLadderDataArray,
  calculateLadderDuration,
} from "./_utils/helpers";

export const CricketLadderWithTransitionsBroadcastProRounded: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData } = data;
  const { timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  if (!hasValidLadderData(CompositionData)) {
    return <NoLadderData />;
  }

  const ladderDataArray = castToLadderDataArray(CompositionData);

  return (
    <TransitionSeriesWrapper
      sequences={ladderDataArray.map((ladder: LadderData) => ({
        content: <LadderDisplayBroadcastProRounded ladder={ladder} />,
        durationInFrames: calculateLadderDuration(timings),
      }))}
      transitionType={transitionConfig.type as TransitionType}
      direction={transitionConfig.direction as TransitionDirection}
      timing={{
        type: "linear",
        durationInFrames: transitionConfig.durationInFrames,
      }}
    />
  );
};

export const BroadcastProRounded: React.FC = () => {
  return <CricketLadderWithTransitionsBroadcastProRounded />;
};

export default BroadcastProRounded;
