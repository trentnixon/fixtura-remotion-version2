import React from "react";
import GameCardNightSession from "../../layout/Card/game-card-NightSession";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListNightSession: React.FC<GamesListProps> = ({ games }) => (
  <div className="fixtures-stack">
    {games.map((game, index) => (
      <GameCardNightSession key={game.gameID} game={game} index={index} />
    ))}
  </div>
);

export default GamesListNightSession;
