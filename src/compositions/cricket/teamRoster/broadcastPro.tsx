import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { Series } from "remotion";
import { RosterDataItem } from "./_types/types";
import NoRosterData from "./modules/NoData/no-data";
import RosterDisplayBroadcastPro from "./controller/Display/display-BroadcastPro";
import RosterSponsors from "./layout/RosterSponsors/sponsors";
import {
  hasValidRosterData,
  castToRosterDataArray,
  calculateRosterDuration,
} from "./_utils/dataHelpers";

export const CricketRosterBroadcastPro: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData, timings } = data;

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
          className="flex flex-col justify-center"
        >
          <RosterDisplayBroadcastPro roster={rosterItem} />
          <RosterSponsors roster={rosterItem} />
        </Series.Sequence>
      ))}
    </Series>
  );
};

export const broadcastpro: React.FC = () => {
  return <CricketRosterBroadcastPro />;
};

export default broadcastpro;
