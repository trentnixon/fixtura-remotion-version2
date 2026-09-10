import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import type { MatchResult as ResultsMatchResult } from "../../../results/_types/types";
import type { MatchResult as ResultSingleMatchResult } from "../../../resultSingle/types";
import {
  ScorelineMatchContext,
  ScorelinePerformancePanels,
  ScorelineTeamBand,
  useScorelineMatchPerformances,
} from "./scorelineMatchShared";

export type ScorelineResultSingleContentProps = {
  match: ResultSingleMatchResult;
  className?: string;
  style?: React.CSSProperties;
};

export const ScorelineResultSingleContent: React.FC<
  ScorelineResultSingleContentProps
> = ({ match, className = "", style }) => {
  const { isAccountClub } = useVideoDataContext();
  const resultsMatch = match as unknown as ResultsMatchResult;
  const {
    battingRows,
    bowlingRows,
    hasBatting,
    hasBowling,
    performancePanelCount,
  } = useScorelineMatchPerformances(resultsMatch, isAccountClub ?? false);

  const resultText = match.resultShort || match.result || "Result pending";
  const resultLengthClass = resultText.length > 42 ? "long" : undefined;
  const gradeName = match.gradeName?.trim() || match.type;

  return (
    <div className={`single-result-stack ${className}`.trim()} style={style}>
      <section
        className={`match-module match-module--single ${performancePanelCount === 0 ? "without-performances" : ""}`.trim()}
        data-performance-count={performancePanelCount}
      >
        <div className="team-score-area team-score-area--single">
          <header className="match-head">
            <div className="match-grade">
              <h2 className="match-grade-name">{gradeName}</h2>
            </div>
            <div className="result-bridge">
              <p
                className="result-statement"
                data-length={resultLengthClass}
              >
                {resultText}
              </p>
            </div>
          </header>

          <ScorelineTeamBand
            team={match.homeTeam as ResultsMatchResult["homeTeam"]}
            logoUrl={match.teamHomeLogo?.url || match.homeTeam.logo?.url || ""}
            isClubTeam={match.homeTeam.isClubTeam}
            markSize="hero"
          />
          <div className="team-divider" aria-hidden>
            V
          </div>
          <ScorelineTeamBand
            team={match.awayTeam as ResultsMatchResult["awayTeam"]}
            logoUrl={match.teamAwayLogo?.url || match.awayTeam.logo?.url || ""}
            isClubTeam={match.awayTeam.isClubTeam}
            markSize="hero"
          />
        </div>

        {performancePanelCount > 0 ? (
          <ScorelinePerformancePanels
            battingRows={battingRows}
            bowlingRows={bowlingRows}
            hasBatting={hasBatting}
            hasBowling={hasBowling}
          />
        ) : null}

        <ScorelineMatchContext
          type={match.type}
          round={match.round}
          ground={match.ground}
        />
      </section>
    </div>
  );
};
