import React from "react";
import { Team } from "../../../types";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultPlayerName } from "../../../../utils/primitives/ResultPlayerName";
import { ResultPlayerScore } from "../../../../utils/primitives/ResultPlayerScore";

interface PlayerStatsProps {
  homeTeam: Team;
  awayTeam: Team;
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

  return (
    <div className="flex  flex-row  justify-between items-center py-1 px-2 bg-white/70 ">
      <div className="flex-4">
        <ResultPlayerName
          value={truncateText(playerName, 25)}
          variant={"#000"}
          animation={{
            ...TextAnimations.copyIn,
            delay: delay + 10 + index,
          }}
        />
      </div>
      <div
        className="p-2 flex-2 flex justify-end"
        style={{ background: backgroundColor }}
      >
        <ResultPlayerScore
          value={statValue}
          variant={textColor}
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
            textColor={textColor}
            backgroundColor={backgroundColor}
          />
        </div>
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
}

const TeamStats: React.FC<TeamStatsProps> = ({
  team,
  delay,
  maxPlayersPerStat,
  className = "",
}) => {
  const { selectedPalette } = useThemeContext();

  const batters = team.battingPerformances
    ? team.battingPerformances.slice(0, maxPlayersPerStat)
    : [];
  const bowlers = team.bowlingPerformances
    ? team.bowlingPerformances.slice(0, maxPlayersPerStat)
    : [];

  return (
    <div className={`flex-1 px-0 py-0 flex flex-col  ${className}`}>
      <StatSection
        players={batters}
        isBatting={true}
        delay={delay}
        backgroundColor={selectedPalette.container.main}
        textColor={"onContainerMain"}
      />

      <StatSection
        players={bowlers}
        isBatting={false}
        delay={delay + 2}
        backgroundColor={selectedPalette.container.secondary}
        textColor={"onContainerSecondary"}
      />
    </div>
  );
};

export const PlayerStatsBrickWork: React.FC<PlayerStatsProps> = ({
  homeTeam,
  awayTeam,
  height,
  delay,
  maxPlayersPerStat = 3,
}) => {
  const { animations } = useAnimationContext();

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
        />

        {/* Away team stats */}
        <TeamStats
          team={awayTeam}
          delay={delay}
          maxPlayersPerStat={maxPlayersPerStat}
          className=""
        />
      </div>
    </AnimatedContainer>
  );
};

export default PlayerStatsBrickWork;
