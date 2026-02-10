import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultPlayerName } from "../../../../utils/primitives/ResultPlayerName";
import { ResultPlayerScore } from "../../../../utils/primitives/ResultPlayerScore";
import { PlayerStatsSingleTeamProps } from "./_types/PlayerStatsProps";
import { truncatePlayerName } from "../../../../utils/utils-text";

/** Left cell: angle on the right. Right cell: angle on the left (mirror). */
const CLIP_LEFT = "polygon(0% 0%, 100% 0%, 96% 100%, 0% 100%)";
const CLIP_RIGHT = "polygon(4% 0%, 100% 0%, 100% 100%, 0% 100%)";
const MAX_NAME_LENGTH = 20;

type PlayerStat = {
  player: string;
  runs: number;
  balls?: number;
  notOut?: boolean;
  wickets?: number;
  overs?: number;
};

function formatBattingStat(p: PlayerStat): string {
  return `${p.runs}${p.notOut ? "*" : ""} (${p.balls ?? 0})`;
}

function formatBowlingStat(p: PlayerStat): string {
  return `${p.wickets ?? 0}/${p.runs} (${p.overs ?? 0})`;
}

/** One cell with angled polygon bg: name + stat (50% of row). Right cell uses mirrored clip (angle on left). */
const StatCell: React.FC<{
  playerName: string;
  statValue: string;
  delay: number;
  index: number;
  isRight: boolean;
}> = ({ playerName, statValue, delay, index, isRight }) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();
  const textAnimations = animations.text.main;
  const rowBg = selectedPalette.container.backgroundTransparent.high;

  return (
    <div
      className={`flex justify-between items-center flex-1 min-w-0 overflow-hidden py-2 ${isRight ? "pl-8 pr-2" : "pl-8 pr-8"}`}
      style={{
        backgroundColor: rowBg,
        clipPath: isRight ? CLIP_RIGHT : CLIP_LEFT,
      }}
    >
      <ResultPlayerName
        className="whitespace-nowrap truncate"
        value={truncatePlayerName(playerName, MAX_NAME_LENGTH)}
        variant="onContainerCopy"
        animation={{ ...textAnimations.copyIn, delay: delay + 10 + index * 5 }}
      />
      <ResultPlayerScore
        className="whitespace-nowrap"
        value={statValue}
        variant="onContainerCopy"
        animation={{ ...textAnimations.copyIn, delay: delay + 10 + index * 5 }}
      />
    </div>
  );
};

/** One row with 2 players, 50/50, each with its own angled polygon bg */
const StatsRow: React.FC<{
  players: PlayerStat[];
  isBatting: boolean;
  delay: number;
}> = ({ players, isBatting, delay }) => {
  const displayPlayers = [...players.slice(0, 2), ...Array(Math.max(0, 2 - players.length)).fill(null)].slice(0, 2) as (PlayerStat | null)[];
  const formatStat = isBatting ? formatBattingStat : formatBowlingStat;

  return (
    <div className="flex w-full relative">
      {displayPlayers[0] && (
        <StatCell
          playerName={displayPlayers[0].player}
          statValue={formatStat(displayPlayers[0])}
          delay={delay}
          index={0}
          isRight={false}
        />
      )}
      {displayPlayers[1] && (
        <StatCell
          playerName={displayPlayers[1].player}
          statValue={formatStat(displayPlayers[1])}
          delay={delay}
          index={1}
          isRight
        />
      )}
    </div>
  );
};

export const PlayerStatsSingleTeamOnlyMudgeerabaClubOnly: React.FC<PlayerStatsSingleTeamProps> = ({
  Team,
  delay,
  maxPlayersPerStat = 2,
  showBatting = true,
  showBowling = true,
}) => {
  const { animations } = useAnimationContext();
  const batters = (Team.battingPerformances ?? []).slice(0, maxPlayersPerStat);
  const bowlers = (Team.bowlingPerformances ?? []).slice(0, maxPlayersPerStat);

  return (
    <AnimatedContainer
      type="full"
      className="w-full relative my-4 mx-4"
      backgroundColor="none"
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex w-full h-full relative flex-col gap-4">
        {showBatting && (
          <StatsRow players={batters} isBatting delay={delay} />
        )}
        {showBowling && (
          <StatsRow players={bowlers} isBatting={false} delay={delay + 5} />
        )}
      </div>
    </AnimatedContainer>
  );
};

export default PlayerStatsSingleTeamOnlyMudgeerabaClubOnly;
