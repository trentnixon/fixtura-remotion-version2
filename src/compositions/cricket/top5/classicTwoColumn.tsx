// src/compositions/cricket/top5/basic.tsx
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import { transformPlayerData, getTitle } from "./utils/dataTransformer";
import { PlayerData } from "./types";
import PlayersDisplayClassicTwoColumn from "./controller/PlayersDisplay/display-ClassicTwoColumn";

export const Top5Players: React.FC = () => {
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
    <PlayersDisplayClassicTwoColumn
      players={transformedData}
      title={title}
      sponsors={sponsors.primary}
    />
  );
};

// Export as Basic for compatibility with original template
export const ClassicTwoColumn: React.FC = () => {
  return <Top5Players />;
};

export default ClassicTwoColumn;
