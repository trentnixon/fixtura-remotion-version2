import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import TeamOfTheWeekDisplayNightSession from "./controller/TeamOfTheWeekDisplay/display-NightSession";
import {
  hasValidTeamOfTheWeekData,
  castToTeamOfTheWeekPlayers,
  extractSponsors,
} from "./_utils/dataHelpers";
import { NoDataPlaceholder } from "./_utils/components";

export const TeamOfTheWeekNightSession: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: teamOfTheWeekData, videoMeta } = data;
  const sponsors = extractSponsors(videoMeta);

  if (!hasValidTeamOfTheWeekData(teamOfTheWeekData)) {
    return <NoDataPlaceholder />;
  }

  const players = castToTeamOfTheWeekPlayers(teamOfTheWeekData);

  return (
    <TeamOfTheWeekDisplayNightSession
      players={players}
      sponsors={sponsors.primary}
    />
  );
};

export const nightSession: React.FC = () => {
  return <TeamOfTheWeekNightSession />;
};

export default nightSession;
