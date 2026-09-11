import React from "react";
import GameCardScoreline from "../../layout/Card/game-card-Scoreline";
import { ScorelineFixtureSeparator } from "../../../utils/scoreline/fixture/ScorelineFixturePrimitives";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListScoreline: React.FC<GamesListProps> = ({ games }) => (
  <div className="fixtures-stack">
    {games.map((game, index) => (
      <React.Fragment key={game.gameID}>
        <GameCardScoreline game={game} index={index} />
        {index < games.length - 1 ? <ScorelineFixtureSeparator /> : null}
      </React.Fragment>
    ))}
  </div>
);

export default GamesListScoreline;
