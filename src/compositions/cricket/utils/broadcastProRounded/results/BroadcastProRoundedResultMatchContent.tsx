import React, { useMemo } from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProRoundedResultVerdict } from "../../../../../templates/variants/broadcastProRounded/components/verdict";
import type { Team } from "../../../results/_types/types";
import {
  normalizeScore,
  getFirstInningsDisplay,
} from "../../../results/layout/Sections/TeamsSection/_utils/helpers";
import { computePlayerVisibility } from "../../../results/layout/Sections/PlayerStats/_utils/visibility";
import { buildBroadcastProRoundedResultStatItems } from "./formatStatItems";
import {
  buildBroadcastProRoundedVerdictModel,
  buildCompactVerdictLine,
} from "./buildBroadcastProRoundedVerdictModel";
import { BroadcastProRoundedResultMetaStrip } from "./BroadcastProRoundedResultMetaStrip";
import { BroadcastProRoundedResultTeamRow } from "./BroadcastProRoundedResultTeamRow";
import { BroadcastProRoundedMatchup } from "../../../../../templates/variants/broadcastProRounded/components/matchup";
import { BroadcastProRoundedFixtureFrame } from "../../../../../templates/variants/broadcastProRounded/components/fixture";
import { BroadcastProRoundedStatMatrixResultGrid } from "../../../../../templates/variants/broadcastProRounded/components/stat";
import { csClass } from "../componentStyles";
import { resolveBroadcastProRoundedGlass } from "../glass";
import {
  buildGradeLabel,
  calculateBroadcastProRoundedResultDelays,
  calculateBroadcastProRoundedResultExitFrame,
} from "./matchContentHelpers";
import { resolveBroadcastProRoundedTeamAccentColors } from "./resolveBroadcastProRoundedTeamAccentColors";
import type { BroadcastProRoundedResultMatchData } from "./types";

const teamForStatItems = (
  team: Team,
  showBatting: boolean,
  showBowling: boolean,
): Team => ({
  ...team,
  battingPerformances: showBatting ? team.battingPerformances : [],
  bowlingPerformances: showBowling ? team.bowlingPerformances : [],
});

export interface BroadcastProRoundedResultMatchContentProps {
  match: BroadcastProRoundedResultMatchData;
  delay?: number;
  maxStatItems?: number;
  /** Single-result hero layout shows the statement above the match block. */
  statementPosition?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
  /** Hide ground from the meta strip (Result Single). */
  showGround?: boolean;
  /** Larger player stat typography for single-result hero layout. */
  playerStatsTier?: "list" | "single";
  /** Frame to begin exit animations; defaults from scorecard timing. */
  exitFrame?: number;
}

export const BroadcastProRoundedResultMatchContent: React.FC<
  BroadcastProRoundedResultMatchContentProps
> = ({
  match,
  delay = 0,
  maxStatItems = 3,
  statementPosition = "bottom",
  className = "",
  style,
  showGround = true,
  playerStatsTier = "list",
  exitFrame: exitFrameProp,
}) => {
  const { animations } = useAnimationContext();
  const { isAccountClub, data } = useVideoDataContext();
  const {
    colors,
    selectedPalette,
    componentStyles,
    broadcastProRoundedGlassOpacity,
    broadcastProRoundedTransparentLayers,
  } = useThemeContext();

  const { baseDelay, statsDelay, headerDelay } =
    calculateBroadcastProRoundedResultDelays(delay);
  const primaryAccent = colors?.primary ?? selectedPalette.container.accent;
  const secondaryAccent = colors?.secondary ?? primaryAccent;
  const teamAccents = resolveBroadcastProRoundedTeamAccentColors({
    match,
    isAccountClub: isAccountClub ?? false,
    primary: primaryAccent,
    secondary: secondaryAccent,
  });
  const verdict = buildBroadcastProRoundedVerdictModel(match);
  const compactLine = buildCompactVerdictLine(match);
  const winnerName = match.resultSummary?.winner?.trim() ?? "";
  const homeIsWinner = winnerName === match.homeTeam.name.trim();
  const awayIsWinner = winnerName === match.awayTeam.name.trim();
  const copyIn = animations.text.main.copyIn;
  const copyOut = animations.text.main.copyOut;
  const exitFrame =
    exitFrameProp ??
    calculateBroadcastProRoundedResultExitFrame(data.timings?.FPS_SCORECARD);

  const showHeroVerdict =
    statementPosition === "top" && verdict?.kind === "hero";
  const showCompactVerdict =
    statementPosition === "bottom" &&
    verdict?.kind !== "abandoned" &&
    compactLine != null;
  const showAbandonedVerdict = verdict?.kind === "abandoned";

  const metaDelay = showHeroVerdict ? baseDelay + 2 : baseDelay;

  const glass = useMemo(
    () =>
      resolveBroadcastProRoundedGlass({
        surfaceBase: selectedPalette.container.background,
        broadcastProRoundedGlassOpacity,
        broadcastProRoundedTransparentLayers,
      }),
    [
      selectedPalette.container.background,
      broadcastProRoundedGlassOpacity,
      broadcastProRoundedTransparentLayers,
    ],
  );

  const homeBatted = (match.homeTeam.battingPerformances || []).length > 0;
  const awayBatted = (match.awayTeam.battingPerformances || []).length > 0;
  const visibility = computePlayerVisibility({
    matchType: match.type,
    matchStatus: match.status,
    homeBatted,
    awayBatted,
    isAccountClub: isAccountClub || false,
    homeIsClub: match.homeTeam.isClubTeam,
    awayIsClub: match.awayTeam.isClubTeam,
  });

  const homeStats = buildBroadcastProRoundedResultStatItems(
    teamForStatItems(
      match.homeTeam,
      visibility.homeShowBatting,
      visibility.homeShowBowling,
    ),
    maxStatItems,
  );
  const awayStats = buildBroadcastProRoundedResultStatItems(
    teamForStatItems(
      match.awayTeam,
      visibility.awayShowBatting,
      visibility.awayShowBowling,
    ),
    maxStatItems,
  );

  const homeFirstInnings = getFirstInningsDisplay(
    match.type,
    match.homeTeam.homeScoresFirstInnings,
  );
  const awayFirstInnings = getFirstInningsDisplay(
    match.type,
    match.awayTeam.awayScoresFirstInnings,
  );

  const matchBlockClass = csClass(
    componentStyles,
    "broadcastProRoundedResultsMatchBlock",
  );

  const compactVerdictModel =
    compactLine != null
      ? { kind: "compact" as const, line: compactLine }
      : null;

  return (
    <div
      className={`mx-6 flex h-full w-auto flex-col overflow-hidden md:mx-8 ${className}`.trim()}
      style={style}
    >
      <BroadcastProRoundedFixtureFrame
        accentColor={primaryAccent}
        glass={glass}
        className="flex h-full min-h-0 flex-1 flex-col justify-center gap-2"
      >
        <div className="flex w-full shrink-0 flex-col gap-2">
          {showHeroVerdict && verdict?.kind === "hero" && (
            <BroadcastProRoundedResultVerdict
              model={verdict}
              tier="hero"
              accentColor={primaryAccent}
              delay={baseDelay}
              glass={glass}
              animation={copyIn}
              exitAnimation={copyOut}
              exitFrame={exitFrame}
              connection="attached"
            />
          )}

          <div style={{ borderBottom: glass.border }}>
            <BroadcastProRoundedResultMetaStrip
              gradeLabel={buildGradeLabel(match)}
              ground={match.ground}
              delay={metaDelay}
              showGround={showGround}
              connection="attached"
              exitAnimation={copyOut}
              exitFrame={exitFrame}
            />
          </div>
        </div>

        <BroadcastProRoundedMatchup
          tier="result"
          home={{
            teamName: match.homeTeam.name,
            logo: match.teamHomeLogo ?? null,
          }}
          away={{
            teamName: match.awayTeam.name,
            logo: match.teamAwayLogo ?? null,
          }}
          glass={glass}
          className={`${matchBlockClass} min-h-0 shrink-0 !gap-2`}
          renderResultBlock={(side) => {
            if (side === "home") {
              return (
                <div className="flex min-h-0 flex-col gap-2">
                  <BroadcastProRoundedResultTeamRow
                    teamName={match.homeTeam.name}
                    score={normalizeScore(match.homeTeam.score)}
                    logo={match.teamHomeLogo}
                    firstInnings={
                      homeFirstInnings.show ? homeFirstInnings.value : null
                    }
                    accentColor={teamAccents.home}
                    delay={metaDelay}
                    matchType={match.type}
                    glass={glass}
                    connection="attached"
                    scoreEmphasis={homeIsWinner ? "winner" : "standard"}
                    crestSize={
                      playerStatsTier === "single" ? "hero" : "standard"
                    }
                    exitAnimation={copyOut}
                    exitFrame={exitFrame}
                  />
                  <BroadcastProRoundedStatMatrixResultGrid
                    items={homeStats}
                    delay={statsDelay}
                    accentColor={teamAccents.home}
                    glass={glass}
                    tier={playerStatsTier}
                    connection="attached"
                    exitAnimation={copyOut}
                    exitFrame={exitFrame}
                  />
                </div>
              );
            }
            return (
              <div className="flex min-h-0 flex-col gap-2">
                <BroadcastProRoundedResultTeamRow
                  teamName={match.awayTeam.name}
                  score={normalizeScore(match.awayTeam.score)}
                  logo={match.teamAwayLogo}
                  firstInnings={
                    awayFirstInnings.show ? awayFirstInnings.value : null
                  }
                  accentColor={teamAccents.away}
                  delay={statsDelay + 4}
                  matchType={match.type}
                  glass={glass}
                  connection="attached"
                  scoreEmphasis={awayIsWinner ? "winner" : "standard"}
                  crestSize={playerStatsTier === "single" ? "hero" : "standard"}
                  exitAnimation={copyOut}
                  exitFrame={exitFrame}
                />
                <BroadcastProRoundedStatMatrixResultGrid
                  items={awayStats}
                  delay={statsDelay + 8}
                  accentColor={teamAccents.away}
                  glass={glass}
                  tier={playerStatsTier}
                  connection="attached"
                  exitAnimation={copyOut}
                  exitFrame={exitFrame}
                />
              </div>
            );
          }}
        />

        {showAbandonedVerdict && verdict?.kind === "abandoned" && (
          <BroadcastProRoundedResultVerdict
            model={verdict}
            tier="abandoned"
            accentColor={primaryAccent}
            delay={headerDelay}
            glass={glass}
            animation={copyIn}
            exitAnimation={copyOut}
            exitFrame={exitFrame}
            connection="attached"
            className="shrink-0"
          />
        )}

        {showCompactVerdict && compactVerdictModel && (
          <BroadcastProRoundedResultVerdict
            model={compactVerdictModel}
            tier="compact"
            accentColor={primaryAccent}
            delay={headerDelay + 2}
            glass={glass}
            animation={copyIn}
            exitAnimation={copyOut}
            exitFrame={exitFrame}
            connection="attached"
            className="shrink-0"
          />
        )}
      </BroadcastProRoundedFixtureFrame>
    </div>
  );
};
