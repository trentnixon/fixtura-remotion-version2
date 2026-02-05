import React from "react";
import GameCardBasic from "../../layout/Card/game-card-basic";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListBasic: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="flex flex-col w-full">
      {games.map((game, index) => (
        <GameCardBasic key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesListBasic;
