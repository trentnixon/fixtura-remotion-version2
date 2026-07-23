import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { StandardRowClassic } from "../TeamRows/row-Classic";
import TableHeaderSixersThunder from "../../modules/TableHeader/headerSixers";

import { SponsorFooter } from "../../../sponsorFooter";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";

/** Match Sixers/CNSW — stop rows ballooning when the league is short. */
const CLASSIC_MAX_ROW_HEIGHT = 120;

export const LadderDisplayClassic: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { League, gradeName, bias, assignSponsors } = ladder;
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { headerHeight, rowHeight: rawRowHeight } = calculateRowDimensions(
    heights.asset,
    League.length,
  );
  const rowHeight = Math.min(rawRowHeight, CLASSIC_MAX_ROW_HEIGHT);
  const { animations } = useAnimationContext();
  const ParentContainerAnimation = animations.container.main.parent.containerIn;
  const ParentContainerExitAnimation =
    animations.container.main.parent.containerOut;

  return (
    <div className="p-0 flex flex-col w-full h-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-8 p-4 rounded-none overflow-visible"
        backgroundColor="none"
        animation={ParentContainerAnimation}
        animationDelay={0}
        exitAnimation={ParentContainerExitAnimation}
      >
        <div>
          <TableHeaderSixersThunder
            title={gradeName}
            headerHeight={headerHeight}
          />

          <div className="flex-1 overflow-visible">
            {League.map((team, index) => (
              <StandardRowClassic
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

export default LadderDisplayClassic;
