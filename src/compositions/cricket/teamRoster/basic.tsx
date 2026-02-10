import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { Series } from "remotion";
import { RosterDataItem } from "./_types/types";
import RosterDisplay from "./controller/Display/display";
import NoRosterData from "./modules/NoData/no-data";
import RosterSponsors from "./layout/RosterSponsors/sponsors";
import {
  hasValidRosterData,
  castToRosterDataArray,
  calculateRosterDuration,
} from "./_utils/dataHelpers";

// Main component with TransitionSeries
export const CricketRosterWithTransitions: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData, timings } = data;

  // Cast CompositionData to the correct type
  const rosterData = castToRosterDataArray(CompositionData);

  // If no data is available, show a placeholder
  if (!hasValidRosterData(rosterData)) {
    return <NoRosterData />;
  }

  return (
    <Series>
      {rosterData.map((rosterItem: RosterDataItem, i) => (
        <Series.Sequence
          key={i}
          durationInFrames={calculateRosterDuration(timings)}
          className="flex flex-col justify-center"
        >
          <RosterDisplay roster={rosterItem} />
          <RosterSponsors roster={rosterItem} />
        </Series.Sequence>
      ))}
    </Series>
  );
};

// Export as Basic for compatibility
export const basic: React.FC = () => {
  return <CricketRosterWithTransitions />;
};

export default basic;
