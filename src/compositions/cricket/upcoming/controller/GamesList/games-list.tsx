import React from "react";
import GameCard from "../../layout/Card/game-card-basic";
import { GameData } from "../../types";
interface GamesListProps {
  games: GameData[];
  gameRowHeight?: number;
}

export const GamesList: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="flex flex-col w-full">
      {games.map((game, index) => (
        <GameCard key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesList;
