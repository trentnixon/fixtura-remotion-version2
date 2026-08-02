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
import { BroadcastProRoundedResultPlayerStatsGrid } from "./BroadcastProRoundedResultPlayerStatsGrid";
import { BroadcastProRoundedResultTeamRow } from "./BroadcastProRoundedResultTeamRow";
import { BroadcastProRoundedMatchup } from "../../../../../templates/variants/broadcastProRounded/components/matchup";
import { csClass } from "../componentStyles";
import { resolveBroadcastProRoundedGlass } from "../glass";
import {
  buildGradeLabel,
  calculateBroadcastProRoundedResultDelays,
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
}) => {
  const { animations } = useAnimationContext();
  const { isAccountClub } = useVideoDataContext();
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
  const copyIn = animations.text.main.copyIn;

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
      className={`mx-6 flex h-full w-auto flex-col gap-1 overflow-hidden md:mx-8 ${className}`.trim()}
      style={style}
    >
      {showHeroVerdict && verdict?.kind === "hero" && (
        <BroadcastProRoundedResultVerdict
          model={verdict}
          tier="hero"
          accentColor={primaryAccent}
          delay={baseDelay}
          glass={glass}
          animation={copyIn}
          className="mb-2"
        />
      )}

      <BroadcastProRoundedResultMetaStrip
        gradeLabel={buildGradeLabel(match)}
        ground={match.ground}
        delay={metaDelay}
        showGround={showGround}
      />

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
        className={matchBlockClass}
        renderResultBlock={(side) => {
          if (side === "home") {
            return (
              <>
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
                />
                <BroadcastProRoundedResultPlayerStatsGrid
                  items={homeStats}
                  delay={statsDelay}
                  accentColor={teamAccents.home}
                  glass={glass}
                  tier={playerStatsTier}
                />
              </>
            );
          }
          return (
            <>
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
                className="mt-2"
              />
              <BroadcastProRoundedResultPlayerStatsGrid
                items={awayStats}
                delay={statsDelay + 8}
                accentColor={teamAccents.away}
                glass={glass}
                tier={playerStatsTier}
              />
            </>
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
        />
      )}
    </div>
  );
};
