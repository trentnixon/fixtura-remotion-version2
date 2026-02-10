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
  DEFAULT_LOGO_SIZE,
  PLAYER_NAME_DELAY_OFFSET,
  TEAM_NAME_DELAY_OFFSET,
  MAIN_SCORE_DELAY_OFFSET,
  SCORE_SUFFIX_DELAY_OFFSET,
} from "./_utils/constants";

// --- Layout 1: Standard (Existing) ---
export const StandardPlayerRow: React.FC<PlayerRowLayoutPropsWithRestrictions> = ({
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

  const logoSize = DEFAULT_LOGO_SIZE;

  // Determine background color
  const isTopPlayer = index === 0;
  const bgColor = isTopPlayer
    ? selectedPalette.container.backgroundTransparent.high
    : selectedPalette.container.backgroundTransparent.medium;

  const LogoBG = isTopPlayer
    ? selectedPalette.container.transparentSecondary
    : selectedPalette.container.backgroundTransparent.strong;

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
      className="flex items-stretch h-full overflow-hidden rounded-lg"
      style={{ height: `${rowHeight}px` }}
    >
      {/* Logo Section (Fixed Width) */}
      <div
        className="w-30 bg-white flex items-center justify-center p-1 shrink-0"
        style={{
          background: LogoBG,
        }}
      >
        <TeamLogo
          logo={player.teamLogo as Top5TeamLogoType}
          teamName={player.playedFor}
          delay={delay} // Animate logo first
          size={logoSize}
        />
      </div>

      {/* Content Section (Variable Width) */}
      <div
        className={`flex-grow flex items-center justify-between px-4 `}
        style={{
          background: bgColor,
        }}
      >
        {/* Left Side: Name & Team */}
        <div className="flex flex-col justify-center">
          {/* Player Name */}
          <Top5PlayerName
            value={playerName} // Truncated and uppercase name
            animation={{ ...largeTextAnimation, delay: delay + PLAYER_NAME_DELAY_OFFSET }}
            className=""
          />
          {/* Team Name */}
          <Top5PlayerTeam
            value={teamName} // Truncated and uppercase team
            animation={{ ...smallTextAnimation, delay: delay + TEAM_NAME_DELAY_OFFSET }}
            className=""
          />
        </div>

        {/* Right Side: Score */}
        <div className="flex items-center justify-center whitespace-nowrap leading-none">
          {/* Main score value */}
          <Top5PlayerScore
            value={mainValue}
            animation={{ ...largeTextAnimation, delay: delay + MAIN_SCORE_DELAY_OFFSET }}
            className=""
          />

          {/* Score suffix (balls or overs) */}
          {suffix && (
            <Top5PlayerScoreSuffix
              value={suffix}
              animation={{ ...smallTextAnimation, delay: delay + SCORE_SUFFIX_DELAY_OFFSET }}
              className=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Export all layouts
export default StandardPlayerRow; // Keep default export for compatibility if needed
