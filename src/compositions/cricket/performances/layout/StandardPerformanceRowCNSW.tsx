import React from "react";
import {
  PerformanceData,
  isBattingPerformance,
  isBowlingPerformance,
} from "../types";

import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { Top5PlayerName } from "../../utils/primitives/Top5PlayerName";
import { Top5PlayerTeam } from "../../utils/primitives/Top5PlayerTeam";
import { Top5PlayerScore } from "../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../utils/primitives/Top5PlayerScoreSuffix";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { MetadataLarge } from "../../utils/primitives/metadataLarge";
import { stripGradeNumberFromTeamName } from "../../utils/utils-text";

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

// --- Layout: CNSW ---
export const StandardPerformanceRowCNSW: React.FC<
  PerformanceRowLayoutProps
> = ({ performance, rowHeight, delay, index }) => {
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();

  // Assuming text animations exist in context
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const dynamicBackground = selectedPalette.container.backgroundTransparent;
  // Determine background color
  const bgColor = dynamicBackground.high;
  const ScorebgColor = dynamicBackground.strong;

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
      <div className="col-span-1 flex items-center justify-center h-full">
        <MetadataLarge
          value={`${index + 1}`}
          animation={{ ...largeTextAnimation, delay: delay + 2 }}
          className=""
        />
      </div>
      {/* Name & Team (col-span-8) */}
      <div className="col-span-8 flex flex-col justify-center p-0 m-0 h-full">
        <Top5PlayerName
          value={playerName}
          animation={{ ...largeTextAnimation, delay: delay + 2 }}
          className=""
        />
        <Top5PlayerTeam
          value={stripGradeNumberFromTeamName(teamName)}
          animation={{ ...smallTextAnimation, delay: delay + 4 }}
          className=""
        />
      </div>

      {/* Stat (col-span-3) */}
      <div
        className="col-span-3 p-2 m-2 mr-6 flex items-center justify-center whitespace-nowrap leading-none px-0 h-auto"
        style={{ background: ScorebgColor }}
      >
        <Top5PlayerScore
          value={mainValue}
          animation={{ ...largeTextAnimation, delay: delay + 20 }}
          className="font-bold"
        />
        {suffix && (
          <Top5PlayerScoreSuffix
            value={suffix}
            animation={{ ...smallTextAnimation, delay: delay + 30 }}
            className="font-bold"
          />
        )}
      </div>
    </div>
  );
};

export default StandardPerformanceRowCNSW;
