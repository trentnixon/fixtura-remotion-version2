// src/compositions/cricket/top5/brickWork.tsx
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import PlayersDisplayBrickWork from "./controller/PlayersDisplay/display-BrickWork";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import { transformPlayerData, getTitle } from "./utils/dataTransformer";
import { PlayerData } from "./types";

export const Top5PlayersBrickWork: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: playersData, videoMeta } = data;
  const compositionId = videoMeta?.video?.metadata?.compositionId || "";
  const sponsors = videoMeta?.club.sponsors || [];
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
    <PlayersDisplayBrickWork
      players={transformedData}
      title={title}
      sponsors={sponsors.primary}
    />
  );
};

// Export as BrickWork for compatibility with original template
export const BrickWork: React.FC = () => {
  return <Top5PlayersBrickWork />;
};

export default BrickWork;
