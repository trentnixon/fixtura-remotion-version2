import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import TeamOfTheWeekDisplayMudgeeraba from "./controller/TeamOfTheWeekDisplay/display-Mudgeeraba";
import {
  hasValidTeamOfTheWeekData,
  castToTeamOfTheWeekPlayers,
  extractSponsors,
} from "./_utils/dataHelpers";
import { NoDataPlaceholder } from "./_utils/components";

export const TeamOfTheWeekListMudgeeraba: React.FC = () => {
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
    <TeamOfTheWeekDisplayMudgeeraba players={players} sponsors={sponsors.primary} />
  );
};

// Export as mudgeeraba for compatibility
export const mudgeeraba: React.FC = () => {
  return <TeamOfTheWeekListMudgeeraba />;
};

export default mudgeeraba;
