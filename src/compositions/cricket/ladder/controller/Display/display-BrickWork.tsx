import React from "react";
import TableHeaderBrickWork from "../../modules/TableHeader/headerBrickWork";
import RowBrickWork from "../TeamRows/row-BrickWork";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { SponsorFooter } from "../../../sponsorFooter";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";

export const LadderDisplayBrickWork: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { League, gradeName, bias, assignSponsors } = ladder;
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
        className="flex-1 flex flex-col mx-8 rounded-none overflow-hidden"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        exitAnimation={containerAnimation.containerOut}
      >
        <div>
          <TableHeaderBrickWork title={gradeName} headerHeight={headerHeight} />

          <div className="flex-1 overflow-hidden">
            {League.map((team, index) => (
              <RowBrickWork
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
