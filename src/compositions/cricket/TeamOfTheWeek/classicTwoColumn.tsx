import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import TeamOfTheWeekDisplayClassicTwoColumn from "./controller/TeamOfTheWeekDisplay/display-ClassicTwoColumn";
import {
  hasValidTeamOfTheWeekData,
  castToTeamOfTheWeekPlayers,
  extractSponsors,
} from "./_utils/dataHelpers";
import { NoDataPlaceholder } from "./_utils/components";

export const TeamOfTheWeekClassicTwoColumn: React.FC = () => {
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
    <TeamOfTheWeekDisplayClassicTwoColumn
      players={players}
      sponsors={sponsors.primary}
    />
  );
};

// Export as ClassicTwoColumn for compatibility
export const ClassicTwoColumn: React.FC = () => {
  return <TeamOfTheWeekClassicTwoColumn />;
};

export default ClassicTwoColumn;

