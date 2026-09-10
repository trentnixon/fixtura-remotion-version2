import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import TeamOfTheWeekDisplayScoreline from "./controller/TeamOfTheWeekDisplay/display-Scoreline";
import {
  hasValidTeamOfTheWeekData,
  castToTeamOfTheWeekPlayers,
  extractSponsors,
} from "./_utils/dataHelpers";
import { NoDataPlaceholder } from "./_utils/components";

export const TeamOfTheWeekScoreline: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: teamOfTheWeekData, videoMeta } = data;
  const sponsors = extractSponsors(videoMeta);

  if (!hasValidTeamOfTheWeekData(teamOfTheWeekData)) {
    return <NoDataPlaceholder />;
  }

  const players = castToTeamOfTheWeekPlayers(teamOfTheWeekData);

  return (
    <TeamOfTheWeekDisplayScoreline
      players={players}
      sponsors={sponsors.primary}
    />
  );
};

export const scoreline: React.FC = () => {
  return <TeamOfTheWeekScoreline />;
};

export default scoreline;
