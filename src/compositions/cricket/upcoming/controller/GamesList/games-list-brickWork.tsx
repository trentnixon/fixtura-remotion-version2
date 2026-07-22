import React from "react";
import {
  BRICKWORK_ROW_GAP_STYLE,
  BRICKWORK_ROW_STACK_CLASS,
} from "../../../../../templates/variants/brickwork/design";
import GameCardBrickWork from "../../layout/Card/game-card-brickWork";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListBrickWork: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div
      className={BRICKWORK_ROW_STACK_CLASS}
      style={BRICKWORK_ROW_GAP_STYLE}
    >
      {games.map((game, index) => (
        <GameCardBrickWork key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesListBrickWork;
