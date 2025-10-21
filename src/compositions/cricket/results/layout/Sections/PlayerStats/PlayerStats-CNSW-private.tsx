import React from "react";
import { Team } from "../../../types";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { computePartialTwoDayVisibility } from "./utils";
import { ResultPlayerName } from "../../../../utils/primitives/ResultPlayerName";
import { ResultPlayerScore } from "../../../../utils/primitives/ResultPlayerScore";

interface PlayerStatsProps {
  homeTeam: Team;
  awayTeam: Team;
  height: number;
  delay: number;
  maxPlayersPerStat?: number;
  matchType?: string;
  matchStatus?: string;
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
}

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
        background: selectedPalette.background.userSecondary,
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
          background: selectedPalette.background.userPrimary,
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
    <div className={`flex-1 px-2 py-0 flex flex-col ${className}`}>
      {showBatting && (
        <StatSection
          players={batters}
          isBatting={true}
          delay={delay}
          backgroundColor={selectedPalette.background.userSecondary}
          textColor={"onBackgroundMain"}
        />
      )}

      {showBowling && (
        <StatSection
          players={bowlers}
          isBatting={false}
          delay={delay + 2}
          backgroundColor={selectedPalette.background.userSecondary}
          textColor={"onBackgroundMain"}
        />
      )}
    </div>
  );
};

export const PlayerStatsCNSWPrivate: React.FC<PlayerStatsProps> = ({
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

export default PlayerStatsCNSWPrivate;
