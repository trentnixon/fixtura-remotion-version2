// src/compositions/cricket/top5/basic.tsx
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import PlayersDisplay from "./controller/PlayersDisplay/display";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import { transformPlayerData, getTitle } from "./utils/dataTransformer";

export const Top5Players: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: playersData, videoMeta } = data;
  const compositionId = videoMeta?.video?.metadata?.compositionId || "";

  // If no data is available, show a placeholder
  if (!playersData || playersData.length === 0) {
    return <NoPlayersData />;
  }

  // Transform data based on composition type
  const transformedData = transformPlayerData(playersData, compositionId);

  // Get appropriate title based on composition
  const title = getTitle(compositionId);

  return <PlayersDisplay players={transformedData} title={title} />;
};

// Export as Basic for compatibility with original template
export const Basic: React.FC = () => {
  return <Top5Players />;
};

export default Basic;
