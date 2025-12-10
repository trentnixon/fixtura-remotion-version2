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
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

// --- Layout: ClassicTwoColumn ---
export const StandardPerformanceRowClassicTwoColumn: React.FC<
  PerformanceRowLayoutProps
> = ({ performance, rowHeight, delay }) => {
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();

  // Assuming text animations exist in context
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  // Determine background color
  const bgColor = selectedPalette.container.backgroundTransparent.strong;

  const LogoBG = selectedPalette.container.primary;

  const contrastBG = selectedPalette.container.backgroundTransparent.strong;

  // Get the appropriate score display based on performance type
  const getScoreValues = () => {
    if (isBattingPerformance(performance)) {
      // Main value is runs (with * for not out), suffix is only balls faced
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
  const playerName = truncateText(performance.name, 20).toUpperCase();
  const teamName = truncateText(performance.playedFor, 35).toUpperCase();

  // Get score display values
  const { mainValue, suffix } = getScoreValues();

  return (
    <div
      className={`grid grid-cols-12 items-center h-full overflow-hidden ${layout.borderRadius.container}`}
      style={{
        height: `${rowHeight}px`,
        background: bgColor,
      }}
    >
      {/* Name & Team (col-span-7) */}
      <div className="col-span-7 flex flex-col justify-center px-2 h-full">
        <Top5PlayerName
          value={playerName}
          animation={{ ...largeTextAnimation, delay: delay + 2 }}
          className=""
        />
        <Top5PlayerTeam
          value={teamName}
          animation={{ ...smallTextAnimation, delay: delay + 4 }}
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
            logo={performance.teamLogo as PerformanceTeamLogoType}
            teamName={performance.playedFor}
            delay={delay + 20}
            size={20} // smaller size to avoid pushing row height
          />
        </div>
      </div>

      {/* Stat (col-span-3) */}
      <div
        className="col-span-3 flex items-center justify-center whitespace-nowrap leading-none px-0 h-full"
        style={{ background: LogoBG }}
      >
        <Top5PlayerScore
          value={mainValue}
          animation={{ ...largeTextAnimation, delay: delay + 20 }}
          className=""
          variant="onContainerTitle"
        />
        {suffix && (
          <Top5PlayerScoreSuffix
            value={suffix}
            animation={{ ...smallTextAnimation, delay: delay + 30 }}
            className=""
            variant="onContainerTitle"
          />
        )}
      </div>
    </div>
  );
};

export default StandardPerformanceRowClassicTwoColumn;
