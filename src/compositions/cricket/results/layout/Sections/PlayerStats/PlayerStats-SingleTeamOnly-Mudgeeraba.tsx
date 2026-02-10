import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultPlayerName } from "../../../../utils/primitives/ResultPlayerName";
import { ResultPlayerScore } from "../../../../utils/primitives/ResultPlayerScore";
import { PlayerStatsSingleTeamProps } from "./_types/PlayerStatsProps";
import { truncatePlayerName } from "../../../../utils/utils-text";

const CLIP_LEFT_COLUMN = "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)";
const CLIP_RIGHT_COLUMN = "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)";
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

const PlayerStatRow: React.FC<{
  playerName: string;
  statValue: string;
  delay: number;
  index: number;
  isLeftColumn: boolean;
}> = ({ playerName, statValue, delay, index, isLeftColumn }) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();
  const textAnimations = animations.text.main;
  const rowBg = selectedPalette.container.backgroundTransparent.high;

  return (
    <div
      className={`flex justify-between items-center py-2 relative overflow-hidden ${isLeftColumn ? "pl-4 pr-10" : "pl-12 pr-3"}`}
      style={{
        backgroundColor: rowBg,
        clipPath: isLeftColumn ? CLIP_LEFT_COLUMN : CLIP_RIGHT_COLUMN,
      }}
    >
      <ResultPlayerName
        className="whitespace-nowrap"
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

const StatsColumn: React.FC<{
  players: PlayerStat[];
  isBatting: boolean;
  delay: number;
  isLeftColumn: boolean;
}> = ({ players, isBatting, delay, isLeftColumn }) => {
  const displayPlayers = [...players.slice(0, 2), ...Array(Math.max(0, 2 - players.length)).fill(null)].slice(0, 2) as (PlayerStat | null)[];
  const formatStat = isBatting ? formatBattingStat : formatBowlingStat;

  return (
    <div className="flex flex-col flex-1 gap-4  ">
      {displayPlayers[0] && (
        <PlayerStatRow
          playerName={displayPlayers[0].player}
          statValue={formatStat(displayPlayers[0])}
          delay={delay}
          index={0}
          isLeftColumn={isLeftColumn}
        />
      )}
      {displayPlayers[1] && (
        <PlayerStatRow
          playerName={displayPlayers[1].player}
          statValue={formatStat(displayPlayers[1])}
          delay={delay}
          index={1}
          isLeftColumn={isLeftColumn}
        />
      )}
    </div>
  );
};

export const PlayerStatsSingleTeamOnlyMudgeeraba: React.FC<PlayerStatsSingleTeamProps> = ({
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
      <div className="flex w-full h-full relative flex-col">
        <div className="flex w-full relative">
          {showBatting && (
            <StatsColumn
              players={batters}
              isBatting
              delay={delay}
              isLeftColumn
            />
          )}
          {showBowling && (
            <StatsColumn
              players={bowlers}
              isBatting={false}
              delay={delay + 5}
              isLeftColumn={false}
            />
          )}
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default PlayerStatsSingleTeamOnlyMudgeeraba;
