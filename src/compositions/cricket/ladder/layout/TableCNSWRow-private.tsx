import React from "react";

//import TeamLogo from "../../utils/primitives/TeamLogo";
import LadderTeamName from "../../utils/primitives/ladderTeamName";
import LadderTeamPoints from "../../utils/primitives/ladderTeamPoints";
import { TeamData } from "../types";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { MetadataSmall } from "../../utils/primitives/metadataSmall";
import { stripGradeNumberFromTeamName } from "../../utils/utils-text";

// Base props interface for all layouts
interface BaseLayoutProps {
  team: TeamData;
  delay: number;
  LadderRowHeight: number;
  place: number;
}

// Balanced layout - logo on right, alternating backgrounds for stats
export const CNSWLadderRowPrivate: React.FC<BaseLayoutProps> = ({
  team,
  delay,
  LadderRowHeight,
}) => {
  const { selectedPalette, layout } = useThemeContext();

  // Calculate the actual height with max constraint
  const actualHeight = Math.min(LadderRowHeight, 120);

  return (
    <div
      className={`flex items-center overflow-hidden ${layout.borderRadius.container} mb-1`}
      style={{
        height: `${actualHeight}px`,
        background: selectedPalette.background.userSecondary,
      }}
    >
      {/* Position Number - Square cell matching height */}
      <div
        className="flex items-center justify-center h-full"
        style={{
          width: `${actualHeight}px`,
          background: "#FF0000", // Red background
          minWidth: `${actualHeight}px`,
        }}
      >
        <MetadataSmall
          value={`${team.position}`}
          className="text-center font-bold"
          variant="onBackgroundMain"
          animation={null}
        />
      </div>

      {/* Team Name - Flexible middle cell (left-aligned) */}
      <div
        className="flex items-center h-full px-4"
        style={{
          flex: 1,
          textAlign: "left",
        }}
      >
        <LadderTeamName
          value={stripGradeNumberFromTeamName(team.teamName)}
          delay={delay}
          variant="onBackgroundMain"
        />
      </div>

      {/* Points - Fixed width last cell */}
      <div
        className="flex items-center justify-center h-full px-4"
        style={{
          width: "200px",
          minWidth: "200px",
        }}
      >
        <LadderTeamPoints
          value={team?.PTS || 0}
          delay={delay}
          variant="onBackgroundMain"
        />
      </div>
    </div>
  );
};
