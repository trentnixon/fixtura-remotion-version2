import React from "react";
import { TeamLogo as Top5TeamLogoType } from "../_types/types";
import { TeamLogo } from "../../utils/primitives/TeamLogo";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { Top5PlayerName } from "../../utils/primitives/Top5PlayerName";
import { Top5PlayerTeam } from "../../utils/primitives/Top5PlayerTeam";
import { Top5PlayerScore } from "../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../utils/primitives/Top5PlayerScoreSuffix";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { PlayerRowLayoutProps } from "./_types/PlayerRowLayoutProps";
import { truncateText } from "./_utils/helpers";
import { getScoreValues } from "./_utils/scoreHelpers";
import {
  SMALL_LOGO_SIZE,
  DEFAULT_NAME_LENGTH,
  DEFAULT_TEAM_LENGTH,
  PLAYER_NAME_DELAY_OFFSET,
  TEAM_NAME_DELAY_OFFSET,
  STAT_DELAY_OFFSET,
  STAT_SUFFIX_DELAY_OFFSET,
  LOGO_DELAY_OFFSET,
} from "./_utils/constants";
import {
  ClassicForegroundShell,
  ClassicStatWell,
} from "../../../../templates/variants/classic/design";

export const PlayerRowNameClassic: React.FC<PlayerRowLayoutProps> = ({
  player,
  rowHeight,
  delay,
}) => {
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();

  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const playerName = truncateText(
    player.name,
    DEFAULT_NAME_LENGTH,
  ).toUpperCase();
  const teamName = truncateText(
    player.playedFor,
    DEFAULT_TEAM_LENGTH,
  ).toUpperCase();
  const { mainValue, suffix } = getScoreValues(player);

  return (
    <ClassicForegroundShell
      height={rowHeight}
      delay={delay}
      depth="compact"
    >
      <div
        className={`grid grid-cols-12 items-center overflow-hidden h-full ${layout.borderRadius.container}`}
      >
        <div className="relative z-10 col-span-7 flex flex-col justify-center px-2 h-full">
          <Top5PlayerName
            value={playerName}
            animation={{
              ...largeTextAnimation,
              delay: delay + PLAYER_NAME_DELAY_OFFSET,
            }}
            className=""
          />
          <Top5PlayerTeam
            value={teamName}
            animation={{
              ...smallTextAnimation,
              delay: delay + TEAM_NAME_DELAY_OFFSET,
            }}
            className=""
          />
        </div>

        <div className="col-span-2 flex h-full w-full items-center justify-center overflow-hidden p-2">
          <TeamLogo
            logo={player.teamLogo as Top5TeamLogoType}
            teamName={player.playedFor}
            delay={delay + LOGO_DELAY_OFFSET}
            size={SMALL_LOGO_SIZE}
          />
        </div>

        <ClassicStatWell
          variant="recessed"
          width="compact"
          className="col-span-3"
        >
          <Top5PlayerScore
            value={mainValue}
            animation={{
              ...largeTextAnimation,
              delay: delay + STAT_DELAY_OFFSET,
            }}
            className=""
            variant="onContainerTitle"
          />
          {suffix && (
            <Top5PlayerScoreSuffix
              value={suffix}
              animation={{
                ...smallTextAnimation,
                delay: delay + STAT_SUFFIX_DELAY_OFFSET,
              }}
              className=""
              variant="onContainerTitle"
            />
          )}
        </ClassicStatWell>
      </div>
    </ClassicForegroundShell>
  );
};

export default PlayerRowNameClassic;
