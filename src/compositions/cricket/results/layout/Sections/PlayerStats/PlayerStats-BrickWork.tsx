import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { computePartialTwoDayVisibility } from "./_utils/visibility";
import { ResultPlayerName } from "../../../../utils/primitives/ResultPlayerName";
import { ResultPlayerScore } from "../../../../utils/primitives/ResultPlayerScore";
import { PlayerStatsProps, StatItemProps, StatSectionProps, TeamStatsProps } from "./_types/PlayerStatsProps";
import { truncateText } from "./_utils/helpers";

const StatItem: React.FC<StatItemProps> = ({
  playerName,
  statValue,
  delay,
  index,
  outerContainer,
  innerContainer,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  return (
    <div
      className="flex  flex-row  justify-between items-center py-1 px-2 "
      style={outerContainer}
    >
      <div className="flex-4">
        <ResultPlayerName
          value={truncateText(playerName, 20)}
          animation={{
            ...TextAnimations.copyIn,
            delay: delay + 10 + index,
          }}
        />
      </div>
      <div className="p-2 flex-2 flex justify-end" style={innerContainer}>
        <ResultPlayerScore
          value={statValue}
          className="text-right"
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
  outerContainer,
  innerContainer,
}) => {
  if (players.length === 0) return null;

  return (
    <div className={`flex flex-col gap-1 ${isBatting ? "mb-4" : "mb-1"} rounded-none`}>
      {players.map((player, i) => (
        <div key={`${isBatting ? "bat" : "bowl"}-${i}`}>
          <StatItem
            playerName={player.player}
            statValue={
              isBatting
                ? `${player.runs}${player.notOut ? "*" : ""} (${player.balls})`
                : `${player.wickets}/${player.runs} (${player.overs})`
            }
            delay={delay}
            index={i}
            outerContainer={outerContainer}
            innerContainer={innerContainer}
          />
        </div>
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
    <div className={`flex-1 px-0 py-0 flex flex-col gap-1 ${className}`}>
      {showBatting && (
        <StatSection
          players={batters}
          isBatting={true}
          delay={delay}
          outerContainer={{
            backgroundColor:
              selectedPalette.container.backgroundTransparent.strong,
          }}
          innerContainer={{
            backgroundColor:
              selectedPalette.container.backgroundTransparent.strong,
            borderBottom: "none",
          }}
        />
      )}

      {showBowling && (
        <StatSection
          players={bowlers}
          isBatting={false}
          delay={delay + 2}
          outerContainer={{
            backgroundColor:
              selectedPalette.container.backgroundTransparent.strong,
          }}
          innerContainer={{
            backgroundColor:
              selectedPalette.container.backgroundTransparent.strong,
            borderBottom: "none",
          }}
        />
      )}
    </div>
  );
};

export const PlayerStatsBrickWork: React.FC<PlayerStatsProps> = ({
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

  return (
    <AnimatedContainer
      type="full"
      className="w-full "
      backgroundColor="none"
      style={{
        /*  background: backgroundColor, */
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex w-full h-full gap-2 mt-2">
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
          className=""
          showBatting={awayShowBatting}
          showBowling={awayShowBowling}
        />
      </div>
    </AnimatedContainer>
  );
};

export default PlayerStatsBrickWork;
