import React from "react";
import TableHeaderBroadcastProRounded from "../../modules/TableHeader/headerBroadcastProRounded";
import RowBroadcastProRounded from "../TeamRows/row-BroadcastProRounded";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { SponsorFooter } from "../../../sponsorFooter";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";
import { BroadcastProRoundedZoneDividerNotch } from "../../../../../templates/variants/broadcastProRounded/components/marker";
import {
  shouldShowBroadcastProRoundedLadderZoneDivider,
  useBroadcastProRoundedTheme,
} from "../../../utils/broadcastProRounded";
import { parseTeamPosition } from "../TeamRows/_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const HEADER_EXTRA_FOR_GRADE = 44;

/** Cap row height to ~stat column width so cells stay square; extra asset height stays empty below. */
const BROADCAST_PRO_MAX_ROW_HEIGHT = 96;

const getBroadcastProRoundedRowGap = (): { gapPx: number; gapClass: string } => ({
  gapPx: 4,
  gapClass: "gap-1",
});

export const LadderDisplayBroadcastProRounded: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { animations } = useAnimationContext();
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { League, gradeName, assignSponsors } = ladder;
  const { layout, broadcastProRoundedLadderZoneSizing } = useThemeContext();
  const { heights } = layout;
  const { accent } = useBroadcastProRoundedTheme();

  const { gapPx, gapClass } = getBroadcastProRoundedRowGap();
  const mainContentHeight = getMainContentSectionHeight(heights);

  const {
    headerHeight,
    rowHeight: rawRowHeight,
    compact: compactFromCount,
  } = calculateRowDimensions(
    mainContentHeight,
    League.length,
    HEADER_EXTRA_FOR_GRADE,
    { rowGapPx: gapPx },
  );

  const rowHeight = Math.min(rawRowHeight, BROADCAST_PRO_MAX_ROW_HEIGHT);
  const compact =
    compactFromCount || rawRowHeight > BROADCAST_PRO_MAX_ROW_HEIGHT;

  return (
    <div className="flex h-full w-full flex-col p-0">
      <AnimatedContainer
        type="full"
        className={`mx-6 flex min-h-0 flex-1 flex-col overflow-hidden ${layout.borderRadius.container}`}
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <TableHeaderBroadcastProRounded
            title={gradeName}
            headerHeight={headerHeight}
            compact={compact}
          />

          <div
            className={`flex min-h-0 flex-1 flex-col overflow-hidden ${gapClass}`}
          >
            {League.map((team, index) => {
              const position = parseTeamPosition(team.position);
              return (
                <React.Fragment key={team.position}>
                  <RowBroadcastProRounded
                    team={team}
                    index={index}
                    totalTeams={League.length}
                    isBiasTeam={team.teamName === ladder.bias}
                    LadderRowHeight={rowHeight}
                    compact={compact}
                  />
                  {shouldShowBroadcastProRoundedLadderZoneDivider({
                    position,
                    totalTeams: League.length,
                    sizing: broadcastProRoundedLadderZoneSizing,
                  }) ? (
                    <BroadcastProRoundedZoneDividerNotch accentColor={accent} />
                  ) : null}
                </React.Fragment>
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

export default LadderDisplayBroadcastProRounded;
