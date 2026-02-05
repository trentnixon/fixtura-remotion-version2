import React from "react";
import GameCardClassicTwoColumn from "../../layout/Card/game-card-Classic-Two-Column";
import { GamesListProps } from "./_types/GamesListProps";

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
