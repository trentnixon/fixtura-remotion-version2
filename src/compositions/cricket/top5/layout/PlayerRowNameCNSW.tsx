import React from "react";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { Top5PlayerName } from "../../utils/primitives/Top5PlayerName";
import { Top5PlayerTeam } from "../../utils/primitives/Top5PlayerTeam";
import { Top5PlayerScore } from "../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../utils/primitives/Top5PlayerScoreSuffix";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { MetadataLarge } from "../../utils/primitives/metadataLarge";
import { stripGradeNumberFromTeamName } from "../../utils/utils-text";
import { PlayerRowLayoutProps } from "./_types/PlayerRowLayoutProps";
import { truncateText } from "./_utils/helpers";
import { getScoreValues } from "./_utils/scoreHelpers";
import {
  DEFAULT_NAME_LENGTH,
  DEFAULT_TEAM_LENGTH,
  PLAYER_NAME_DELAY_OFFSET,
  TEAM_NAME_DELAY_OFFSET,
  STAT_DELAY_OFFSET,
  STAT_SUFFIX_DELAY_OFFSET,
} from "./_utils/constants";

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

  // Get truncated player name and team name
  const playerName = truncateText(player.name, DEFAULT_NAME_LENGTH).toUpperCase();
  const teamName = truncateText(player.playedFor, DEFAULT_TEAM_LENGTH).toUpperCase();

  // Get score display values
  const { mainValue, suffix } = getScoreValues(player);

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
          animation={{ ...largeTextAnimation, delay: delay + PLAYER_NAME_DELAY_OFFSET }}
          className=""
        />
      </div>
      {/* Name & Team (col-span-4) */}
      <div className="col-span-8 flex flex-col justify-center p-0 m-0 h-full">
        <Top5PlayerName
          value={playerName}
          animation={{ ...largeTextAnimation, delay: delay + PLAYER_NAME_DELAY_OFFSET }}
          className=""
        />
        <Top5PlayerTeam
          value={stripGradeNumberFromTeamName(teamName)}
          animation={{ ...smallTextAnimation, delay: delay + TEAM_NAME_DELAY_OFFSET }}
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
          animation={{ ...largeTextAnimation, delay: delay + STAT_DELAY_OFFSET }}
          className="font-bold"
        />
        {suffix && (
          <Top5PlayerScoreSuffix
            value={suffix}
            animation={{ ...smallTextAnimation, delay: delay + STAT_SUFFIX_DELAY_OFFSET }}
            className="font-bold"
          />
        )}
      </div>
    </div>
  );
};

export default PlayerRowNameCNSW; // Keep default export for compatibility if needed
