import React from "react";
import { TeamLogo as PerformanceTeamLogoType } from "../_types/types";
import { TeamLogo } from "../../utils/primitives/TeamLogo";

import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { Top5PlayerName } from "../../utils/primitives/Top5PlayerName";
import { Top5PlayerTeam } from "../../utils/primitives/Top5PlayerTeam";
import { Top5PlayerScore } from "../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../utils/primitives/Top5PlayerScoreSuffix";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { PerformanceRowLayoutPropsWithRestrictions } from "./_types/PerformanceRowLayoutProps";
import { truncateText, getScoreValues } from "./_utils/helpers";
import {
  SMALL_LOGO_SIZE,
  PLAYER_NAME_DELAY_OFFSET,
  TEAM_NAME_DELAY_OFFSET,
  LOGO_DELAY_OFFSET,
  STAT_DELAY_OFFSET,
  STAT_SUFFIX_DELAY_OFFSET,
} from "./_utils/constants";

// --- Layout: BrickWork (Name, Logo, Wrapper, Value) - matches Top 5 ---
export const StandardPerformanceRowBrickWork: React.FC<
  PerformanceRowLayoutPropsWithRestrictions
> = ({ performance, index, rowHeight, delay, restrictions }) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();

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

  // Match Top 5: truncated names in uppercase
  const playerName = truncateText(
    performance.name,
    restrictions.nameLength,
  ).toUpperCase();
  const teamName = truncateText(
    performance.playedFor,
    restrictions.teamLength,
  ).toUpperCase();

  // Get score display values
  const { mainValue, suffix } = getScoreValues(performance);

  return (
    <div
      className="grid grid-cols-12 items-center h-full overflow-hidden rounded-none"
      style={{
        background: bgColor,
        height: `${rowHeight}px`,
      }}
    >
      {/* Name & Team (col-span-7) - matches Top 5 layout */}
      <div className="col-span-7 flex flex-col justify-center px-2 h-full">
        <Top5PlayerName
          value={playerName}
          animation={{ ...largeTextAnimation, delay: delay + PLAYER_NAME_DELAY_OFFSET }}
          className=""
          variant="onContainerCopy"
        />
        <Top5PlayerTeam
          value={teamName}
          animation={{ ...smallTextAnimation, delay: delay + TEAM_NAME_DELAY_OFFSET }}
          className=""
          variant="onContainerCopy"
        />
      </div>

      {/* Logo (col-span-2) - matches Top 5: fill container, proper scaling */}
      <div
        className="col-span-2 flex items-center justify-center h-full"
        style={{ background: contrastBG }}
      >
        <div className="w-30 h-30 overflow-hidden flex items-center justify-center">
          <TeamLogo
            logo={performance.teamLogo as PerformanceTeamLogoType}
            teamName={performance.playedFor}
            delay={delay + LOGO_DELAY_OFFSET}
            size={SMALL_LOGO_SIZE}
            fit="contain"
            imgStyle={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Stat (col-span-3) */}
      <div
        className="col-span-3 flex items-center justify-center whitespace-nowrap leading-none px-4 h-full"
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

export default StandardPerformanceRowBrickWork;
