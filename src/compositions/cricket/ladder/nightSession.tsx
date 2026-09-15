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
import LadderDisplayNightSession from "./controller/Display/display-NightSession";
import {
  hasValidLadderData,
  castToLadderDataArray,
  calculateLadderDuration,
} from "./_utils/helpers";

export const CricketLadderWithTransitionsNightSession: React.FC = () => {
  const { data: dataset } = useVideoDataContext();
  const compositionData = dataset?.data;
  const timings = dataset?.timings;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  if (!hasValidLadderData(compositionData)) {
    return <NoLadderData />;
  }

  const ladderDataArray = castToLadderDataArray(compositionData);

  return (
    <TransitionSeriesWrapper
      sequences={ladderDataArray.map((ladder: LadderData) => ({
        content: <LadderDisplayNightSession ladder={ladder} />,
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

export const nightSession: React.FC = () => {
  return <CricketLadderWithTransitionsNightSession />;
};

export default nightSession;
