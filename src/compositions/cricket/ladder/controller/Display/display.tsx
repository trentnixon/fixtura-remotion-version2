import React from "react";
import { LadderData } from "../../types";
import TableHeader from "../../modules/TableHeader/header";
import StandardRow from "../TeamRows/StandardRow";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";

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
    <div className="p-0 flex flex-col w-full h-full">
      {/* <LadderHeader title={name} /> */}
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-8 p-4 bg-black/40 rounded-lg overflow-hidden"
        backgroundColor="none"
        animation={{
          type: "revealBottom",
          easing: "easeInOut",
          duration: 25,
          custom: {
            distance: 200,
          },
        }}
        animationDelay={0}
        exitAnimation={{
          type: "none",
          easing: "easeInOut",
          duration: 15,
          custom: {
            distance: 100,
          },
        }}
      >
        <div>
          <TableHeader title={name} headerHeight={headerHeight} />

          <div className="flex-1 overflow-hidden">
            {League.map((team, index) => (
              <StandardRow
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
      </AnimatedContainer>
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
