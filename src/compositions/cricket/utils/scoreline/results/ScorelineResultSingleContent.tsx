import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import type { MatchResult as ResultsMatchResult } from "../../../results/_types/types";
import type { MatchResult as ResultSingleMatchResult } from "../../../resultSingle/types";
import { resolveScorelineUpcomingClubSides } from "../fixture/resolveScorelineUpcomingClubSides";
import {
  resolveScorelineResultStatementLength,
  resolveScorelineResultStatementText,
} from "./resolveScorelineResultStatement";
import {
  ScorelineMatchContext,
  ScorelinePerformancePanels,
  ScorelineTeamBand,
  useScorelineResultSinglePerformances,
} from "./scorelineMatchShared";

export type ScorelineResultSingleContentProps = {
  match: ResultSingleMatchResult;
  className?: string;
  style?: React.CSSProperties;
};

export const ScorelineResultSingleContent: React.FC<
  ScorelineResultSingleContentProps
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

  return (
    <div className={`single-result-stack ${className}`.trim()} style={style}>
      <section
        className={`match-module match-module--single ${performancePanelCount === 0 ? "without-performances" : ""}`.trim()}
        data-performance-count={performancePanelCount}
      >
        <div className="team-score-area team-score-area--single">
          <header className="match-head">
            <div
              className="match-grade"
              data-empty={gradeLabel ? "false" : "true"}
            >
              <h2 className="match-grade-name">{gradeLabel}</h2>
            </div>
            <div className="result-bridge">
              <p className="result-statement" data-length={resultLength}>
                {resultText}
              </p>
            </div>
          </header>

          <ScorelineTeamBand
            team={match.homeTeam as ResultsMatchResult["homeTeam"]}
            logoUrl={match.teamHomeLogo?.url || match.homeTeam.logo?.url || ""}
            isClubTeam={match.homeTeam.isClubTeam || homeIsClub}
            markSize="hero"
            side="home"
          />
          <div className="team-divider" aria-hidden>
            V
          </div>
          <ScorelineTeamBand
            team={match.awayTeam as ResultsMatchResult["awayTeam"]}
            logoUrl={match.teamAwayLogo?.url || match.awayTeam.logo?.url || ""}
            isClubTeam={match.awayTeam.isClubTeam || awayIsClub}
            markSize="hero"
            side="away"
          />
        </div>

        <ScorelinePerformancePanels
          battingRows={battingRows}
          bowlingRows={bowlingRows}
          hasBatting={hasBatting}
          hasBowling={hasBowling}
        />

        <ScorelineMatchContext
          type={match.type}
          round={match.round}
          ground={match.ground}
        />
      </section>
    </div>
  );
};
