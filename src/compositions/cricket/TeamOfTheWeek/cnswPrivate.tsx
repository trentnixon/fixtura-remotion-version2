import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import TeamOfTheWeekDisplayCNSWPrivate from "./controller/TeamOfTheWeekDisplay/display-CNSW-private";
import {
  hasValidTeamOfTheWeekData,
  castToTeamOfTheWeekPlayers,
  extractSponsors,
} from "./_utils/dataHelpers";
import { NoDataPlaceholder } from "./_utils/components";

export const TeamOfTheWeekCNSWPrivate: React.FC = () => {
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
    <TeamOfTheWeekDisplayCNSWPrivate
      players={players}
      sponsors={sponsors.primary}
    />
  );
};

// Export as CNSWPrivate for compatibility
export const CNSWPrivate: React.FC = () => {
  return <TeamOfTheWeekCNSWPrivate />;
};

export default CNSWPrivate;

