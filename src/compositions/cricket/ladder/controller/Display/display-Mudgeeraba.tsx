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
  const { selectedPalette, layout } = useThemeContext();
  const { League, gradeName, assignSponsors } = ladder;
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { headerHeight, rowHeight } = calculateRowDimensions(
    heights.asset,
    League.length,
  );
  return (
    <div className="p-0 flex flex-col w-full h-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col overflow-hidden rounded-none"
        backgroundColor={undefined}
        style={{
          background: selectedPalette.container.backgroundTransparent.high,
        }}
        animation={containerAnimation.containerIn}
        exitAnimation={containerAnimation.containerOut}
      >
        <div className="my-4 mx-4 flex flex-col gap-4">
          <TableHeaderMudgeeraba title={gradeName} headerHeight={headerHeight} />

          <div className="flex-1 flex flex-col gap-4 overflow-hidden min-h-0">
            {League.map((team, index) => (
              <RowMudgeeraba
                key={team.position}
                team={team}
                index={index}
                totalTeams={League.length}
                isBiasTeam={team.teamName === ladder.bias}
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

export default LadderDisplayMudgeeraba;
