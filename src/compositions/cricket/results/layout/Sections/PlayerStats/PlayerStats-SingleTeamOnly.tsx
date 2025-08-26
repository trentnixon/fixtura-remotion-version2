import React from "react";
import { Team } from "../../../types";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultPlayerName } from "../../../../utils/primitives/ResultPlayerName";
import { ResultPlayerScore } from "../../../../utils/primitives/ResultPlayerScore";

interface PlayerStatsProps {
  Team: Team;
  height: number;
  delay: number;
  maxPlayersPerStat?: number;
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

// Component for a single stat item (batter or bowler)
interface StatItemProps {
  playerName: string;
  statValue: string;
  delay: number;
  index: number;
  textColor: string;
  backgroundColor: string;
}

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

type PlayerStat = {
  player: string;
  runs: number;
  balls?: number;
  notOut?: boolean;
  wickets?: number;
  overs?: number;
};

// Component for a section of stats (batting or bowling)
interface StatSectionProps {
  players: PlayerStat[];
  isBatting: boolean;
  delay: number;
  backgroundColor: string;
  textColor: string;
}

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

// Component for a team's stats (both batting and bowling)
interface TeamStatsProps {
  team: Team;
  delay: number;
  maxPlayersPerStat: number;
  className?: string;
  showBatting?: boolean;
  showBowling?: boolean;
}

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
    <div className={`flex-1 px-2 py-0 grid grid-cols-2 gap-4 ${className}`}>
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

export const PlayerStatsSingleTeamOnly: React.FC<PlayerStatsProps> = ({
  Team,
  height,
  delay,
  maxPlayersPerStat = 3,
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
        />
      </div>
    </AnimatedContainer>
  );
};

export default PlayerStatsSingleTeamOnly;
