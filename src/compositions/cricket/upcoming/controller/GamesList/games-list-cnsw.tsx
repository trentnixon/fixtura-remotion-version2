import React from "react";

import { GameData } from "../../types";
import GameCardCNSW from "../../layout/Card/game-card-cnsw";
interface GamesListProps {
  games: GameData[];
  gameRowHeight?: number;
}

export const GamesListCNSW: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="flex flex-col w-full">
      {games.map((game, index) => (
        <GameCardCNSW key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesListCNSW;
