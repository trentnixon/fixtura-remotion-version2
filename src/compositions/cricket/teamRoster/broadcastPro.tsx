import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { Series } from "remotion";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { RosterDataItem } from "./_types/types";
import NoRosterData from "./modules/NoData/no-data";
import RosterDisplayBroadcastPro from "./controller/Display/display-BroadcastPro";
import RosterSponsors from "./layout/RosterSponsors/sponsors";
import { getMainContentSectionHeight } from "../../../core/utils/layoutHeights";
import {
  hasValidRosterData,
  castToRosterDataArray,
  calculateRosterDuration,
} from "./_utils/dataHelpers";

export const CricketRosterBroadcastPro: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData, timings } = data;
  const { layout } = useThemeContext();
  const { heights } = layout;
  const compositionHeight = getMainContentSectionHeight(heights);

  const rosterData = castToRosterDataArray(CompositionData);

  if (!hasValidRosterData(rosterData)) {
    return <NoRosterData />;
  }

  return (
    <Series>
      {rosterData.map((rosterItem: RosterDataItem, i) => (
        <Series.Sequence
          key={i}
          durationInFrames={calculateRosterDuration(timings)}
          className="flex flex-col"
          style={{ height: `${compositionHeight}px` }}
        >
          <RosterDisplayBroadcastPro roster={rosterItem} />
          <div
            className="flex shrink-0 flex-col justify-center"
            style={{ height: `${heights.footer}px` }}
          >
            <RosterSponsors roster={rosterItem} />
          </div>
        </Series.Sequence>
      ))}
    </Series>
  );
};

export const broadcastpro: React.FC = () => {
  return <CricketRosterBroadcastPro />;
};

export default broadcastpro;
