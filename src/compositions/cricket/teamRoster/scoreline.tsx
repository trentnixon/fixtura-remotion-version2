import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { Series } from "remotion";
import { RosterDataItem } from "./_types/types";
import NoRosterData from "./modules/NoData/no-data";
import RosterDisplayScoreline from "./controller/Display/display-Scoreline";
import {
  hasValidRosterData,
  castToRosterDataArray,
  calculateRosterDuration,
} from "./_utils/dataHelpers";

export const CricketRosterScoreline: React.FC = () => {
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
        >
          <RosterDisplayScoreline roster={rosterItem} />
        </Series.Sequence>
      ))}
    </Series>
  );
};

export const scoreline: React.FC = () => {
  return <CricketRosterScoreline />;
};

export default scoreline;
