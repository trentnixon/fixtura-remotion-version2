import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { cellBlur, useBroadcastProRoundedTheme } from "../../../utils/broadcastProRounded";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { BroadcastProRoundedMatchup } from "../../../../../templates/variants/broadcastProRounded/components/matchup";
import { BroadcastProRoundedRosterSheet } from "../../../../../templates/variants/broadcastProRounded/components/roster";
import { formatDate } from "../../../utils/utils-text";
import { getTeamPerspective } from "../../layout/utils";
import { RosterDisplayProps } from "./_types/RosterDisplayProps";
import {
  DEFAULT_CONTAINER_ANIMATION,
  DEFAULT_CONTAINER_EXIT_ANIMATION,
} from "./_utils/animations";
import { getMainContentHeightReservingFooter } from "../../../../../core/utils/layoutHeights";
import type { ComponentStyles } from "../../../../../core/context/types/ThemeContextTypes";
import type { BroadcastProRoundedGlassStyle } from "../../../utils/broadcastProRounded/glass";

/** Resolve Broadcast Pro `componentStyles` by key (falls back to empty). */
const rosterClass = (styles: ComponentStyles, key: string): string =>
  styles[key]?.className ?? "";

const MetaRow: React.FC<{
  label: string;
  value: string;
  glass: BroadcastProRoundedGlassStyle;
  rowClassName: string;
  labelClassName: string;
  valueClassName: string;
  labelColor: string;
  valueColor: string;
  cellRadius: string;
}> = ({
  label,
  value,
  glass,
  rowClassName,
  labelClassName,
  valueClassName,
  labelColor,
  valueColor,
  cellRadius,
}) => (
  <div
    className={`overflow-hidden ${cellRadius} ${rowClassName}`.trim()}
    style={{
      ...cellBlur,
      backgroundColor: glass.panel,
      border: glass.border,
    }}
  >
    <div className="min-w-0">
      <span className={labelClassName} style={{ color: labelColor }}>
        {label}
      </span>
      <span className={valueClassName} style={{ color: valueColor }}>
        {value}
      </span>
    </div>
  </div>
);

/** Root top padding (`pt-6`) is inside the reserved main-content height box. */
const ROSTER_ROOT_TOP_PADDING_PX = 24;

const RosterDisplayBroadcastProRounded: React.FC<RosterDisplayProps> = ({
  roster,
}) => {
  const { layout, fontClasses, componentStyles } = useThemeContext();
  const { glass, textOnGlass: textOnContainer } = useBroadcastProRoundedTheme();
  const cellRadius = layout.borderRadius.container;
  const availableHeight = getMainContentHeightReservingFooter(layout.heights);
  const rosterBodyHeight = Math.max(
    1,
    availableHeight - ROSTER_ROOT_TOP_PADDING_PX,
  );
  const cs = (key: string) => rosterClass(componentStyles, key);
  const titleFontFamily = fontClasses?.heading?.family ?? "Teko";

  const { accountHolder, against } = getTeamPerspective(roster);
  const accountLabel = roster.isHomeTeam ? "HOME TEAM" : "AWAY TEAM";
  const opponentLabel = roster.isHomeTeam ? "AWAY TEAM" : "HOME TEAM";

  return (
    <div
      className={cs("broadcastProRoundedRosterRoot")}
      style={{ height: `${availableHeight}px` }}
    >
      <AnimatedContainer
        type="full"
        className={`${cs("broadcastProRoundedRosterAnimatedContainer")} min-h-0 flex-1`}
        backgroundColor="none"
        animation={DEFAULT_CONTAINER_ANIMATION}
        animationDelay={0}
        exitAnimation={DEFAULT_CONTAINER_EXIT_ANIMATION}
      >
        <div className={cs("broadcastProRoundedRosterContentShell")}>
          <div className={cs("broadcastProRoundedRosterGrid")}>
            <div className={cs("broadcastProRoundedRosterLineupColumn")}>
              <BroadcastProRoundedRosterSheet
                players={roster.teamRoster}
                availableHeightPx={rosterBodyHeight}
                nameColor={textOnContainer.copy}
              />
            </div>

            <div className={cs("broadcastProRoundedRosterSidebar")}>
              <BroadcastProRoundedMatchup
                tier="roster"
                home={{
                  teamName: accountHolder.name,
                  logo: {
                    url: accountHolder.logoUrl,
                    width: 112,
                    height: 112,
                  },
                  roleLabel: accountLabel,
                }}
                away={{
                  teamName: against.name,
                  logo: {
                    url: against.logoUrl,
                    width: 96,
                    height: 96,
                  },
                  roleLabel: opponentLabel,
                }}
                glass={glass}
                fontFamily={titleFontFamily}
              />

              <div className={cs("broadcastProRoundedRosterMetaStack")}>
                <MetaRow
                  label="LOCATION"
                  value={roster.ground.toUpperCase()}
                  glass={glass}
                  rowClassName={cs("broadcastProRoundedRosterMetaRow")}
                  labelClassName={cs("broadcastProRoundedRosterMetaLabel")}
                  valueClassName={cs("broadcastProRoundedRosterMetaValue")}
                  labelColor={textOnContainer.muted}
                  valueColor={textOnContainer.copy}
                  cellRadius={cellRadius}
                />
                <MetaRow
                  label="GRADE"
                  value={roster.gradeName.toUpperCase()}
                  glass={glass}
                  rowClassName={cs("broadcastProRoundedRosterMetaRow")}
                  labelClassName={cs("broadcastProRoundedRosterMetaLabel")}
                  valueClassName={cs("broadcastProRoundedRosterMetaValue")}
                  labelColor={textOnContainer.muted}
                  valueColor={textOnContainer.copy}
                  cellRadius={cellRadius}
                />
                <MetaRow
                  label="DATE"
                  value={formatDate(roster.date).toUpperCase()}
                  glass={glass}
                  rowClassName={cs("broadcastProRoundedRosterMetaRow")}
                  labelClassName={cs("broadcastProRoundedRosterMetaLabel")}
                  valueClassName={cs("broadcastProRoundedRosterMetaValue")}
                  labelColor={textOnContainer.muted}
                  valueColor={textOnContainer.copy}
                  cellRadius={cellRadius}
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplayBroadcastProRounded;
