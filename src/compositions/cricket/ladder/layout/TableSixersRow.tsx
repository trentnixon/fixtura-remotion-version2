import React from "react";

import TeamLogo from "../../utils/primitives/TeamLogo";
import LadderTeamName from "../../utils/primitives/ladderTeamName";
import LadderTeamPoints from "../../utils/primitives/ladderTeamPoints";
import { TeamData } from "../types";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { truncateText } from "../../utils/utils-text";

// Base props interface for all layouts
interface BaseLayoutProps {
  team: TeamData;
  delay: number;
  bgColorClass: string;
  LadderRowHeight: number;
  place: number;
}
// Balanced layout - logo on right, alternating backgrounds for stats
export const SixersLadderRow: React.FC<BaseLayoutProps> = ({
  team,
  delay,
  bgColorClass,
  LadderRowHeight,
}) => {
  const { selectedPalette, layout } = useThemeContext();
  const borderColor = selectedPalette.container.primary;
  return (
    <div
      className={`flex items-center overflow-hidden p-2 pl-4 ${layout.borderRadius.container} mb-1 ${bgColorClass}  `}
      style={{
        height: `${LadderRowHeight}px`,
        maxHeight: `120px`,
        background: bgColorClass,
        borderColor: borderColor,
      }}
    >
      {/* Team name and logo container with fixed width */}
      <div
        className="flex items-center justify-between mr-2"
        style={{ width: "65%" }}
      >
        <LadderTeamName value={truncateText(team.teamName, 29)} delay={delay} />
        <div className="w-20 mr-4 overflow-hidden flex flex-shrink-0 items-center justify-center">
          {team.clubLogo || team.playHQLogo ? (
            <div className="rounded-full">
              <TeamLogo
                logo={team.clubLogo || team.playHQLogo}
                teamName={team.teamName}
                delay={delay}
              />
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-100 rounded-full " />
          )}
        </div>
      </div>

      {/* Stats in alternating backgrounds, matching StandardLadderRow widths */}
      <div
        className={`flex flex-1 justify-evenly items-center h-full ${layout.borderRadius.container}`}
        style={{
          background: borderColor,
        }}
      >
        <div className="w-10 mx-px text-center whitespace-nowrap">
          <LadderTeamPoints
            value={team?.P || 0}
            delay={delay}
            variant="onContainerTitle"
          />
        </div>
        <div className="w-10 mx-px text-center whitespace-nowrap">
          <LadderTeamPoints
            value={team?.W || 0}
            delay={delay}
            variant="onContainerTitle"
          />
        </div>
        <div className="w-10 mx-px text-center whitespace-nowrap">
          <LadderTeamPoints
            value={team?.L || 0}
            delay={delay}
            variant="onContainerTitle"
          />
        </div>
        <div className="w-10 mx-px text-center whitespace-nowrap">
          <LadderTeamPoints
            value={team?.BYE || 0}
            delay={delay}
            variant="onContainerTitle"
          />
        </div>
        <div className="w-20 mx-px text-center whitespace-nowrap">
          <LadderTeamPoints
            value={team?.PTS || 0}
            delay={delay}
            variant="onContainerTitle"
          />
        </div>
      </div>
    </div>
  );
};
