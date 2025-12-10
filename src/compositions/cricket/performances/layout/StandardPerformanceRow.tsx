import React from "react";
import {
  PerformanceData,
  TeamLogo as PerformanceTeamLogoType,
  isBattingPerformance,
  isBowlingPerformance,
} from "../types";
import { TeamLogo } from "../../utils/primitives/TeamLogo";

import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { Top5PlayerName } from "../../utils/primitives/Top5PlayerName";
import { Top5PlayerTeam } from "../../utils/primitives/Top5PlayerTeam";
import { Top5PlayerScore } from "../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../utils/primitives/Top5PlayerScoreSuffix";
import { useThemeContext } from "../../../../core/context/ThemeContext";

interface PerformanceRowLayoutProps {
  performance: PerformanceData;
  index: number;
  rowHeight: number;
  delay: number;
  restrictions: { nameLength: number; teamLength: number };
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

// --- Layout: Standard Performance Row ---
export const StandardPerformanceRow: React.FC<PerformanceRowLayoutProps> = ({
  performance,
  index,
  rowHeight,
  delay,
  restrictions,
}) => {
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

  const LogoBG = isTopPerformance
    ? selectedPalette.container.transparentSecondary
    : selectedPalette.container.backgroundTransparent.strong;

  // Get the appropriate score display based on performance type
  const getScoreValues = () => {
    if (isBattingPerformance(performance)) {
      // Main value is runs (with * for not out), suffix is balls faced
      const mainValue = performance.notOut
        ? `${performance.runs}*`
        : `${performance.runs}`;
      const suffix = performance.balls > 0 ? `(${performance.balls})` : "";
      return { mainValue, suffix };
    } else if (isBowlingPerformance(performance)) {
      // Main value is wickets-runs, suffix is overs
      const mainValue = `${performance.wickets}/${performance.runs}`;
      const suffix = `(${performance.overs})`;
      return { mainValue, suffix };
    }

    // Fallback
    return { mainValue: "--", suffix: "" };
  };

  // Get truncated player name and team name
  const playerName = truncateText(
    performance.name,
    restrictions.nameLength,
  ).toUpperCase();
  const teamName = truncateText(
    performance.playedFor,
    restrictions.teamLength,
  ).toUpperCase();

  // Get score display values
  const { mainValue, suffix } = getScoreValues();

  return (
    <div
      className="flex items-stretch h-full w-full overflow-hidden rounded-lg"
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
            value={playerName} // Truncated and uppercase name
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
