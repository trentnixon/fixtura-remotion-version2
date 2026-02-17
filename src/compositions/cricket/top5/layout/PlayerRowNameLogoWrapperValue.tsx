import React from "react";
import { TeamLogo as Top5TeamLogoType } from "../_types/types";
import { TeamLogo } from "../../utils/primitives/TeamLogo";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { Top5PlayerName } from "../../utils/primitives/Top5PlayerName";
import { Top5PlayerTeam } from "../../utils/primitives/Top5PlayerTeam";
import { Top5PlayerScore } from "../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../utils/primitives/Top5PlayerScoreSuffix";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { PlayerRowLayoutPropsWithRestrictions } from "./_types/PlayerRowLayoutProps";
import { truncateText } from "./_utils/helpers";
import { getScoreValues } from "./_utils/scoreHelpers";
import {
  SMALL_LOGO_SIZE,
  PLAYER_NAME_DELAY_OFFSET,
  TEAM_NAME_DELAY_OFFSET,
  LOGO_DELAY_OFFSET,
  STAT_DELAY_OFFSET,
  STAT_SUFFIX_DELAY_OFFSET,
} from "./_utils/constants";

// --- Layout 1: Standard (Existing) ---
export const PlayerRowNameLogoWrapperValue: React.FC<PlayerRowLayoutPropsWithRestrictions> = ({
  player,
  index,
  rowHeight,
  delay,
  restrictions,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();
  /*   const { data } = useVideoDataContext();
  const { videoMeta } = data;
  const compositionId = videoMeta?.video?.metadata?.compositionId; */

  // Assuming text animations exist in context
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  // Determine background color
  const isTopPlayer = index === 0;
  const bgColor = isTopPlayer
    ? selectedPalette.container.backgroundTransparent.strong
    : selectedPalette.container.backgroundTransparent.medium;

  const LogoBG = isTopPlayer
    ? selectedPalette.container.backgroundTransparent.strong
    : selectedPalette.container.backgroundTransparent.medium;

  const contrastBG = selectedPalette.container.backgroundTransparent.strong;

  // Get truncated player name and team name
  const playerName = truncateText(
    player.name,
    restrictions.nameLength,
  ).toUpperCase();
  const teamName = truncateText(
    player.playedFor,
    restrictions.teamLength,
  ).toUpperCase();

  // Get score display values
  const { mainValue, suffix } = getScoreValues(player);

  return (
    <div
      className="grid grid-cols-12 items-center h-full overflow-hidden rounded-none"
      style={{
        height: `${rowHeight}px`,
        background: bgColor,
      }}
    >
      {/* Name & Team (col-span-4) */}
      <div className="col-span-7 flex flex-col justify-center px-2 h-full">
        <Top5PlayerName
          value={playerName}
          animation={{ ...largeTextAnimation, delay: delay + PLAYER_NAME_DELAY_OFFSET }}
          className=""
        />
        <Top5PlayerTeam
          value={teamName}
          animation={{ ...smallTextAnimation, delay: delay + TEAM_NAME_DELAY_OFFSET }}
          className=""
        />
      </div>

      {/* Logo (col-span-2) */}
      <div
        className="col-span-2 flex items-center justify-center h-full"
        style={{ background: contrastBG }}
      >
        <div className="w-30 h-30 overflow-hidden">
          <TeamLogo
            logo={player.teamLogo as Top5TeamLogoType}
            teamName={player.playedFor}
            delay={delay + LOGO_DELAY_OFFSET}
            size={SMALL_LOGO_SIZE}
          />
        </div>
      </div>

      {/* Stat (col-span-2) */}
      <div
        className="col-span-3 flex items-center justify-center whitespace-nowrap leading-none px-4  h-full"
        style={{ background: LogoBG }}
      >
        <Top5PlayerScore
          value={mainValue}
          animation={{ ...largeTextAnimation, delay: delay + STAT_DELAY_OFFSET }}
          className=""
          variant="onContainerCopy"
        />
        {suffix && (
          <Top5PlayerScoreSuffix
            value={suffix}
            animation={{ ...smallTextAnimation, delay: delay + STAT_SUFFIX_DELAY_OFFSET }}
            className=""
            variant="onContainerCopy"
          />
        )}
      </div>
    </div>
  );
};

export default PlayerRowNameLogoWrapperValue; // Keep default export for compatibility if needed
