import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import PlayersDisplayBroadcastPro from "./controller/PlayersDisplay/display-BroadcastPro";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import { transformPlayerData } from "./utils/dataTransformer";
import {
  hasValidPlayersData,
  castToPlayerDataArray,
  extractCompositionId,
  extractPrimarySponsors,
} from "./_utils/dataHelpers";
import { getStandardTitle } from "./_utils/titleHelpers";

export const Top5PlayersBroadcastPro: React.FC = () => {
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

  const title = getStandardTitle(compositionId);

  return (
    <PlayersDisplayBroadcastPro
      players={transformedData}
      title={title}
      sponsors={sponsors}
    />
  );
};

export const BroadcastPro: React.FC = () => {
  return <Top5PlayersBroadcastPro />;
};

export default BroadcastPro;
