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
import LadderDisplayScoreline from "./controller/Display/display-Scoreline";
import {
  hasValidLadderData,
  castToLadderDataArray,
  calculateLadderDuration,
} from "./_utils/helpers";

export const CricketLadderWithTransitionsScoreline: React.FC = () => {
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
        content: <LadderDisplayScoreline ladder={ladder} />,
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

export const scoreline: React.FC = () => {
  return <CricketLadderWithTransitionsScoreline />;
};

export default scoreline;
