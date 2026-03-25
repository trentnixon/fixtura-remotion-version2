import React from "react";
import GameCardBroadcastPro from "../../layout/Card/game-card-broadcastPro";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListBroadcastPro: React.FC<GamesListProps> = ({
  games,
  gameRowHeight,
}) => {
  return (
    <div className="flex w-full flex-shrink-0 flex-col gap-4">
      {games.map((game, index) => (
        <div
          key={game.gameID}
          className="flex w-full flex-shrink-0 flex-col overflow-hidden"
        >
          <GameCardBroadcastPro
            game={game}
            index={index}
            gameRowHeight={gameRowHeight}
          />
        </div>
      ))}
    </div>
  );
};

export default GamesListBroadcastPro;
