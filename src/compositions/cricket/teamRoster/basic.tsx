import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { RosterDataItem } from "./types"; // Adjusted import path
import RosterDisplay from "./controller/Display/display"; // Adjusted import path
import NoRosterData from "./modules/NoData/no-data"; // Adjusted import path
import { useAnimationContext } from "../../../core/context/AnimationContext";

// Main component with TransitionSeries
export const CricketRosterWithTransitions: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData, timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // Cast CompositionData to the correct type
  const rosterData = CompositionData as unknown as RosterDataItem[];

  // If no data is available, show a placeholder
  if (!rosterData || !Array.isArray(rosterData) || rosterData.length === 0) {
    return <NoRosterData />;
  }

  return (
    <TransitionSeriesWrapper
      sequences={rosterData.map((rosterItem: RosterDataItem) => ({
        content: <RosterDisplay roster={rosterItem} />,
        durationInFrames: timings?.FPS_SCORECARD || 300,
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

// Export as Basic for compatibility
export const basic: React.FC = () => {
  return <CricketRosterWithTransitions />;
};

export default basic;
