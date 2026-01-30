import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { computePartialTwoDayVisibility } from "./_utils/visibility";
import { ResultPlayerName } from "../../../../utils/primitives/ResultPlayerName";
import { ResultPlayerScore } from "../../../../utils/primitives/ResultPlayerScore";
import { PlayerStatsProps, StatItemProps, StatSectionProps, TeamStatsProps, PlayerStat } from "./_types/PlayerStatsProps";
import { truncateText } from "./_utils/helpers";

const StatItem: React.FC<StatItemProps> = ({
  playerName,
  statValue,
  delay,
  index,
  textColor,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const { selectedPalette } = useThemeContext();
  return (
    <div
      className="flex justify-between items-center py-1 mb-1 pr-1 pl-4"
      style={{
        background: selectedPalette.container.backgroundTransparent.high,
      }}
    >
      <ResultPlayerName
        value={truncateText(playerName, 25)}
        variant={textColor}
        animation={{
          ...TextAnimations.copyIn,
          delay: delay + 10 + index,
        }}
      />
      <div
        className=" py-1 px-8"
        style={{
          background: selectedPalette.container.backgroundTransparent.strong,
          minWidth: "160px",
          textAlign: "right",
        }}
      >
        <ResultPlayerScore
          value={statValue}
          variant={textColor}
          animation={{
            ...TextAnimations.copyIn,
            delay: delay + 10 + index,
          }}
        />
      </div>
    </div>
  );
};

const StatSection: React.FC<StatSectionProps> = ({
  players,
  isBatting,
  delay,
  textColor,
}) => {
  const { layout } = useThemeContext();
  if (players.length === 0) return null;

  return (
    <div
      className={`${isBatting ? "mb-2 py-1" : "mb-1"}  ${layout.borderRadius.container}`}
    >
      {players.map((player, i) => (
        <StatItem
          key={`${isBatting ? "bat" : "bowl"}-${i}`}
          playerName={player.player}
          statValue={
            isBatting
              ? `${player.runs}${player.notOut ? "*" : ""} (${player.balls})`
              : `${player.wickets}/${player.runs} (${player.overs})`
          }
          delay={delay}
          index={i}
          textColor={textColor}
        />
      ))}
    </div>
  );
};

const TeamStats: React.FC<TeamStatsProps> = ({
  team,
  delay,
  maxPlayersPerStat,
  className = "",
  showBatting = true,
  showBowling = true,
}) => {
  const { selectedPalette } = useThemeContext();

  const batters = team.battingPerformances
    ? team.battingPerformances.slice(0, maxPlayersPerStat)
    : [];
  const bowlers = team.bowlingPerformances
    ? team.bowlingPerformances.slice(0, maxPlayersPerStat)
    : [];

  return (
    <div className={`flex-1 px-2 py-0 flex flex-col ${className}`}>
      {showBatting && (
        <StatSection
          players={batters}
          isBatting={true}
          delay={delay}
          backgroundColor={
            selectedPalette.container.backgroundTransparent.strong
          }
          textColor={"onContainerCopy"}
        />
      )}

      {showBowling && (
        <StatSection
          players={bowlers}
          isBatting={false}
          delay={delay + 2}
          backgroundColor={
            selectedPalette.container.backgroundTransparent.strong
          }
          textColor={"onContainerCopy"}
        />
      )}
    </div>
  );
};

export const PlayerStatsCNSW: React.FC<PlayerStatsProps> = ({
  homeTeam,
  awayTeam,
  height,
  delay,
  maxPlayersPerStat = 3,
  matchType,
  matchStatus,
}) => {
  const { animations } = useAnimationContext();
  const homeBatted = (homeTeam.battingPerformances || []).length > 0;
  const awayBatted = (awayTeam.battingPerformances || []).length > 0;
  const { flags } = computePartialTwoDayVisibility({
    matchType,
    matchStatus,
    homeBatted,
    awayBatted,
  });
  const { homeShowBatting, homeShowBowling, awayShowBatting, awayShowBowling } =
    flags;

  // flex-col  w-3/4  mx-auto
  return (
    <AnimatedContainer
      type="full"
      className="w-full p-1"
      backgroundColor="none"
      style={{
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
          showBatting={homeShowBatting}
          showBowling={homeShowBowling}
        />

        {/* Away team stats */}
        <TeamStats
          team={awayTeam}
          delay={delay}
          maxPlayersPerStat={maxPlayersPerStat}
          className="border-l border-gray-700"
          showBatting={awayShowBatting}
          showBowling={awayShowBowling}
        />
      </div>
    </AnimatedContainer>
  );
};

export default PlayerStatsCNSW;
