import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultPlayerName } from "../../../../utils/primitives/ResultPlayerName";
import { ResultPlayerScore } from "../../../../utils/primitives/ResultPlayerScore";
import { PlayerStatsSingleTeamProps, StatItemProps, StatSectionProps, TeamStatsProps } from "./_types/PlayerStatsProps";
import { truncateText } from "./_utils/helpers";

const StatItem: React.FC<StatItemProps> = ({
  playerName,
  statValue,
  delay,
  index,
  textColor,
  backgroundColor,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const { layout } = useThemeContext();
  return (
    <div
      className={`flex justify-between items-center py-2  px-4 mb-1 ${layout.borderRadius.container}`}
      style={{ background: backgroundColor }}
    >
      <div>
        <ResultPlayerName
          className="whitespace-nowrap"
          value={truncateText(playerName, 20)}
          variant={textColor}
          animation={{
            ...TextAnimations.copyIn,
            delay: delay + 10 + index,
          }}
        />
      </div>

      <ResultPlayerScore
        className="whitespace-nowrap"
        value={statValue}
        variant={textColor}
        animation={{
          ...TextAnimations.copyIn,
          delay: delay + 10 + index,
        }}
      />
    </div>
  );
};

const StatSection: React.FC<StatSectionProps> = ({
  players,
  isBatting,
  delay,
  backgroundColor,
  textColor,
}) => {
  const { layout } = useThemeContext();
  if (players.length === 0) return null;
  return (
    <div
      className={` flex flex-col justify-between ${layout.borderRadius.container}`}
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
          backgroundColor={backgroundColor}
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

  const gridCols = showBatting && showBowling ? "grid-cols-2" : "grid-cols-1";

  return (
    <div className={`w-full px-2 py-0 grid ${gridCols} gap-4 ${className}`}>
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

export const PlayerStatsSingleTeamOnly: React.FC<PlayerStatsSingleTeamProps> = ({
  Team,
  height,
  delay,
  maxPlayersPerStat = 3,
  showBatting = true,
  showBowling = true,
}) => {
  const { animations } = useAnimationContext();

  return (
    <AnimatedContainer
      type="full"
      className="w-full p-1 mt-2"
      backgroundColor="none"
      style={{
        /*  background: backgroundColor, */
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex w-full h-full  ">
        {/* Home team stats */}
        <TeamStats
          team={Team}
          delay={delay}
          maxPlayersPerStat={maxPlayersPerStat}
          showBatting={showBatting}
          showBowling={showBowling}
        />
      </div>
    </AnimatedContainer>
  );
};

export default PlayerStatsSingleTeamOnly;
