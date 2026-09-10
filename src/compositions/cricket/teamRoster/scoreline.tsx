import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { Series } from "remotion";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { RosterDataItem } from "./_types/types";
import NoRosterData from "./modules/NoData/no-data";
import RosterDisplayScoreline from "./controller/Display/display-Scoreline";
import RosterSponsors from "./layout/RosterSponsors/sponsors";
import { getMainContentSectionHeight } from "../../../core/utils/layoutHeights";
import {
  hasValidRosterData,
  castToRosterDataArray,
  calculateRosterDuration,
} from "./_utils/dataHelpers";

export const CricketRosterScoreline: React.FC = () => {
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
          className="flex flex-col bg-white"
          style={{ height: `${compositionHeight + heights.footer}px` }}
        >
          <RosterDisplayScoreline roster={rosterItem} />
          <div
            className="relative isolate flex-shrink-0 overflow-hidden px-3 pb-3"
            style={{ height: `${heights.footer}px` }}
          >
            <div
              className="relative isolate flex h-full min-h-[88px] w-full items-center justify-evenly gap-6 overflow-hidden px-6 py-4"
              style={{
                background:
                  "linear-gradient(180deg, rgb(243 240 234 / 96%) 0%, rgb(243 240 234) 100%)",
                boxShadow: "inset 0 1px 0 rgb(255 255 255 / 55%)",
              }}
            >
              <RosterSponsors roster={rosterItem} />
            </div>
          </div>
        </Series.Sequence>
      ))}
    </Series>
  );
};

export const scoreline: React.FC = () => {
  return <CricketRosterScoreline />;
};

export default scoreline;
