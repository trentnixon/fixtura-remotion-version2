import React from "react";

import { GameData } from "../../types";

import GameCardClassicTwoColumn from "../../layout/Card/game-card-Classic-Two-Column";
interface GamesListProps {
  games: GameData[];
  gameRowHeight?: number;
}

export const GamesListClassicTwoColumn: React.FC<GamesListProps> = ({
  games,
}) => {
  return (
    <div className="flex flex-col w-full">
      {games.map((game, index) => (
        <GameCardClassicTwoColumn key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesListClassicTwoColumn;
