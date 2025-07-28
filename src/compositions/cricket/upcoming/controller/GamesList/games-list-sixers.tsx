import React from "react";

import { GameData } from "../../types";
import GameCardSixers from "../../layout/Card/game-card-sixers";
interface GamesListProps {
  games: GameData[];
  gameRowHeight?: number;
}

export const GamesListSixers: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="flex flex-col w-full">
      {games.map((game, index) => (
        <GameCardSixers key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesListSixers;
