import React from "react";
import GameCardBrickWork from "../../layout/Card/game-card-brickWork";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListBrickWork: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="flex flex-col w-full">
      {games.map((game, index) => (
        <GameCardBrickWork key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesListBrickWork;
