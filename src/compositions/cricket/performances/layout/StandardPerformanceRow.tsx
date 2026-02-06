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
import { truncateText, getScoreValues, formatPlayerName } from "./_utils/helpers";

// --- Layout: Standard Performance Row ---
export const StandardPerformanceRow: React.FC<
  PerformanceRowLayoutPropsWithRestrictions
> = ({ performance, index, rowHeight, delay, restrictions }) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();

  // Assuming text animations exist in context
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const logoSize = 40; // h-16 w-16

  // Determine background color
  const isTopPerformance = index === 0;
  const bgColor = isTopPerformance
    ? selectedPalette.container.backgroundTransparent.high
    : selectedPalette.container.backgroundTransparent.medium;

  /*   const LogoBG = isTopPerformance
    ? selectedPalette.container.transparentSecondary
    : selectedPalette.container.backgroundTransparent.strong; */

  // Format player name as "First Initial. Last Name"
  const playerName = formatPlayerName(performance.name);
  const teamName = truncateText(
    performance.playedFor,
    restrictions.teamLength,
  ).toUpperCase();

  // Get score display values
  const { mainValue, suffix } = getScoreValues(performance);

  return (
    <div
      className="flex items-stretch h-full w-full overflow-hidden rounded-lg"
      style={{ height: `${rowHeight}px`, width: "100%" }}
    >
      {/* Logo Section (Fixed Width) */}
      <div className="w-30 bg-white flex items-center justify-center p-0 shrink-0">
        <TeamLogo
          logo={performance.teamLogo as PerformanceTeamLogoType}
          teamName={performance.playedFor}
          delay={delay} // Animate logo first
          size={logoSize}
        />
      </div>

      {/* Content Section (Variable Width) */}
      <div
        className={`flex-grow flex items-center justify-between gap-8 px-2 `}
        style={{
          background: bgColor,
        }}
      >
        {/* Left Side: Name & Team */}
        <div className="flex flex-col justify-start">
          {/* Player Name */}
          <Top5PlayerName
            value={playerName} // Formatted as "First Initial. Last Name"
            animation={{ ...largeTextAnimation, delay: delay + 2 }}
            className=""
          />
          {/* Team Name */}
          <Top5PlayerTeam
            value={teamName} // Truncated and uppercase team
            animation={{ ...smallTextAnimation, delay: delay + 4 }}
            className=""
          />
        </div>

        {/* Right Side: Score */}
        <div className="flex items-center justify-end whitespace-nowrap leading-none ml-auto">
          {/* Main score value */}
          <Top5PlayerScore
            value={mainValue}
            animation={{ ...largeTextAnimation, delay: delay + 6 }}
            className=""
          />

          {/* Score suffix (balls or overs) */}
          {suffix && (
            <Top5PlayerScoreSuffix
              value={suffix}
              animation={{ ...smallTextAnimation, delay: delay + 7 }}
              className=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Export default for compatibility
export default StandardPerformanceRow;
