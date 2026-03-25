import React from "react";
import TableHeaderBroadcastPro from "../../modules/TableHeader/headerBroadcastPro";
import RowBroadcastPro from "../TeamRows/row-BroadcastPro";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { SponsorFooter } from "../../../sponsorFooter";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";

const HEADER_EXTRA_FOR_GRADE = 44;

/** Cap row height to ~stat column width so cells stay square; extra asset height stays empty below. */
const BROADCAST_PRO_MAX_ROW_HEIGHT = 96;

export const LadderDisplayBroadcastPro: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { animations } = useAnimationContext();
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { League, gradeName, assignSponsors } = ladder;
  const { layout } = useThemeContext();
  const { heights } = layout;

  const {
    headerHeight,
    rowHeight: rawRowHeight,
    compact: compactFromCount,
  } = calculateRowDimensions(
    heights.asset,
    League.length,
    HEADER_EXTRA_FOR_GRADE,
  );

  const rowHeight = Math.min(rawRowHeight, BROADCAST_PRO_MAX_ROW_HEIGHT);
  const compact =
    compactFromCount || rawRowHeight > BROADCAST_PRO_MAX_ROW_HEIGHT;

  return (
    <div className="flex h-full w-full flex-col p-0">
      <AnimatedContainer
        type="full"
        className="mx-6 flex flex-1 flex-col overflow-hidden rounded-none"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <TableHeaderBroadcastPro
            title={gradeName}
            headerHeight={headerHeight}
            compact={compact}
          />

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
            {League.map((team, index) => (
              <RowBroadcastPro
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

export default LadderDisplayBroadcastPro;
