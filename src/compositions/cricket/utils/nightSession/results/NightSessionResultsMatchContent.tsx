import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import type { MatchResult } from "../../../results/_types/types";
import { resolveScorelineUpcomingClubSides } from "../../scoreline/fixture/resolveScorelineUpcomingClubSides";
import { NightSessionTeamBand } from "./NightSessionTeamBand";
import {
  resolveScorelineResultStatementLength,
  resolveScorelineResultStatementText,
} from "../../scoreline/results/resolveScorelineResultStatement";
import {
  ScorelineBattingRow,
  ScorelineBowlingRow,
  useScorelineMatchPerformances,
} from "../../scoreline/results/scorelineMatchShared";
import { dedupeVenueLabel } from "../../scoreline/results/dedupeVenueLabel";
import { NightSessionResultMatchCell } from "./NightSessionResultMatchCell";

export type NightSessionResultsMatchContentProps = {
  match: MatchResult;
  className?: string;
  style?: React.CSSProperties;
  showFixtureClose?: boolean;
  rowDelay?: number;
  exitFrame?: number;
};

export const NightSessionResultsMatchContent: React.FC<
  NightSessionResultsMatchContentProps
> = ({
  match,
  className = "",
  style,
  showFixtureClose = true,
  rowDelay,
  exitFrame,
}) => {
  const { club } = useVideoDataContext();
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
  } = useScorelineMatchPerformances(match);

  const resultText = resolveScorelineResultStatementText(
    match.result,
    match.resultShort,
  );
  const resultLength = resolveScorelineResultStatementLength(resultText);
  const venue = dedupeVenueLabel(match.ground);

  const battingRanks = battingRows.map((row, index, rows) => {
    if (!row || row.kind !== "batting") return 0;
    return rows.slice(0, index + 1).filter((r) => r?.kind === "batting").length;
  });
  const bowlingRanks = bowlingRows.map((row, index, rows) => {
    if (!row || row.kind !== "bowling") return 0;
    return rows.slice(0, index + 1).filter((r) => r?.kind === "bowling").length;
  });

  const animateInner = rowDelay !== undefined && exitFrame !== undefined;

  const teamScoreArea = (
    <div className="team-score-area">
      <div className="comparison-band">
        <NightSessionTeamBand
          team={match.homeTeam}
          matchType={match.type}
          logoUrl={match.teamHomeLogo?.url || match.homeTeam.logo?.url || ""}
          isClubTeam={match.homeTeam.isClubTeam || homeIsClub}
          side="home"
        />
        <div className="comparison-band__spine" aria-hidden />
        <NightSessionTeamBand
          team={match.awayTeam}
          matchType={match.type}
          logoUrl={match.teamAwayLogo?.url || match.awayTeam.logo?.url || ""}
          isClubTeam={match.awayTeam.isClubTeam || awayIsClub}
          side="away"
        />
      </div>
    </div>
  );

  const resultBridge = (
    <div className="result-bridge outcome-bridge">
      <div className="outcome-bridge__rule" aria-hidden />
      <p className="result-statement" data-length={resultLength}>
        {resultText}
      </p>
    </div>
  );

  const performanceArea = (
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
  );

  const matchContext = (
    <div className="match-context">
      <p className="context-left">
        <span>{match.type}</span>
        <span className="context-separator" aria-hidden />
        <span>{match.round}</span>
      </p>
      <p className="context-venue">{venue}</p>
    </div>
  );

  return (
    <section
      className={`match-module ${performancePanelCount === 0 ? "without-performances" : ""} ${className}`.trim()}
      style={style}
      data-performance-count={performancePanelCount}
    >
      {animateInner ? (
        <NightSessionResultMatchCell
          tier="home"
          rowDelay={rowDelay}
          exitFrame={exitFrame}
        >
          {teamScoreArea}
        </NightSessionResultMatchCell>
      ) : (
        teamScoreArea
      )}

      {animateInner ? (
        <NightSessionResultMatchCell
          tier="centre"
          rowDelay={rowDelay}
          exitFrame={exitFrame}
        >
          {resultBridge}
        </NightSessionResultMatchCell>
      ) : (
        resultBridge
      )}

      {performancePanelCount > 0 ? (
        animateInner ? (
          <NightSessionResultMatchCell
            tier="performances"
            rowDelay={rowDelay}
            exitFrame={exitFrame}
          >
            {performanceArea}
          </NightSessionResultMatchCell>
        ) : (
          performanceArea
        )
      ) : null}

      {animateInner ? (
        <NightSessionResultMatchCell
          tier="context"
          rowDelay={rowDelay}
          exitFrame={exitFrame}
        >
          {matchContext}
        </NightSessionResultMatchCell>
      ) : (
        matchContext
      )}

      {showFixtureClose ? (
        <div className="fixture-close" aria-hidden>
          <div className="ns-accent-divider">
            <span className="ns-accent-wedge" />
            <span className="ns-accent-lines" />
          </div>
        </div>
      ) : null}
    </section>
  );
};
