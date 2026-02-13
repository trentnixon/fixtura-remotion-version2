import React from "react";
import TableHeaderMudgeeraba from "../../modules/TableHeader/headerMudgeeraba";
import RowMudgeeraba from "../TeamRows/row-Mudgeeraba";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { SponsorFooter } from "../../../sponsorFooter";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";

export const LadderDisplayMudgeeraba: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { layout } = useThemeContext();
  const { League, gradeName, assignSponsors } = ladder;
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  // Reserve less space when many teams so all fit (compact uses smaller margin/gap)
  const extraReserved = League.length > 14 ? 24 : 48;
  const { headerHeight, rowHeight, compact } = calculateRowDimensions(
    heights.asset,
    League.length,
    extraReserved,
  );
  const containerMargin = compact ? "my-2 mx-4" : "my-4 mx-4";
  const headerGap = compact ? "gap-2" : "gap-4";
  const rowGap = compact ? "gap-0" : "gap-1";

  return (
    <div className="p-0 flex flex-col w-full h-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col overflow-hidden rounded-none"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        exitAnimation={containerAnimation.containerOut}
      >
        <div className={`${containerMargin} flex flex-col ${headerGap}`}>
          <TableHeaderMudgeeraba title={gradeName} headerHeight={headerHeight} compact={compact} />

          <div className={`flex-1 flex flex-col ${rowGap} overflow-hidden min-h-0`}>
            {League.map((team, index) => (
              <RowMudgeeraba
                key={team.position}
                team={team}
                index={index}
                totalTeams={League.length}
                isBiasTeam={team.teamName === ladder.bias}
                LadderRowHeight={rowHeight}
                compact={compact}
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

export default LadderDisplayMudgeeraba;
