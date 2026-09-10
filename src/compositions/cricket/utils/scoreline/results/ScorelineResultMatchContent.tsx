import React, { useMemo } from "react";
import { Img } from "remotion";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import type { MatchResult, Team } from "../../../results/_types/types";
import { computePlayerVisibility } from "../../../results/layout/Sections/PlayerStats/_utils/visibility";
import { normalizeScore } from "../../../results/layout/Sections/TeamsSection/_utils/helpers";
import { ScorelineCreaseMarkup } from "../../../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";
import {
  pickTopBatting,
  pickTopBowling,
  type ScorelinePerformanceRow,
} from "./formatPerformances";

export type ScorelineResultMatchContentProps = {
  match: MatchResult;
  className?: string;
  style?: React.CSSProperties;
};

const teamForPerformances = (
  team: Team,
  showBatting: boolean,
  showBowling: boolean,
): Team => ({
  ...team,
  battingPerformances: showBatting ? team.battingPerformances : [],
  bowlingPerformances: showBowling ? team.bowlingPerformances : [],
});

const SLOT_COUNT = 3;

const ScorelineTeamBand: React.FC<{
  team: Team;
  logoUrl: string;
  isClubTeam: boolean;
}> = ({ team, logoUrl, isClubTeam }) => {
  const hasCrest = Boolean(logoUrl);
  const oversValue = team.overs?.trim() ?? "";

  return (
    <div
      className="team-band"
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

const toPerformanceSlots = (
  rows: ScorelinePerformanceRow[],
): Array<ScorelinePerformanceRow | null> =>
  Array.from({ length: SLOT_COUNT }, (_, index) => rows[index] ?? null);

const BattingRow: React.FC<{ row: ScorelinePerformanceRow | null; rank: number }> = ({
  row,
  rank,
}) => {
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

const BowlingRow: React.FC<{ row: ScorelinePerformanceRow | null; rank: number }> = ({
  row,
  rank,
}) => {
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

export const ScorelineResultMatchContent: React.FC<
  ScorelineResultMatchContentProps
> = ({ match, className = "", style }) => {
  const { isAccountClub } = useVideoDataContext();

  const visibility = computePlayerVisibility({
    matchType: match.type,
    matchStatus: match.status,
    homeBatted: match.homeTeam.battingPerformances.length > 0,
    awayBatted: match.awayTeam.battingPerformances.length > 0,
    isAccountClub: isAccountClub ?? false,
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
    ].slice(0, SLOT_COUNT);
    return toPerformanceSlots(rows);
  }, [homeTeam.battingPerformances, awayTeam.battingPerformances]);

  const bowlingRows = useMemo(() => {
    const rows = [
      ...pickTopBowling(homeTeam.bowlingPerformances),
      ...pickTopBowling(awayTeam.bowlingPerformances),
    ].slice(0, SLOT_COUNT);
    return toPerformanceSlots(rows);
  }, [homeTeam.bowlingPerformances, awayTeam.bowlingPerformances]);

  const hasBatting = battingRows.some((row) => row?.kind === "batting");
  const hasBowling = bowlingRows.some((row) => row?.kind === "bowling");
  const performancePanelCount =
    (hasBatting ? 1 : 0) + (hasBowling ? 1 : 0);
  const resultText = match.resultShort || match.result || "Result pending";
  const resultLengthClass =
    resultText.length > 42 ? "long" : undefined;

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
        <p
          className="result-statement"
          data-length={resultLengthClass}
        >
          {resultText}
        </p>
      </div>

      {performancePanelCount > 0 ? (
        <div className="performance-area">
          <section
            className="performance-panel"
            data-state={hasBatting ? "filled" : "empty"}
          >
            <h3 className="performance-heading">Batting</h3>
            {battingRows.map((row, index) => (
              <BattingRow key={`bat-${index}`} row={row} rank={index + 1} />
            ))}
          </section>
          <section
            className="performance-panel"
            data-state={hasBowling ? "filled" : "empty"}
          >
            <h3 className="performance-heading">Bowling</h3>
            {bowlingRows.map((row, index) => (
              <BowlingRow key={`bowl-${index}`} row={row} rank={index + 1} />
            ))}
          </section>
        </div>
      ) : null}

      <div className="match-context">
        <p className="context-left">
          <span>{match.type}</span>
          <span className="context-separator" aria-hidden />
          <span>{match.round}</span>
        </p>
        <p className="context-venue">{match.ground}</p>
      </div>
    </section>
  );
};

export const ScorelineMatchSeparator: React.FC = () => (
  <div className="match-separator" aria-hidden>
    <ScorelineCreaseMarkup />
  </div>
);
