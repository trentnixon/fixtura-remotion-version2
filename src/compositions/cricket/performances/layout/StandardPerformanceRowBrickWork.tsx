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

// --- Layout: BrickWork (Name, Logo, Wrapper, Value) ---
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

  // Format player name as "First Initial. Last Name"
  const playerName = formatPlayerName(performance.name);
  // Get truncated team name
  const teamName = truncateText(
    performance.playedFor,
    restrictions.teamLength,
  ).toUpperCase();

  // Get score display values
  const { mainValue, suffix } = getScoreValues(performance);

  return (
    <div
      className="grid grid-cols-12 p-0 px-2 items-center h-full overflow-hidden rounded-none"
      style={{
        background: bgColor,
        height: `${rowHeight}px`,
      }}
    >
      {/* Name & Team (col-span-7) */}
      <div className="col-span-7 flex flex-col justify-center px-1 ">
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
            size={30} // smaller size to avoid pushing row height
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
          animation={{ ...largeTextAnimation, delay: delay + 20 }}
          className=""
          variant="onContainerCopy"
        />
        {suffix && (
          <Top5PlayerScoreSuffix
            value={suffix}
            animation={{ ...smallTextAnimation, delay: delay + 30 }}
            className=""
            variant="onContainerCopy"
          />
        )}
      </div>
    </div>
  );
};

export default StandardPerformanceRowBrickWork;
