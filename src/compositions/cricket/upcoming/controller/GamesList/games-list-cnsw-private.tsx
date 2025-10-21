import React from "react";

import { GameData } from "../../types";
import GameCardCNSWPrivate from "../../layout/Card/game-card-cnsw-private";
interface GamesListProps {
  games: GameData[];
  gameRowHeight?: number;
}

export const GamesListCNSWPrivate: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="flex flex-col w-full">
      {games.map((game, index) => (
        <GameCardCNSWPrivate key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesListCNSWPrivate;
