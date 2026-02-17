import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { Series } from "remotion";
import { RosterDataItem } from "./_types/types";
import NoRosterData from "./modules/NoData/no-data";
import RosterDisplayBrickWork from "./controller/Display/display-BrickWork";
import RosterSponsors from "./layout/RosterSponsors/sponsors";
import {
  hasValidRosterData,
  castToRosterDataArray,
  calculateRosterDuration,
} from "./_utils/dataHelpers";

export const CricketRosterBrickWork: React.FC = () => {
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
          <RosterDisplayBrickWork roster={rosterItem} />
          <RosterSponsors roster={rosterItem} />
        </Series.Sequence>
      ))}
    </Series>
  );
};

export const brickwork: React.FC = () => {
  return <CricketRosterBrickWork />;
};

export default brickwork;
