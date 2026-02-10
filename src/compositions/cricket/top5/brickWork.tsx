// src/compositions/cricket/top5/brickWork.tsx
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import PlayersDisplayBrickWork from "./controller/PlayersDisplay/display-BrickWork";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import { transformPlayerData } from "./utils/dataTransformer";
import {
  hasValidPlayersData,
  castToPlayerDataArray,
  extractCompositionId,
  extractPrimarySponsors,
} from "./_utils/dataHelpers";
import { getStandardTitle } from "./_utils/titleHelpers";

export const Top5PlayersBrickWork: React.FC = () => {
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
  const title = getStandardTitle(compositionId);

  return (
    <PlayersDisplayBrickWork
      players={transformedData}
      title={title}
      sponsors={sponsors}
    />
  );
};

// Export as BrickWork for compatibility with original template
export const BrickWork: React.FC = () => {
  return <Top5PlayersBrickWork />;
};

export default BrickWork;
