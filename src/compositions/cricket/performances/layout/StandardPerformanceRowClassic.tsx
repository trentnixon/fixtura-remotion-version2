import React from "react";
import { TeamLogo as PerformanceTeamLogoType } from "../_types/types";
import { TeamLogo } from "../../utils/primitives/TeamLogo";

import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { Top5PlayerName } from "../../utils/primitives/Top5PlayerName";
import { Top5PlayerTeam } from "../../utils/primitives/Top5PlayerTeam";
import { Top5PlayerScore } from "../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../utils/primitives/Top5PlayerScoreSuffix";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { PerformanceRowLayoutProps } from "./_types/PerformanceRowLayoutProps";
import {
  truncateText,
  getScoreValues,
  formatPlayerName,
} from "./_utils/helpers";
import {
  ClassicForegroundShell,
  ClassicStatWell,
} from "../../../../templates/variants/classic/design";

export const StandardPerformanceRowClassic: React.FC<
  PerformanceRowLayoutProps
> = ({ performance, rowHeight, delay }) => {
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();

  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const playerName = formatPlayerName(performance.name);
  const teamName = truncateText(performance.playedFor, 35).toUpperCase();
  const { mainValue, suffix } = getScoreValues(performance);

  return (
    <ClassicForegroundShell
      height={rowHeight}
      delay={delay}
      depth="compact"
    >
      <div
        className={`grid grid-cols-12 items-center overflow-hidden h-full ${layout.borderRadius.container}`}
      >
        <div className="relative z-10 col-span-7 flex flex-col justify-center px-2">
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

        <div className="col-span-2 flex h-full w-full items-center justify-center overflow-hidden p-2">
          <TeamLogo
            logo={performance.teamLogo as PerformanceTeamLogoType}
            teamName={performance.playedFor}
            delay={delay + 20}
            size={20}
          />
        </div>

        <ClassicStatWell
          variant="recessed"
          width="compact"
          className="col-span-3"
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
        </ClassicStatWell>
      </div>
    </ClassicForegroundShell>
  );
};

export default StandardPerformanceRowClassic;
