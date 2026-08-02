import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import TeamOfTheWeekDisplayBroadcastProRounded from "./controller/TeamOfTheWeekDisplay/display-BroadcastProRounded";
import {
  hasValidTeamOfTheWeekData,
  castToTeamOfTheWeekPlayers,
  extractSponsors,
} from "./_utils/dataHelpers";
import { NoDataPlaceholder } from "./_utils/components";

export const TeamOfTheWeekBroadcastProRounded: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: teamOfTheWeekData, videoMeta } = data;
  const sponsors = extractSponsors(videoMeta);

  if (!hasValidTeamOfTheWeekData(teamOfTheWeekData)) {
    return <NoDataPlaceholder />;
  }

  const players = castToTeamOfTheWeekPlayers(teamOfTheWeekData);

  return (
    <TeamOfTheWeekDisplayBroadcastProRounded
      players={players}
      sponsors={sponsors.primary}
    />
  );
};

export const BroadcastProRounded: React.FC = () => {
  return <TeamOfTheWeekBroadcastProRounded />;
};

export const broadcastprorounded: React.FC = () => {
  return <TeamOfTheWeekBroadcastProRounded />;
};

export default broadcastprorounded;
