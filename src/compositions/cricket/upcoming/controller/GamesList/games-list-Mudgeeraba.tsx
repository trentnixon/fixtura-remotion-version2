import React from "react";
import GameCardMudgeeraba from "../../layout/Card/game-card-Mudgeeraba";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListMudgeeraba: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="flex flex-col w-full space-y-16">
      {games.map((game, index) => (
        <GameCardMudgeeraba key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesListMudgeeraba;
