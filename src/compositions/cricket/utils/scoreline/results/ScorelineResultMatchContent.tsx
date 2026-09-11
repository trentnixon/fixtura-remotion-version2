import React from "react";
import type { MatchResult } from "../../../results/_types/types";
import { ScorelineCreaseMarkup } from "../../../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";
import {
  resolveScorelineResultStatementLength,
  resolveScorelineResultStatementText,
} from "./resolveScorelineResultStatement";
import { ScorelineResultMatchCell } from "./ScorelineResultMatchCell";
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
  rowDelay?: number;
  exitFrame?: number;
};

export const ScorelineResultMatchContent: React.FC<
  ScorelineResultMatchContentProps
> = ({ match, className = "", style, rowDelay, exitFrame }) => {
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
  const animateInner = rowDelay !== undefined && exitFrame !== undefined;

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
          side="home"
          rowDelay={rowDelay}
          exitFrame={exitFrame}
          primaryTier="rank"
          identityTier="mark"
        />
        {animateInner ? (
          <ScorelineResultMatchCell
            tier="mark"
            rowDelay={rowDelay}
            exitFrame={exitFrame}
            className="team-score-area__divider"
            animClassName="team-score-area__divider-anim"
          >
            <div className="team-divider" aria-hidden>
              V
            </div>
          </ScorelineResultMatchCell>
        ) : (
          <div className="team-divider" aria-hidden>
            V
          </div>
        )}
        <ScorelineTeamBand
          team={match.awayTeam}
          logoUrl={match.teamAwayLogo?.url || match.awayTeam.logo?.url || ""}
          isClubTeam={match.awayTeam.isClubTeam}
          side="away"
          rowDelay={rowDelay}
          exitFrame={exitFrame}
          primaryTier="team"
          identityTier="away"
        />
      </div>

      {animateInner ? (
        <ScorelineResultMatchCell
          tier="stats"
          rowDelay={rowDelay}
          exitFrame={exitFrame}
          className="match-module__section match-module__section--result"
        >
          <div className="result-bridge">
            <p className="result-statement" data-length={resultLength}>
              {resultText}
            </p>
          </div>
        </ScorelineResultMatchCell>
      ) : (
        <div className="result-bridge">
          <p className="result-statement" data-length={resultLength}>
            {resultText}
          </p>
        </div>
      )}

      {performancePanelCount > 0 ? (
        animateInner ? (
          <ScorelineResultMatchCell
            tier="performances"
            rowDelay={rowDelay}
            exitFrame={exitFrame}
            className="match-module__section match-module__section--performances"
          >
            <ScorelinePerformancePanels
              battingRows={battingRows}
              bowlingRows={bowlingRows}
              hasBatting={hasBatting}
              hasBowling={hasBowling}
            />
          </ScorelineResultMatchCell>
        ) : (
          <ScorelinePerformancePanels
            battingRows={battingRows}
            bowlingRows={bowlingRows}
            hasBatting={hasBatting}
            hasBowling={hasBowling}
          />
        )
      ) : null}

      {animateInner ? (
        <ScorelineResultMatchCell
          tier="context"
          rowDelay={rowDelay}
          exitFrame={exitFrame}
          className="match-module__section match-module__section--context"
        >
          <ScorelineMatchContext
            type={match.type}
            round={match.round}
            ground={match.ground}
          />
        </ScorelineResultMatchCell>
      ) : (
        <ScorelineMatchContext
          type={match.type}
          round={match.round}
          ground={match.ground}
        />
      )}
    </section>
  );
};

export const ScorelineMatchSeparator: React.FC = () => (
  <div className="match-separator" aria-hidden>
    <ScorelineCreaseMarkup />
  </div>
);
