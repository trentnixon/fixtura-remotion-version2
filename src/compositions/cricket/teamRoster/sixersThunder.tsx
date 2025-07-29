import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { Series } from "remotion";
import { RosterDataItem } from "./types"; // Adjusted import path
import NoRosterData from "./modules/NoData/no-data"; // Adjusted import path
import RosterDisplaySixersThunder from "./controller/Display/display-sixers-thunder";
/* import RosterSponsors from "./layout/RosterSponsors/sponsors";
 */
// Main component with TransitionSeries
export const CricketRosterWithTransitions: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData, timings } = data;

  // Cast CompositionData to the correct type
  const rosterData = CompositionData as unknown as RosterDataItem[];

  // If no data is available, show a placeholder
  if (!rosterData || !Array.isArray(rosterData) || rosterData.length === 0) {
    return <NoRosterData />;
  }

  return (
    <Series>
      {rosterData.map((rosterItem: RosterDataItem, i) => (
        <Series.Sequence
          key={i}
          durationInFrames={timings?.FPS_SCORECARD || 60}
          className="flex flex-col justify-center"
        >
          <RosterDisplaySixersThunder roster={rosterItem} />
          {/*   <RosterSponsors roster={rosterItem} /> */}
        </Series.Sequence>
      ))}
    </Series>
  );
};

// Export as Basic for compatibility
export const SixersThunder: React.FC = () => {
  return <CricketRosterWithTransitions />;
};

export default SixersThunder;
