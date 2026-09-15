import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import PlayersDisplayNightSession from "./controller/PlayersDisplay/display-NightSession";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import { transformPlayerData } from "./utils/dataTransformer";
import {
  hasValidPlayersData,
  castToPlayerDataArray,
  extractCompositionId,
  extractPrimarySponsors,
} from "./_utils/dataHelpers";

export const Top5PlayersNightSession: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: playersData, videoMeta } = data;
  const compositionId = extractCompositionId(videoMeta);
  const sponsors = extractPrimarySponsors(videoMeta);

  if (!hasValidPlayersData(playersData)) {
    return <NoPlayersData />;
  }

  const transformedData = transformPlayerData(
    castToPlayerDataArray(playersData),
    compositionId,
  );

  return (
    <PlayersDisplayNightSession
      players={transformedData}
      title=""
      sponsors={sponsors}
    />
  );
};

export const nightSession: React.FC = () => {
  return <Top5PlayersNightSession />;
};

export default nightSession;
