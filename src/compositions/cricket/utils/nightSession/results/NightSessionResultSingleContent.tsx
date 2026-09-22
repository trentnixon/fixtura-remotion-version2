import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import type { MatchResult as ResultsMatchResult } from "../../../results/_types/types";
import type { MatchResult as ResultSingleMatchResult } from "../../../resultSingle/types";
import { resolveScorelineUpcomingClubSides } from "../../scoreline/fixture/resolveScorelineUpcomingClubSides";
import { NightSessionTeamBand } from "./NightSessionTeamBand";
import {
  resolveScorelineResultStatementLength,
  resolveScorelineResultStatementText,
} from "../../scoreline/results/resolveScorelineResultStatement";
import {
  ScorelineBowlingRow,
  ScorelineBattingRow,
  useScorelineResultSinglePerformances,
} from "../../scoreline/results/scorelineMatchShared";
import { dedupeVenueLabel } from "../../scoreline/results/dedupeVenueLabel";

export type NightSessionResultSingleContentProps = {
  match: ResultSingleMatchResult;
  className?: string;
  style?: React.CSSProperties;
};

export const NightSessionResultSingleContent: React.FC<
  NightSessionResultSingleContentProps
> = ({ match, className = "", style }) => {
  const { club } = useVideoDataContext();
  const resultsMatch = match as unknown as ResultsMatchResult;
  const { homeIsClub, awayIsClub } = resolveScorelineUpcomingClubSides(
    match.homeTeam.name,
    match.awayTeam.name,
    club?.name,
  );
  const {
    battingRows,
    bowlingRows,
    hasBatting,
    hasBowling,
    performancePanelCount,
  } = useScorelineResultSinglePerformances(resultsMatch, club?.name);

  const resultText = resolveScorelineResultStatementText(
    match.result,
    match.resultShort,
  );
  const resultLength = resolveScorelineResultStatementLength(resultText);
  const gradeLabel = match.gradeName?.trim() ?? "";
  const venue = dedupeVenueLabel(match.ground);

  const battingRanks = battingRows.map((row, index, rows) => {
    if (!row || row.kind !== "batting") return 0;
    return rows.slice(0, index + 1).filter((r) => r?.kind === "batting").length;
  });
  const bowlingRanks = bowlingRows.map((row, index, rows) => {
    if (!row || row.kind !== "bowling") return 0;
    return rows.slice(0, index + 1).filter((r) => r?.kind === "bowling").length;
  });

  return (
    <div className={`single-result-stack ${className}`.trim()} style={style}>
      <section
        className="match-module match-module--single fixture-card fixture-unit"
        data-performance-count={performancePanelCount}
      >
        <header
          className="fixture-unit__rail"
          data-empty={gradeLabel ? "false" : "true"}
        >
          <h2 className="fixture-grade-name">{gradeLabel}</h2>
        </header>

        <div className="fixture-unit__frame">
          <div className="comparison-band comparison-band--single">
            <NightSessionTeamBand
              team={match.homeTeam as ResultsMatchResult["homeTeam"]}
              matchType={match.type}
              logoUrl={
                match.teamHomeLogo?.url || match.homeTeam.logo?.url || ""
              }
              isClubTeam={match.homeTeam.isClubTeam || homeIsClub}
              side="home"
            />
            <div className="comparison-band__spine" aria-hidden />
            <NightSessionTeamBand
              team={match.awayTeam as ResultsMatchResult["awayTeam"]}
              matchType={match.type}
              logoUrl={
                match.teamAwayLogo?.url || match.awayTeam.logo?.url || ""
              }
              isClubTeam={match.awayTeam.isClubTeam || awayIsClub}
              side="away"
            />
          </div>

          <div className="result-bridge outcome-bridge">
            <div className="outcome-bridge__rule" aria-hidden />
            <p className="result-statement" data-length={resultLength}>
              {resultText}
            </p>
          </div>

          <div className="performance-area">
            <section
              className="performance-panel"
              data-state={hasBatting ? "filled" : "empty"}
            >
              <h3 className="performance-heading">Batting</h3>
              {battingRows.map((row, index) => (
                <ScorelineBattingRow
                  key={`bat-${index}`}
                  row={row}
                  rank={battingRanks[index]}
                />
              ))}
            </section>
            <section
              className="performance-panel"
              data-state={hasBowling ? "filled" : "empty"}
            >
              <h3 className="performance-heading">Bowling</h3>
              {bowlingRows.map((row, index) => (
                <ScorelineBowlingRow
                  key={`bowl-${index}`}
                  row={row}
                  rank={bowlingRanks[index]}
                />
              ))}
            </section>
          </div>

          <div className="match-context">
            <p className="context-left">
              <span>{match.type}</span>
              <span className="context-separator" aria-hidden />
              <span>{match.round}</span>
            </p>
            <p className="context-venue">{venue}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
