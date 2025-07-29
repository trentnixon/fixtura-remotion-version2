import React from "react";

import { GameData } from "../../types";
import GameCardSixersThunder from "../../layout/Card/game-card-sixersThunder";
interface GamesListProps {
  games: GameData[];
  gameRowHeight?: number;
}

export const GamesListSixersThunder: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="flex flex-col w-full">
      {games.map((game, index) => (
        <GameCardSixersThunder key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesListSixersThunder;
