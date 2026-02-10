import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import TeamOfTheWeekDisplaySixersThunder from "./controller/TeamOfTheWeekDisplay/display-SixersThunder";
import {
  hasValidTeamOfTheWeekData,
  castToTeamOfTheWeekPlayers,
  extractSponsors,
} from "./_utils/dataHelpers";
import { NoDataPlaceholder } from "./_utils/components";

export const TeamOfTheWeekSixersThunder: React.FC = () => {
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
    <TeamOfTheWeekDisplaySixersThunder
      players={players}
      sponsors={sponsors.primary}
    />
  );
};

// Export as SixersThunder for compatibility
export const SixersThunder: React.FC = () => {
  return <TeamOfTheWeekSixersThunder />;
};

export default SixersThunder;

