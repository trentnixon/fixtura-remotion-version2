/* eslint-disable @typescript-eslint/no-explicit-any */
// src/compositions/cricket/top5/cnsw.tsx
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import { transformPlayerData } from "./utils/dataTransformer";
import PlayersDisplayCNSW from "./controller/PlayersDisplay/display-CNSW";
import {
  hasValidPlayersData,
  castToPlayerDataArray,
  extractCompositionId,
  extractPrimarySponsors,
} from "./_utils/dataHelpers";
import { getCNSWTitle } from "./_utils/titleHelpers";

export const Top5Players: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: playersData, videoMeta } = data;
  const compositionId = extractCompositionId(videoMeta);
  const sponsors = extractPrimarySponsors(videoMeta);

  // If no data is available, show a placeholder
  if (!hasValidPlayersData(playersData)) {
    return <NoPlayersData />;
  }

  // Transform data based on composition type
  const transformedData = transformPlayerData(
    castToPlayerDataArray(playersData),
    compositionId,
  );

  // Get appropriate title based on composition
  const title = getCNSWTitle(videoMeta);
  return (
    <PlayersDisplayCNSW
      players={transformedData}
      title={title}
      sponsors={sponsors}
    />
  );
};

// Export as Basic for compatibility with original template
export const CNSW: React.FC = () => {
  return <Top5Players />;
};

export default CNSW;
