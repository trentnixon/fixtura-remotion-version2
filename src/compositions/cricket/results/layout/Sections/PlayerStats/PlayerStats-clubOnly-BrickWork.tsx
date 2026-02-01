import React from "react";
import { Team } from "../../../_types/types";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { computePartialTwoDayVisibility } from "./_utils/visibility";
import { ResultPlayerName } from "../../../../utils/primitives/ResultPlayerName";
import { ResultPlayerScore } from "../../../../utils/primitives/ResultPlayerScore";
import { getClubTeamPlayers } from "../../MatchCard/_utils/calculations";
import { PlayerStatsClubOnlyProps, StatItemProps, StatSectionProps, TeamStatsProps } from "./_types/PlayerStatsProps";
import { truncatePlayerName } from "./_utils/helpers";

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
      className="flex  flex-row  justify-between items-center py-1 px-2 mb-1"
      style={outerContainer}
    >
      <div className="flex-4">
        <ResultPlayerName
          value={truncatePlayerName(playerName, 20)}
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
    <div className={`${isBatting ? "mb-4" : "mb-1"} rounded-none  `}>
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
    <div className={`w-full px-0 py-0 flex flex-row gap-4 ${className}`}>
      {showBatting && (
        <div
          className="w-1/2"

        >
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
        </div>
      )}

      {showBowling && (
        <div
          className="w-1/2"

        >
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
        </div>
      )}
    </div>
  );
};

export const PlayerStatsClubOnlyBrickWork: React.FC<PlayerStatsClubOnlyProps> = ({
  match,
  height,
  delay,
  maxPlayersPerStat = 3,
  matchType,
  matchStatus,
}) => {
  const { animations } = useAnimationContext();

  // Get club team players
  const clubTeamPlayers = getClubTeamPlayers(match);

  // Determine which team is the club team
  const clubTeam = match.homeTeam.isClubTeam ? match.homeTeam : match.awayTeam.isClubTeam ? match.awayTeam : null;

  if (!clubTeamPlayers || !clubTeam) {
    return null; // Don't render if no club team found
  }

  // Create a club team object with only club team players
  const clubTeamWithFilteredPlayers: Team = {
    ...clubTeam,
    battingPerformances: clubTeamPlayers.battingPerformances,
    bowlingPerformances: clubTeamPlayers.bowlingPerformances,
  };

  // Determine visibility flags for club team
  const clubBatted = clubTeamPlayers.battingPerformances.length > 0;
  const { flags } = computePartialTwoDayVisibility({
    matchType,
    matchStatus,
    homeBatted: clubBatted,
    awayBatted: false, // Only showing club team
  });
  const { homeShowBatting, homeShowBowling } = flags;

  return (
    <AnimatedContainer
      type="full"
      className="w-full "
      backgroundColor="none"
      style={{
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex w-full h-full mt-2">
        <TeamStats
          team={clubTeamWithFilteredPlayers}
          delay={delay}
          maxPlayersPerStat={maxPlayersPerStat}
          showBatting={homeShowBatting}
          showBowling={homeShowBowling}
        />
      </div>
    </AnimatedContainer>
  );
};

export default PlayerStatsClubOnlyBrickWork;
