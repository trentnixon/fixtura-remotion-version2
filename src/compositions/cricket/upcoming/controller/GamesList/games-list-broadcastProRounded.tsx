import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import GameCardBroadcastProRounded from "../../layout/Card/game-card-broadcastProRounded";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListBroadcastProRounded: React.FC<GamesListProps> = ({ games }) => {
  const { layout } = useThemeContext();
  const stackGap = layout.spacing?.stack ?? "gap-1";

  return (
    <div className={`flex w-full max-w-full flex-col ${stackGap}`}>
      {games.map((game, index) => (
        <GameCardBroadcastProRounded key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesListBroadcastProRounded;
