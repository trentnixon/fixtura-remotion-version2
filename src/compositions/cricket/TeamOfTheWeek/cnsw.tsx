import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import TeamOfTheWeekDisplayCNSW from "./controller/TeamOfTheWeekDisplay/display-CNSW";
import {
  hasValidTeamOfTheWeekData,
  castToTeamOfTheWeekPlayers,
  extractSponsors,
} from "./_utils/dataHelpers";
import { NoDataPlaceholder } from "./_utils/components";

export const TeamOfTheWeekCNSW: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: teamOfTheWeekData, videoMeta } = data;
  const sponsors = extractSponsors(videoMeta);

  // If no data is available, show a placeholder
  if (!hasValidTeamOfTheWeekData(teamOfTheWeekData)) {
    return <NoDataPlaceholder />;
  }

  // Cast the data to the correct type
  const players = castToTeamOfTheWeekPlayers(teamOfTheWeekData);

  return (
    <TeamOfTheWeekDisplayCNSW players={players} sponsors={sponsors.primary} />
  );
};

// Export as CNSW for compatibility
export const CNSW: React.FC = () => {
  return <TeamOfTheWeekCNSW />;
};

export default CNSW;
