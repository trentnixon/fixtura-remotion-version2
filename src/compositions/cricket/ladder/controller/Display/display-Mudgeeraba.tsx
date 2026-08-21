import React from "react";
import TableHeaderMudgeeraba from "../../modules/TableHeader/headerMudgeeraba";
import RowMudgeeraba from "../TeamRows/row-Mudgeeraba";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { SponsorFooter } from "../../../sponsorFooter";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";
import { LAYERED_PANEL_OFFSET_Y } from "../../../../../templates/variants/mudgeeraba/design";

/** Visible gap between ladder rows (Tailwind `gap-1`). */
const LADDER_ROW_GAP_PX = 4;

export const LadderDisplayMudgeeraba: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { layout } = useThemeContext();
  const { League, gradeName, assignSponsors, primaryForScreen } = ladder;
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const rowGapPx = LAYERED_PANEL_OFFSET_Y + LADDER_ROW_GAP_PX;
  // Reserve less space when many teams so all fit (compact uses smaller margin/gap)
  const extraReserved = League.length > 14 ? 24 : 48;
  const { headerHeight, rowHeight, compact } = calculateRowDimensions(
    heights.asset,
    League.length,
    extraReserved,
    { rowGapPx },
  );
  const containerMargin = compact ? "my-2 mx-4" : "my-4 mx-4";
  const headerGap = compact ? "gap-2" : "gap-4";

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
          <TableHeaderMudgeeraba
            title={gradeName}
            headerHeight={headerHeight}
            compact={compact}
          />

          <div
            className="flex-1 flex flex-col overflow-hidden min-h-0"
            style={{ gap: rowGapPx }}
          >
            {League.map((team, index) => (
              <RowMudgeeraba
                key={team.position}
                team={team}
                index={index}
                totalTeams={League.length}
                isBiasTeam={team.teamName === ladder.bias}
                LadderRowHeight={rowHeight}
                compact={compact}
                isLast={index === League.length - 1}
              />
            ))}
          </div>
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter
          assignSponsors={assignSponsors}
          primaryForScreen={primaryForScreen}
        />
      </div>
    </div>
  );
};

export default LadderDisplayMudgeeraba;
