import React from "react";
import { PlayerData, isBatter, isBowler } from "../types";

import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { Top5PlayerName } from "../../utils/primitives/Top5PlayerName";
import { Top5PlayerTeam } from "../../utils/primitives/Top5PlayerTeam";
import { Top5PlayerScore } from "../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../utils/primitives/Top5PlayerScoreSuffix";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { MetadataLarge } from "../../utils/primitives/metadataLarge";
import { stripGradeNumberFromTeamName } from "../../utils/utils-text";

interface PlayerRowLayoutProps {
  player: PlayerData;
  index: number;
  rowHeight: number;
  delay: number;
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

// --- Layout 1: Standard (Existing) ---
export const PlayerRowNameCNSW: React.FC<PlayerRowLayoutProps> = ({
  player,
  rowHeight,
  delay,
  index,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();
  /*   const { data } = useVideoDataContext();
  const { videoMeta } = data;
  const compositionId = videoMeta?.video?.metadata?.compositionId; */

  // Assuming text animations exist in context
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const dynamicBackground = selectedPalette.container.backgroundTransparent;
  // Determine background color
  const bgColor = dynamicBackground.high;
  const ScorebgColor = dynamicBackground.strong;
  // Get the appropriate score display based on player type
  const getScoreValues = () => {
    if (isBatter(player)) {
      // Main value is runs (with * for not out), suffix is only balls faced
      const mainValue = player.notOut ? `${player.runs}*` : `${player.runs}`;
      const suffix = player.balls > 0 ? `(${player.balls})` : "";
      return { mainValue, suffix };
    } else if (isBowler(player)) {
      // Main value is wickets-runs, suffix is overs
      const mainValue = `${player.wickets}/${player.runs}`;
      const suffix = `(${player.overs})`;
      return { mainValue, suffix };
    }

    // Fallback
    return { mainValue: "--", suffix: "" };
  };

  // Get truncated player name and team name
  const playerName = truncateText(player.name, 20).toUpperCase();
  const teamName = truncateText(player.playedFor, 35).toUpperCase();

  // Get score display values
  const { mainValue, suffix } = getScoreValues();

  return (
    <div
      className={`grid grid-cols-12  items-center h-full overflow-hidden ${layout.borderRadius.container}`}
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
      {/* Name & Team (col-span-4) */}
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

      {/* Stat (col-span-2) */}
      <div
        className="col-span-3 p-2 m-2 mr-6 flex items-center justify-center whitespace-nowrap leading-none px-0  h-auto"
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

export default PlayerRowNameCNSW; // Keep default export for compatibility if needed
