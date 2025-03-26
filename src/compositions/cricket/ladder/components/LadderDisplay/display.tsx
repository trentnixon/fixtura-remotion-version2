import React from "react";
import { LadderData } from "../../types";
import TableHeader from "../TableHeader/header";
import TeamRow from "../TeamRow/row";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

interface LadderDisplayProps {
  ladder: LadderData;
}

export const LadderDisplay: React.FC<LadderDisplayProps> = ({ ladder }) => {
  const { League, name, bias } = ladder;
  const { layout } = useThemeContext();
  const { heights } = layout;

  const { headerHeight, rowHeight } = calculateRowDimensions(
    heights.asset,
    League.length,
  );

  return (
    <div className="p-4 font-sans text-white flex flex-col w-full h-full">
      {/* <LadderHeader title={name} /> */}

      <div className="flex-1 flex flex-col  bg-black/60 rounded-lg overflow-hidden">
        <TableHeader title={name} headerHeight={headerHeight} />

        <div className="flex-1 overflow-hidden">
          {League.map((team, index) => (
            <TeamRow
              key={team.position}
              team={team}
              index={index}
              totalTeams={League.length}
              isBiasTeam={team.teamName === bias}
              LadderRowHeight={rowHeight}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LadderDisplay;

////Utilities////
const calculateRowDimensions = (totalHeight: number, teamCount: number) => {
  const headerHeight = 70;
  const VERTICAL_GAP = 4;
  const PADDING = 20;
  const HEADER_MARGIN = 10;

  const ladderHeight = totalHeight - headerHeight;
  const totalVerticalGaps = (teamCount - 1) * VERTICAL_GAP;
  const availableHeight = ladderHeight - PADDING * 2 - HEADER_MARGIN;
  const rowHeight = (availableHeight - totalVerticalGaps) / teamCount;

  return {
    headerHeight,
    rowHeight,
  };
};
