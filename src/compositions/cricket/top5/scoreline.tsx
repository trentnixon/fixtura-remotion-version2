import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import PlayersDisplayScoreline from "./controller/PlayersDisplay/display-Scoreline";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import { transformPlayerData } from "./utils/dataTransformer";
import {
  hasValidPlayersData,
  castToPlayerDataArray,
  extractCompositionId,
  extractPrimarySponsors,
} from "./_utils/dataHelpers";

export const Top5PlayersScoreline: React.FC = () => {
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
    <PlayersDisplayScoreline
      players={transformedData}
      title=""
      sponsors={sponsors}
    />
  );
};

export const scoreline: React.FC = () => {
  return <Top5PlayersScoreline />;
};

export default scoreline;
