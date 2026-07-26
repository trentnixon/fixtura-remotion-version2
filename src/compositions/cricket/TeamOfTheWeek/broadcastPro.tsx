import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import TeamOfTheWeekDisplayBroadcastPro from "./controller/TeamOfTheWeekDisplay/display-BroadcastPro";
import {
  hasValidTeamOfTheWeekData,
  castToTeamOfTheWeekPlayers,
  extractSponsors,
} from "./_utils/dataHelpers";
import { NoDataPlaceholder } from "./_utils/components";

export const TeamOfTheWeekBroadcastPro: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: teamOfTheWeekData, videoMeta } = data;
  const sponsors = extractSponsors(videoMeta);

  if (!hasValidTeamOfTheWeekData(teamOfTheWeekData)) {
    return <NoDataPlaceholder />;
  }

  const players = castToTeamOfTheWeekPlayers(teamOfTheWeekData);

  return (
    <TeamOfTheWeekDisplayBroadcastPro
      players={players}
      sponsors={sponsors.primary}
    />
  );
};

export const BroadcastPro: React.FC = () => {
  return <TeamOfTheWeekBroadcastPro />;
};

export const broadcastpro: React.FC = () => {
  return <TeamOfTheWeekBroadcastPro />;
};

export default broadcastpro;
