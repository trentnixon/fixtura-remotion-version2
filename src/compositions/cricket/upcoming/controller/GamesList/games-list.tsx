import React from "react";
import GameCard from "../../layout/Card/card";
import { GameData } from "../../types";
interface GamesListProps {
  games: GameData[];
  gameRowHeight?: number;
}

export const GamesList: React.FC<GamesListProps> = ({
  games,
  gameRowHeight = 250,
}) => {
  return (
    <div className="flex flex-col w-full">
      {games.map((game, index) => (
        <GameCard key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesList;
