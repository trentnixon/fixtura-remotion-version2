import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import type { MatchResult } from "../../../results/_types/types";
import { ScorelineCreaseMarkup } from "../../../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";
import {
  ScorelineMatchContext,
  ScorelinePerformancePanels,
  ScorelineTeamBand,
  useScorelineMatchPerformances,
} from "./scorelineMatchShared";

export type ScorelineResultMatchContentProps = {
  match: MatchResult;
  className?: string;
  style?: React.CSSProperties;
};

export const ScorelineResultMatchContent: React.FC<
  ScorelineResultMatchContentProps
> = ({ match, className = "", style }) => {
  const { isAccountClub } = useVideoDataContext();
  const {
    battingRows,
    bowlingRows,
    hasBatting,
    hasBowling,
    performancePanelCount,
  } = useScorelineMatchPerformances(match, isAccountClub ?? false);

  const resultText = match.resultShort || match.result || "Result pending";
  const resultLengthClass = resultText.length > 42 ? "long" : undefined;

  return (
    <section
      className={`match-module ${performancePanelCount === 0 ? "without-performances" : ""} ${className}`.trim()}
      style={style}
      data-performance-count={performancePanelCount}
    >
      <div className="team-score-area">
        <ScorelineTeamBand
          team={match.homeTeam}
          logoUrl={match.teamHomeLogo?.url || match.homeTeam.logo?.url || ""}
          isClubTeam={match.homeTeam.isClubTeam}
        />
        <div className="team-divider" aria-hidden>
          V
        </div>
        <ScorelineTeamBand
          team={match.awayTeam}
          logoUrl={match.teamAwayLogo?.url || match.awayTeam.logo?.url || ""}
          isClubTeam={match.awayTeam.isClubTeam}
        />
      </div>

      <div className="result-bridge">
        <p className="result-statement" data-length={resultLengthClass}>
          {resultText}
        </p>
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
  );
};

export const ScorelineMatchSeparator: React.FC = () => (
  <div className="match-separator" aria-hidden>
    <ScorelineCreaseMarkup />
  </div>
);
