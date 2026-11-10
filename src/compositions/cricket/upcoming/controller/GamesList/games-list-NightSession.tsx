import React, { useMemo } from "react";
import GameCardNightSession from "../../layout/Card/game-card-NightSession";
import { ScorelineFixtureSeparator } from "../../../utils/scoreline/fixture/ScorelineFixturePrimitives";
import { groupGamesByGradeDate } from "../../../utils/nightSession/upcoming/groupGamesByGradeDate";
import { NightSessionUpcomingShellAnim } from "../../../utils/nightSession/upcoming/NightSessionUpcomingShellAnim";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListNightSession: React.FC<GamesListProps> = ({ games }) => {
  const gradeGroups = useMemo(() => groupGamesByGradeDate(games), [games]);
  let enterIndex = 0;

  const takeEnterIndex = (): number => {
    const index = enterIndex;
    enterIndex += 1;
    return index;
  };

  return (
    <div className="fixtures-stack">
      {gradeGroups.map((gradeGroup, gradeIndex) => (
        <section
          key={`${gradeGroup.gradeName}-${gradeIndex}`}
          className="fixtures-grade-group"
          data-empty={gradeGroup.gradeName ? "false" : "true"}
        >
          {gradeGroup.gradeName ? (
            <NightSessionUpcomingShellAnim enterIndex={takeEnterIndex()}>
              <header
                className="fixture-unit__rail fixtures-grade-rail"
                data-empty="false"
              >
                <h2 className="fixture-grade-name">{gradeGroup.gradeName}</h2>
              </header>
            </NightSessionUpcomingShellAnim>
          ) : null}
          <div className="fixtures-grade-group__list gap-2">
            {gradeGroup.dateGroups.map((dateGroup, dateIndex) => (
              <section
                key={`${dateGroup.dateLabel}-${dateIndex}`}
                className="fixtures-date-group"
                data-empty={dateGroup.dateLabel ? "false" : "true"}
              >
                {dateGroup.dateLabel ? (
                  <NightSessionUpcomingShellAnim enterIndex={takeEnterIndex()}>
                    <header
                      className="fixtures-schedule-rail fixtures-date-rail"
                      data-empty="false"
                    >
                      <p className="fixture-date">{dateGroup.dateLabel}</p>
                    </header>
                  </NightSessionUpcomingShellAnim>
                ) : null}
                {dateGroup.dateLabel ? (
                  <NightSessionUpcomingShellAnim
                    enterIndex={takeEnterIndex()}
                    className="fixtures-crease-step w-full min-w-0"
                  >
                    <ScorelineFixtureSeparator />
                  </NightSessionUpcomingShellAnim>
                ) : null}
                <div className="fixtures-date-group__list gap-2">
                  {dateGroup.games.map((game, gameIndex) => {
                    const cardIndex = takeEnterIndex();
                    return (
                      <React.Fragment key={game.gameID}>
                        <GameCardNightSession game={game} index={cardIndex} />
                        {gameIndex < dateGroup.games.length - 1 ? (
                          <NightSessionUpcomingShellAnim
                            enterIndex={takeEnterIndex()}
                            className="fixtures-crease-step w-full min-w-0"
                          >
                            <ScorelineFixtureSeparator />
                          </NightSessionUpcomingShellAnim>
                        ) : null}
                      </React.Fragment>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default GamesListNightSession;
