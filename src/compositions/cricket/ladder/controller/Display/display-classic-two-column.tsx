import React from "react";
import { LadderData } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";

import { SponsorFooter } from "../../../sponsorFooter";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import TableHeaderClassicTwoColumn from "../../modules/TableHeader/headerClassicTwoColumn";
import { StandardRowClassicTwoColumnWrapped } from "../TeamRows/row-Classic-two-column";

interface LadderDisplayProps {
  ladder: LadderData;
}

export const LadderDisplayClassicTwoColumn: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
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
    <div className="p-0 flex flex-col w-auto h-full">
      {/* <LadderHeader title={name} /> */}
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-2 p-4 rounded-none overflow-hidden h-full "
        backgroundColor="none"
        animation={ParentContainerAnimation}
        animationDelay={0}
        exitAnimation={ParentContainerExitAnimation}
        style={{
          minHeight: `${heights.asset}px`,
        }}
      >
        <div className="h-full flex flex-col justify-center ">
          <div>
            <TableHeaderClassicTwoColumn
              title={gradeName}
              headerHeight={headerHeight}
            />
            <div className="flex-1 overflow-hidden ">
              {League.map((team, index) => (
                <StandardRowClassicTwoColumnWrapped
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
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={assignSponsors} />
      </div>
    </div>
  );
};

export default LadderDisplayClassicTwoColumn;

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
