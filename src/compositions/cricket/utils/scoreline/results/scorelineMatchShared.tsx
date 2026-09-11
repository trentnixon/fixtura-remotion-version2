import React, { useMemo } from "react";
import { Img } from "remotion";
import type { MatchResult, Team } from "../../../results/_types/types";
import { normalizeScore } from "../../../results/layout/Sections/TeamsSection/_utils/helpers";
import { dedupeVenueLabel } from "./dedupeVenueLabel";
import type { ScorelinePerformanceRow } from "./formatPerformances";
import { resolveScorelineMatchPerformances } from "./resolveScorelineMatchPerformances";
import { resolveScorelineResultSinglePerformances } from "./resolveScorelineResultSinglePerformances";
import { ScorelineResultMatchCell } from "./ScorelineResultMatchCell";
import type { ScorelineInnerTier } from "../scorelineInnerAnimationDelays";

export {
  PERFORMANCE_SLOT_COUNT,
  resolveScorelineMatchPerformances,
  toPerformanceSlots,
} from "./resolveScorelineMatchPerformances";

export { pickTopBatting, pickTopBowling } from "./formatPerformances";
export type { ScorelinePerformanceRow } from "./formatPerformances";

export const useScorelineMatchPerformances = (match: MatchResult) =>
  useMemo(() => resolveScorelineMatchPerformances(match), [match]);

export const useScorelineResultSinglePerformances = (
  match: MatchResult,
  clubName?: string,
) =>
  useMemo(
    () => resolveScorelineResultSinglePerformances(match, clubName),
    [match, clubName],
  );

const rankFilledPerformanceRows = (
  rows: Array<ScorelinePerformanceRow | null>,
  kind: ScorelinePerformanceRow["kind"],
): number[] => {
  let rank = 0;
  return rows.map((row) => {
    if (!row || row.kind !== kind) {
      return 0;
    }
    rank += 1;
    return rank;
  });
};

export const ScorelineTeamBand: React.FC<{
  team: Team;
  logoUrl: string;
  isClubTeam: boolean;
  markSize?: "default" | "hero";
  side?: "home" | "away";
  rowDelay?: number;
  exitFrame?: number;
  primaryTier?: ScorelineInnerTier;
  identityTier?: ScorelineInnerTier;
}> = ({
  team,
  logoUrl,
  isClubTeam,
  markSize = "default",
  side,
  rowDelay,
  exitFrame,
  primaryTier = "rank",
  identityTier = "mark",
}) => {
  const hasCrest = Boolean(logoUrl);
  const oversValue = team.overs?.trim() ?? "";
  const animateInner = rowDelay !== undefined && exitFrame !== undefined;

  const primary = (
    <div className="team-primary">
      <div className="team-mark">
        <span className="mark-fallback" aria-hidden />
        {hasCrest ? <Img src={logoUrl} alt="" /> : null}
      </div>
      <p className="team-score">
        <span className="score">{normalizeScore(team.score)}</span>
        <span className="overs" data-empty={oversValue ? "false" : "true"}>
          {oversValue ? (
            <>
              <span>{oversValue}</span> ov
            </>
          ) : null}
        </span>
      </p>
    </div>
  );

  const identity = (
    <div className="team-identity">
      <h2 className="team-name">{team.name}</h2>
      <span className="team-role">
        <span className="club-role">Our Team</span>
        <span className="opposition-role">Opposition</span>
      </span>
    </div>
  );

  return (
    <div
      className={`team-band ${markSize === "hero" ? "team-band--hero" : ""}`.trim()}
      data-side={side}
      data-club-team={isClubTeam ? "true" : "false"}
      data-has-crest={hasCrest ? "true" : "false"}
    >
      {animateInner ? (
        <ScorelineResultMatchCell
          tier={primaryTier}
          rowDelay={rowDelay}
          exitFrame={exitFrame}
          className="team-band__slot team-band__slot--primary"
          animClassName="team-band__anim"
        >
          {primary}
        </ScorelineResultMatchCell>
      ) : (
        primary
      )}
      {animateInner ? (
        <ScorelineResultMatchCell
          tier={identityTier}
          rowDelay={rowDelay}
          exitFrame={exitFrame}
          className="team-band__slot team-band__slot--identity"
          animClassName="team-band__anim"
        >
          {identity}
        </ScorelineResultMatchCell>
      ) : (
        identity
      )}
    </div>
  );
};

export const ScorelineBattingRow: React.FC<{
  row: ScorelinePerformanceRow | null;
  rank: number;
}> = ({ row, rank }) => {
  if (!row || row.kind !== "batting") {
    return (
      <p className="performance-row" data-empty="true">
        <span className="performance-player" />
        <span className="performance-figure" />
      </p>
    );
  }

  return (
    <p className="performance-row" data-rank={rank}>
      <span className="performance-player">{row.player}</span>
      <span className="performance-figure">
        <span>{row.runs}</span>
        {row.notOut ? <span>*</span> : null}
        <span className="performance-balls">
          (<span>{row.balls}</span>)
        </span>
      </span>
    </p>
  );
};

export const ScorelineBowlingRow: React.FC<{
  row: ScorelinePerformanceRow | null;
  rank: number;
}> = ({ row, rank }) => {
  if (!row || row.kind !== "bowling") {
    return (
      <p className="performance-row" data-empty="true">
        <span className="performance-player" />
        <span className="performance-figure" />
      </p>
    );
  }

  return (
    <p className="performance-row" data-rank={rank}>
      <span className="performance-player">{row.player}</span>
      <span className="performance-figure">
        <span>{row.wickets}</span>/<span>{row.runs}</span>
        <span className="performance-balls">
          (<span>{row.overs}</span>)
        </span>
      </span>
    </p>
  );
};

export const ScorelinePerformancePanels: React.FC<{
  battingRows: Array<ScorelinePerformanceRow | null>;
  bowlingRows: Array<ScorelinePerformanceRow | null>;
  hasBatting: boolean;
  hasBowling: boolean;
}> = ({ battingRows, bowlingRows, hasBatting, hasBowling }) => {
  const battingRanks = rankFilledPerformanceRows(battingRows, "batting");
  const bowlingRanks = rankFilledPerformanceRows(bowlingRows, "bowling");

  return (
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
};

export const ScorelineMatchContext: React.FC<{
  type: string;
  round: string;
  ground: string;
}> = ({ type, round, ground }) => {
  const venue = dedupeVenueLabel(ground);

  return (
    <div className="match-context">
      <p className="context-left">
        <span>{type}</span>
        <span className="context-separator" aria-hidden />
        <span>{round}</span>
      </p>
      <p className="context-venue">{venue}</p>
    </div>
  );
};
