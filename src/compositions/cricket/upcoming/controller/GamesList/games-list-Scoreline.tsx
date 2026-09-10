import React from "react";
import GameCardScoreline from "../../layout/Card/game-card-Scoreline";
import { ScorelineFixtureSeparator } from "../../../utils/scoreline/fixture/ScorelineFixturePrimitives";
import { GamesListProps } from "./_types/GamesListProps";

const calculateScorelineUpcomingLayout = (
  availableHeight: number,
  gameCount: number,
): { listHeight: number; cardHeight: number } => {
  if (gameCount <= 0) {
    return { listHeight: 0, cardHeight: 0 };
  }

  const cardHeight = Math.floor(availableHeight / gameCount);

  return {
    listHeight: availableHeight,
    cardHeight,
  };
};

export const GamesListScoreline: React.FC<
  GamesListProps & { availableHeight: number }
> = ({ games, availableHeight }) => {
  const { listHeight, cardHeight } = calculateScorelineUpcomingLayout(
    availableHeight,
    games.length,
  );

  return (
    <div className="fixtures-stack" style={{ height: listHeight }}>
      {games.map((game, index) => (
        <React.Fragment key={game.gameID}>
          <GameCardScoreline
            game={game}
            index={index}
            gameRowHeight={cardHeight}
          />
          {index < games.length - 1 ? <ScorelineFixtureSeparator /> : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default GamesListScoreline;
