import React from "react";
import TeamLogo from "../../utils/primitives/TeamLogo";
import LadderTeamName from "../../utils/primitives/ladderTeamName";
import LadderTeamPoints from "../../utils/primitives/ladderTeamPoints";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { truncateText } from "../../utils/utils-text";
import { BaseLayoutProps } from "./_types/BaseLayoutProps";
import { ClassicForegroundShell } from "../../../../templates/variants/classic/design";

/**
 * Classic ladder row — offset shell + fibre texture, Sixers-style number columns
 * (no recessed wells — those failed Studio review).
 */
const CLASSIC_MAX_ROW_HEIGHT = 120;

export const LadderRowClassic: React.FC<BaseLayoutProps> = ({
  team,
  delay,
  LadderRowHeight,
}) => {
  const { layout, selectedPalette } = useThemeContext();
  const borderColor = selectedPalette.container.primary;
  const rowHeight = Math.min(LadderRowHeight, CLASSIC_MAX_ROW_HEIGHT);

  return (
    <ClassicForegroundShell
      height={rowHeight}
      delay={delay}
      depth="compact"
      className="mb-1"
    >
      <div
        className={`flex items-center overflow-hidden p-2 pl-4 h-full ${layout.borderRadius.container}`}
      >
        <div
          className="flex items-center justify-between mr-2"
          style={{ width: "65%" }}
        >
          <LadderTeamName
            value={truncateText(team.teamName, 29)}
            delay={delay}
          />
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
              <div className="w-8 h-8 bg-gray-100 rounded-full" />
            )}
          </div>
        </div>

        <div
          className={`flex flex-1 justify-evenly items-center h-full ${layout.borderRadius.container}`}
          style={{ background: borderColor }}
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
    </ClassicForegroundShell>
  );
};

export default LadderRowClassic;
