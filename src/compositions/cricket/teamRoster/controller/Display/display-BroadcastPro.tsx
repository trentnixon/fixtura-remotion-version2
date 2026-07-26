import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { cellBlur, useBroadcastProTheme } from "../../../utils/broadcastPro";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { BroadcastProMatchup } from "../../../../../templates/variants/broadcastPro/components/matchup";
import { BroadcastProRosterSheet } from "../../../../../templates/variants/broadcastPro/components/roster";
import { formatDate } from "../../../utils/utils-text";
import { getTeamPerspective } from "../../layout/utils";
import { RosterDisplayProps } from "./_types/RosterDisplayProps";
import {
  DEFAULT_CONTAINER_ANIMATION,
  DEFAULT_CONTAINER_EXIT_ANIMATION,
} from "./_utils/animations";
import { getAvailableHeightReservingFooter } from "./_utils/helpers";
import type { ComponentStyles } from "../../../../../core/context/types/ThemeContextTypes";
import type { BroadcastProGlassStyle } from "../../../utils/broadcastPro/glass";

/** Resolve Broadcast Pro `componentStyles` by key (falls back to empty). */
const rosterClass = (styles: ComponentStyles, key: string): string =>
  styles[key]?.className ?? "";

const MetaRow: React.FC<{
  label: string;
  value: string;
  glass: BroadcastProGlassStyle;
  rowClassName: string;
  labelClassName: string;
  valueClassName: string;
  labelColor: string;
  valueColor: string;
}> = ({
  label,
  value,
  glass,
  rowClassName,
  labelClassName,
  valueClassName,
  labelColor,
  valueColor,
}) => (
  <div
    className={rowClassName}
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

const RosterDisplayBroadcastPro: React.FC<RosterDisplayProps> = ({
  roster,
}) => {
  const { layout, fontClasses, componentStyles } = useThemeContext();
  const { glass, textOnGlass: textOnContainer } = useBroadcastProTheme();
  const availableHeight = getAvailableHeightReservingFooter(layout.heights);
  const cs = (key: string) => rosterClass(componentStyles, key);
  const titleFontFamily =
    fontClasses?.heading?.family ?? "Teko";

  const { accountHolder, against } = getTeamPerspective(roster);
  const accountLabel = roster.isHomeTeam ? "HOME TEAM" : "AWAY TEAM";
  const opponentLabel = roster.isHomeTeam ? "AWAY TEAM" : "HOME TEAM";

  return (
    <div className={cs("broadcastProRosterRoot")}>
      <AnimatedContainer
        type="full"
        className={`${cs("broadcastProRosterAnimatedContainer")} ${layout.borderRadius.container}`}
        backgroundColor="none"
        animation={DEFAULT_CONTAINER_ANIMATION}
        animationDelay={0}
        exitAnimation={DEFAULT_CONTAINER_EXIT_ANIMATION}
      >
        <div
          className={cs("broadcastProRosterContentShell")}
          style={{
            height: `${availableHeight}px`,
            maxHeight: `${availableHeight}px`,
          }}
        >
          <div className={cs("broadcastProRosterGrid")}>
            <div className={cs("broadcastProRosterLineupColumn")}>
              <BroadcastProRosterSheet
                players={roster.teamRoster}
                availableHeightPx={availableHeight}
              />
            </div>

            <div className={cs("broadcastProRosterSidebar")}>
              <BroadcastProMatchup
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

              <div className={cs("broadcastProRosterMetaStack")}>
                <MetaRow
                  label="LOCATION"
                  value={roster.ground.toUpperCase()}
                  glass={glass}
                  rowClassName={cs("broadcastProRosterMetaRow")}
                  labelClassName={cs("broadcastProRosterMetaLabel")}
                  valueClassName={cs("broadcastProRosterMetaValue")}
                  labelColor={textOnContainer.muted}
                  valueColor={textOnContainer.copy}
                />
                <MetaRow
                  label="GRADE"
                  value={roster.gradeName.toUpperCase()}
                  glass={glass}
                  rowClassName={cs("broadcastProRosterMetaRow")}
                  labelClassName={cs("broadcastProRosterMetaLabel")}
                  valueClassName={cs("broadcastProRosterMetaValue")}
                  labelColor={textOnContainer.muted}
                  valueColor={textOnContainer.copy}
                />
                <MetaRow
                  label="DATE"
                  value={formatDate(roster.date).toUpperCase()}
                  glass={glass}
                  rowClassName={cs("broadcastProRosterMetaRow")}
                  labelClassName={cs("broadcastProRosterMetaLabel")}
                  valueClassName={cs("broadcastProRosterMetaValue")}
                  labelColor={textOnContainer.muted}
                  valueColor={textOnContainer.copy}
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplayBroadcastPro;
