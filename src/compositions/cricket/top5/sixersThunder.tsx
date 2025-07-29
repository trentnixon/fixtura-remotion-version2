// src/compositions/cricket/top5/basic.tsx
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import PlayersDisplaySixersThunder from "./controller/PlayersDisplay/display-SixersThunder";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import { transformPlayerData, getTitle } from "./utils/dataTransformer";
import { PlayerData } from "./types";

export const Top5Players: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: playersData, videoMeta } = data;
  const compositionId = videoMeta?.video?.metadata?.compositionId || "";

  // If no data is available, show a placeholder
  if (!playersData || playersData.length === 0) {
    return <NoPlayersData />;
  }

  // Transform data based on composition type
  const transformedData = transformPlayerData(
    playersData as PlayerData[],
    compositionId,
  );

  // Get appropriate title based on composition
  const title = getTitle(compositionId);

  return (
    <PlayersDisplaySixersThunder players={transformedData} title={title} />
  );
};

// Export as Basic for compatibility with original template
export const SixersThunder: React.FC = () => {
  return <Top5Players />;
};

export default SixersThunder;
