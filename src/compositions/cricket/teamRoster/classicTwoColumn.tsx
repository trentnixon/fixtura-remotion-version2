import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { Series } from "remotion";
import { RosterDataItem } from "./_types/types";
import NoRosterData from "./modules/NoData/no-data";
import RosterDisplayClassicTwoColumn from "./controller/Display/display-classic-two-column";
import {
  hasValidRosterData,
  castToRosterDataArray,
  calculateRosterDuration,
} from "./_utils/dataHelpers";
/* import RosterSponsors from "./layout/RosterSponsors/sponsors";
 */
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
          <RosterDisplayClassicTwoColumn roster={rosterItem} />
          {/*   <RosterSponsors roster={rosterItem} /> */}
        </Series.Sequence>
      ))}
    </Series>
  );
};

// Export as Basic for compatibility
export const ClassicTwoColumn: React.FC = () => {
  return <CricketRosterWithTransitions />;
};

export default ClassicTwoColumn;
