import React from "react";
import { LadderData } from "../../types";
import { TableHeaderWrapped } from "../../modules/TableHeader/header";
import { StandardRowWrapped } from "../TeamRows/StandardRow";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { SponsorFooter } from "../../../sponsorFooter";

interface LadderDisplayProps {
  ladder: LadderData;
}

export const LadderDisplayBrickWork: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { League, gradeName, bias, assignSponsors } = ladder;
  const { layout, selectedPalette } = useThemeContext();
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
        className="flex-1 flex flex-col mx-8 p-4 rounded-none overflow-hidden"
        backgroundColor={undefined}
        style={{
          background: selectedPalette.container.backgroundTransparent.medium,
        }}
        animation={{
          type: "slideInRight",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 1000,
          },
        }}
        animationDelay={0}
        exitAnimation={{
          type: "slideOutRight",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 1000,
          },
        }}
      >
        <div>
          <TableHeaderWrapped title={gradeName} headerHeight={headerHeight} />

          <div className="flex-1 overflow-hidden">
            {League.map((team, index) => (
              <StandardRowWrapped
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
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={assignSponsors} />
      </div>
    </div>
  );
};

export default LadderDisplayBrickWork;

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
