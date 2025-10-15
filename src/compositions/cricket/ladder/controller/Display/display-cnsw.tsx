import React from "react";
import { LadderData } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import TableHeaderCNSW from "../../modules/TableHeader/headerCNSW";

import { SponsorFooter } from "../../../sponsorFooter";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { StandardRowCNSWWrapped } from "../TeamRows/row-CNSW";

interface LadderDisplayProps {
  ladder: LadderData;
}

export const LadderDisplayCNSW: React.FC<LadderDisplayProps> = ({ ladder }) => {
  const { League, gradeName, bias, assignSponsors } = ladder;
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { headerHeight, rowHeight } = calculateRowDimensions(
    heights.asset,
    League.length,
  );
  const { animations } = useAnimationContext();
  const ParentContainerAnimation = animations.container.main.parent.containerIn;
  const ParentContainerExitAnimation =
    animations.container.main.parent.containerOut;

  return (
    <div className="p-0 flex flex-col w-full h-full">
      {/* <LadderHeader title={name} /> */}
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-8 p-4 rounded-none overflow-hidden"
        backgroundColor="none"
        animation={ParentContainerAnimation}
        animationDelay={0}
        exitAnimation={ParentContainerExitAnimation}
      >
        <div>
          <TableHeaderCNSW title={gradeName} headerHeight={headerHeight} />

          <div className="flex-1 overflow-hidden">
            {League.map((team, index) => {
              console.log("team", team);
              return (
                <StandardRowCNSWWrapped
                  key={team.position}
                  team={team}
                  index={index}
                  totalTeams={League.length}
                  isBiasTeam={team.teamName === bias}
                  LadderRowHeight={rowHeight}
                />
              );
            })}
          </div>
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={assignSponsors} />
      </div>
    </div>
  );
};

export default LadderDisplayCNSW;

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
