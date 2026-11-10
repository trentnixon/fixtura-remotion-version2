import React, { useMemo } from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import type { MatchResult } from "../../../results/_types/types";
import { ScorelineCreaseMarkup } from "../../../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";
import {
  resolveScorelineResultStatementLength,
  resolveScorelineResultStatementText,
} from "./resolveScorelineResultStatement";
import { ScorelineResultMatchCell } from "./ScorelineResultMatchCell";
import { resolveScorelineMatchPerformances } from "./resolveScorelineMatchPerformances";
import {
  resolveScorelineResultSinglePerformances,
  scorelineBowlingUnderOpposition,
} from "./resolveScorelineResultSinglePerformances";
import {
  ScorelineMatchContext,
  ScorelinePerformancePanels,
  ScorelineTeamBand,
} from "./scorelineMatchShared";

export type ScorelineResultMatchContentProps = {
  match: MatchResult;
  className?: string;
  style?: React.CSSProperties;
  rowDelay?: number;
  exitFrame?: number;
  /** Results Lite omits player performance panels. */
  showPerformancePanels?: boolean;
  /** Results Lite omits type/round/ground context row. */
  showMatchContext?: boolean;
  /** Results Lite omits club / opposition role labels under team names. */
  showTeamRole?: boolean;
  /** Logo as `.team-band` background; hides inline `.team-mark` when crest exists. */
  bandLogoBackground?: boolean;
  /** When false, performance panels omit Batting/Bowling headings (Cricket Results scoreline). */
  showPerformanceHeadings?: boolean;
};

export const ScorelineResultMatchContent: React.FC<
  ScorelineResultMatchContentProps
> = ({
  match,
  className = "",
  style,
  rowDelay,
  exitFrame,
  showPerformancePanels = true,
  showMatchContext = true,
  showTeamRole = true,
  bandLogoBackground = false,
  showPerformanceHeadings = true,
}) => {
  const { isAccountClub, club } = useVideoDataContext();
  const accountIsClub = isAccountClub || false;
  const {
    battingRows,
    bowlingRows,
    hasBatting,
    hasBowling,
    performancePanelCount,
  } = useMemo(
    () =>
      accountIsClub
        ? resolveScorelineResultSinglePerformances(match, club?.name)
        : resolveScorelineMatchPerformances(match),
    [accountIsClub, club?.name, match],
  );
  const bowlingFirst = scorelineBowlingUnderOpposition(
    match,
    accountIsClub,
    club?.name,
  );

  const resultText = resolveScorelineResultStatementText(
    match.result,
    match.resultShort,
  );
  const resultLength = resolveScorelineResultStatementLength(resultText);
  const animateInner = rowDelay !== undefined && exitFrame !== undefined;

  return (
    <section
      className={`match-module ${!showPerformancePanels || performancePanelCount === 0 ? "without-performances" : ""} ${className}`.trim()}
      style={style}
      data-performance-count={showPerformancePanels ? performancePanelCount : 0}
      data-performance-headings={showPerformanceHeadings ? "on" : "off"}
    >
      <div className="team-score-area">
        <ScorelineTeamBand
          team={match.homeTeam}
          matchType={match.type}
          logoUrl={match.teamHomeLogo?.url || match.homeTeam.logo?.url || ""}
          isClubTeam={match.homeTeam.isClubTeam}
          side="home"
          rowDelay={rowDelay}
          exitFrame={exitFrame}
          primaryTier="rank"
          identityTier="mark"
          showTeamRole={showTeamRole}
          bandLogoBackground={bandLogoBackground}
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
          matchType={match.type}
          logoUrl={match.teamAwayLogo?.url || match.awayTeam.logo?.url || ""}
          isClubTeam={match.awayTeam.isClubTeam}
          side="away"
          rowDelay={rowDelay}
          exitFrame={exitFrame}
          primaryTier="team"
          identityTier="away"
          showTeamRole={showTeamRole}
          bandLogoBackground={bandLogoBackground}
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

      {showPerformancePanels && performancePanelCount > 0 ? (
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
              bowlingFirst={bowlingFirst}
              showPerformanceHeadings={showPerformanceHeadings}
            />
          </ScorelineResultMatchCell>
        ) : (
          <ScorelinePerformancePanels
            battingRows={battingRows}
            bowlingRows={bowlingRows}
            hasBatting={hasBatting}
            hasBowling={hasBowling}
            bowlingFirst={bowlingFirst}
            showPerformanceHeadings={showPerformanceHeadings}
          />
        )
      ) : null}

      {showMatchContext ? (
        animateInner ? (
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
        )
      ) : null}
    </section>
  );
};

export const ScorelineMatchSeparator: React.FC = () => (
  <div className="match-separator" aria-hidden>
    <ScorelineCreaseMarkup />
  </div>
);
