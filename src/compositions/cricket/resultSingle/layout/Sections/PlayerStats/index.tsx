import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultPlayerName } from "../../../../utils/primitives/ResultPlayerName";
import { ResultPlayerScore } from "../../../../utils/primitives/ResultPlayerScore";
import {
  PlayerStatsProps,
  StatItemProps,
  StatSectionProps,
  TeamStatsProps,
} from "./_types/PlayerStatsProps";
import { truncateText } from "./_utils/helpers";

// Export club-only variant
export { PlayerStatsClubOnlyBasic } from "./PlayerStats-clubOnly-Basic";
// Export Mudgeeraba single-team variant
export { default as PlayerStatsMudgeeraba } from "./PlayerStats-Mudgeeraba";

const StatItem: React.FC<StatItemProps> = ({
  playerName,
  statValue,
  delay,
  index,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  return (
    <div className="flex justify-between items-center py-1">
      <ResultPlayerName
        value={truncateText(playerName, 25)}
        variant="onContainerCopy"
        animation={{
          ...TextAnimations.copyIn,
          delay: delay + 2 + index,
        }}
      />

      <ResultPlayerScore
        value={statValue}
        variant="onContainerCopy"
        animation={{
          ...TextAnimations.copyIn,
          delay: delay + 2 + index,
        }}
      />
    </div>
  );
};

// Component for a section of stats (batting or bowling)
const StatSection: React.FC<StatSectionProps> = ({
  players,
  isBatting,
  delay,
}) => {
  if (players.length === 0) return null;

  return (
    <div className={`${isBatting ? "mb-16 py-1" : "mb-1"}`}>
      {players.map((player, i) => (
        <StatItem
          key={`${isBatting ? "bat" : "bowl"}-${i}`}
          playerName={player.player}
          statValue={
            isBatting
              ? `${player.runs}${"notOut" in player && player.notOut ? "*" : ""
              } (${"balls" in player ? player.balls : 0})`
              : `${"wickets" in player ? player.wickets : 0}/${"runs" in player ? player.runs : 0
              } (${"overs" in player ? player.overs : 0})`
          }
          delay={delay}
          index={i}
        />
      ))}
    </div>
  );
};

// Component for a team's stats (both batting and bowling)
const TeamStats: React.FC<TeamStatsProps> = ({
  team,
  delay,
  maxPlayersPerStat,
  className = "",
  showBatting = true,
  showBowling = true,
}) => {
  const batters = team.battingPerformances
    ? team.battingPerformances.slice(0, maxPlayersPerStat)
    : [];
  const bowlers = team.bowlingPerformances
    ? team.bowlingPerformances.slice(0, maxPlayersPerStat)
    : [];

  return (
    <div className={`flex-1 px-8 py-4 flex flex-col ${className}`}>
      {showBatting && (
        <StatSection players={batters} isBatting={true} delay={delay} />
      )}
      {showBowling && (
        <StatSection players={bowlers} isBatting={false} delay={delay + 2} />
      )}
    </div>
  );
};

export const PlayerStats: React.FC<PlayerStatsProps> = ({
  homeTeam,
  awayTeam,
  height,
  delay,
  maxPlayersPerStat = 3,
  matchType,
  matchStatus,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();

  // Get background color from theme
  const backgroundColor = selectedPalette.container.backgroundTransparent.low;

  const homeBatted = (homeTeam.battingPerformances || []).length > 0;
  const awayBatted = (awayTeam.battingPerformances || []).length > 0;
  const isPartialTwoDay =
    matchType === "Two Day+" &&
    matchStatus === "In Progress" &&
    homeBatted !== awayBatted;

  return (
    <AnimatedContainer
      type="full"
      className="w-full p-1"
      backgroundColor="none"
      style={{
        background: backgroundColor,
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex w-full h-full">
        {/* Home team stats */}
        <TeamStats
          team={homeTeam}
          delay={delay}
          maxPlayersPerStat={maxPlayersPerStat}
          showBatting={!isPartialTwoDay || homeBatted}
          showBowling={!isPartialTwoDay || !homeBatted}
        />

        {/* Away team stats */}
        <TeamStats
          team={awayTeam}
          delay={delay}
          maxPlayersPerStat={maxPlayersPerStat}
          className="border-l border-gray-700"
          showBatting={!isPartialTwoDay || awayBatted}
          showBowling={!isPartialTwoDay || !awayBatted}
        />
      </div>
    </AnimatedContainer>
  );
};

export default PlayerStats;
