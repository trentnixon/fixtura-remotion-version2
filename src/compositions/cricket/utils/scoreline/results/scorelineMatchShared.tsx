import React, { useMemo } from "react";
import { Img } from "remotion";
import type { MatchResult, Team } from "../../../results/_types/types";
import { computePlayerVisibility } from "../../../results/layout/Sections/PlayerStats/_utils/visibility";
import { normalizeScore } from "../../../results/layout/Sections/TeamsSection/_utils/helpers";
import {
  pickTopBatting,
  pickTopBowling,
  type ScorelinePerformanceRow,
} from "./formatPerformances";

export const PERFORMANCE_SLOT_COUNT = 3;

export const teamForPerformances = (
  team: Team,
  showBatting: boolean,
  showBowling: boolean,
): Team => ({
  ...team,
  battingPerformances: showBatting ? team.battingPerformances : [],
  bowlingPerformances: showBowling ? team.bowlingPerformances : [],
});

export const toPerformanceSlots = (
  rows: ScorelinePerformanceRow[],
): Array<ScorelinePerformanceRow | null> =>
  Array.from({ length: PERFORMANCE_SLOT_COUNT }, (_, index) => rows[index] ?? null);

export const useScorelineMatchPerformances = (
  match: MatchResult,
  isAccountClub: boolean,
) => {
  const visibility = computePlayerVisibility({
    matchType: match.type,
    matchStatus: match.status,
    homeBatted: match.homeTeam.battingPerformances.length > 0,
    awayBatted: match.awayTeam.battingPerformances.length > 0,
    isAccountClub,
    homeIsClub: match.homeTeam.isClubTeam,
    awayIsClub: match.awayTeam.isClubTeam,
  });

  const homeTeam = teamForPerformances(
    match.homeTeam,
    visibility.homeShowBatting,
    visibility.homeShowBowling,
  );
  const awayTeam = teamForPerformances(
    match.awayTeam,
    visibility.awayShowBatting,
    visibility.awayShowBowling,
  );

  const battingRows = useMemo(() => {
    const rows = [
      ...pickTopBatting(homeTeam.battingPerformances),
      ...pickTopBatting(awayTeam.battingPerformances),
    ].slice(0, PERFORMANCE_SLOT_COUNT);
    return toPerformanceSlots(rows);
  }, [homeTeam.battingPerformances, awayTeam.battingPerformances]);

  const bowlingRows = useMemo(() => {
    const rows = [
      ...pickTopBowling(homeTeam.bowlingPerformances),
      ...pickTopBowling(awayTeam.bowlingPerformances),
    ].slice(0, PERFORMANCE_SLOT_COUNT);
    return toPerformanceSlots(rows);
  }, [homeTeam.bowlingPerformances, awayTeam.bowlingPerformances]);

  const hasBatting = battingRows.some((row) => row?.kind === "batting");
  const hasBowling = bowlingRows.some((row) => row?.kind === "bowling");
  const performancePanelCount =
    (hasBatting ? 1 : 0) + (hasBowling ? 1 : 0);

  return {
    battingRows,
    bowlingRows,
    hasBatting,
    hasBowling,
    performancePanelCount,
  };
};

export const ScorelineTeamBand: React.FC<{
  team: Team;
  logoUrl: string;
  isClubTeam: boolean;
  markSize?: "default" | "hero";
}> = ({ team, logoUrl, isClubTeam, markSize = "default" }) => {
  const hasCrest = Boolean(logoUrl);
  const oversValue = team.overs?.trim() ?? "";

  return (
    <div
      className={`team-band ${markSize === "hero" ? "team-band--hero" : ""}`.trim()}
      data-club-team={isClubTeam ? "true" : "false"}
      data-has-crest={hasCrest ? "true" : "false"}
    >
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
      <div className="team-identity">
        <h2 className="team-name">{team.name}</h2>
        <span className="team-role">
          <span className="club-role">Our Team</span>
          <span className="opposition-role">Opposition</span>
        </span>
      </div>
    </div>
  );
};

export const ScorelineBattingRow: React.FC<{
  row: ScorelinePerformanceRow | null;
  rank: number;
}> = ({ row, rank }) => {
  if (!row || row.kind !== "batting") {
    return (
      <p className="performance-row" data-empty="true" data-rank={rank}>
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
      <p className="performance-row" data-empty="true" data-rank={rank}>
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
}> = ({ battingRows, bowlingRows, hasBatting, hasBowling }) => (
  <div className="performance-area">
    <section
      className="performance-panel"
      data-state={hasBatting ? "filled" : "empty"}
    >
      <h3 className="performance-heading">Batting</h3>
      {battingRows.map((row, index) => (
        <ScorelineBattingRow key={`bat-${index}`} row={row} rank={index + 1} />
      ))}
    </section>
    <section
      className="performance-panel"
      data-state={hasBowling ? "filled" : "empty"}
    >
      <h3 className="performance-heading">Bowling</h3>
      {bowlingRows.map((row, index) => (
        <ScorelineBowlingRow key={`bowl-${index}`} row={row} rank={index + 1} />
      ))}
    </section>
  </div>
);

export const ScorelineMatchContext: React.FC<{
  type: string;
  round: string;
  ground: string;
}> = ({ type, round, ground }) => (
  <div className="match-context">
    <p className="context-left">
      <span>{type}</span>
      <span className="context-separator" aria-hidden />
      <span>{round}</span>
    </p>
    <p className="context-venue">{ground}</p>
  </div>
);
