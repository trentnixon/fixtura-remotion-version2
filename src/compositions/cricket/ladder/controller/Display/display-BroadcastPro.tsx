import React from "react";
import TableHeaderBroadcastPro from "../../modules/TableHeader/headerBroadcastPro";
import RowBroadcastPro from "../TeamRows/row-BroadcastPro";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { SponsorFooter } from "../../../sponsorFooter";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";
import { BroadcastProZoneDividerNotch } from "../../../../../templates/variants/broadcastPro/components/marker";
import {
  shouldShowBroadcastProLadderZoneDivider,
  useBroadcastProTheme,
} from "../../../utils/broadcastPro";
import { parseTeamPosition } from "../TeamRows/_utils/calculations";

const HEADER_EXTRA_FOR_GRADE = 44;

/** Cap row height to ~stat column width so cells stay square; extra asset height stays empty below. */
const BROADCAST_PRO_MAX_ROW_HEIGHT = 96;

/** 2px gap below this count; none from 10 teams up (more vertical room for rows). */
const BROADCAST_PRO_ROW_GAP_FROM = 10;

const getBroadcastProRowGap = (
  teamCount: number,
): { gapPx: number; gapClass: string } => {
  if (teamCount >= BROADCAST_PRO_ROW_GAP_FROM) {
    return { gapPx: 0, gapClass: "gap-0" };
  }
  return { gapPx: 2, gapClass: "gap-0.5" };
};

export const LadderDisplayBroadcastPro: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { animations } = useAnimationContext();
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { League, gradeName, assignSponsors } = ladder;
  const { layout, broadcastProLadderZoneSizing } = useThemeContext();
  const { heights } = layout;
  const { accent } = useBroadcastProTheme();

  const { gapPx, gapClass } = getBroadcastProRowGap(League.length);

  const {
    headerHeight,
    rowHeight: rawRowHeight,
    compact: compactFromCount,
  } = calculateRowDimensions(
    heights.asset,
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

          <div
            className={`flex min-h-0 flex-1 flex-col overflow-hidden ${gapClass}`}
          >
            {League.map((team, index) => {
              const position = parseTeamPosition(team.position);
              return (
                <React.Fragment key={team.position}>
                  <RowBroadcastPro
                    team={team}
                    index={index}
                    totalTeams={League.length}
                    isBiasTeam={team.teamName === ladder.bias}
                    LadderRowHeight={rowHeight}
                    compact={compact}
                  />
                  {shouldShowBroadcastProLadderZoneDivider({
                    position,
                    totalTeams: League.length,
                    sizing: broadcastProLadderZoneSizing,
                  }) ? (
                    <BroadcastProZoneDividerNotch accentColor={accent} />
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

export default LadderDisplayBroadcastPro;
