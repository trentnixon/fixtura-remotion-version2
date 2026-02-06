import React from "react";
import TableHeader from "../../modules/TableHeader/header";
import StandardRow from "../TeamRows/StandardRow";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { SponsorFooter } from "../../../sponsorFooter";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";

export const LadderDisplayBasic: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { selectedPalette, layout } = useThemeContext();
  const { League, gradeName, bias, assignSponsors } = ladder;
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { headerHeight, rowHeight } = calculateRowDimensions(
    heights.asset,
    League.length,
  );
  return (
    <div className="p-0 flex flex-col w-full h-full">
      {/* <LadderHeader title={name} /> */}
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container} flex-1 flex flex-col mx-8 p-2 overflow-hidden`}
        backgroundColor={undefined}
        style={{
          background: selectedPalette.container.backgroundTransparent.high,
        }}
        animation={containerAnimation.containerIn}
        exitAnimation={containerAnimation.containerOut}
      >
        <div>
          <TableHeader title={gradeName} headerHeight={headerHeight} />

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
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={assignSponsors} />
      </div>
    </div>
  );
};

export default LadderDisplayBasic;
