import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  cellBlur,
  useBroadcastProTheme,
} from "../../../../../compositions/cricket/utils/broadcastPro";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import {
  formatBroadcastProRosterIndex,
  resolveBroadcastProRosterIndex,
} from "../../../../../compositions/cricket/utils/broadcastPro/roster";
import { BroadcastProScoreText } from "../score/BroadcastProScoreText";
import { RosterPlayerName } from "../../../../../compositions/cricket/utils/primitives/RosterPlayerName";
import { truncatePlayerName } from "../../../../../compositions/cricket/teamRoster/layout/utils";
import { MAX_PLAYER_NAME_LENGTH } from "../../../../../compositions/cricket/teamRoster/layout/RosterPlayerList/_utils/constants";
import type { BroadcastProRosterListMetrics } from "../../../../../compositions/cricket/teamRoster/controller/Display/_utils/broadcastProRosterListMetrics";

/** Teko caps sit high in the em box; nudge copy toward optical vertical center. */
const TEKO_ROSTER_TEXT_NUDGE_EM = 0.06;

const rosterTekoOpticalNudge: React.CSSProperties = {
  transform: `translateY(${TEKO_ROSTER_TEXT_NUDGE_EM}em)`,
};

const rosterCellTextStyle = (fontSizePx: number): React.CSSProperties => ({
  fontSize: fontSizePx,
  lineHeight: 1,
  margin: 0,
  padding: 0,
});

export interface BroadcastProRosterSheetRowProps {
  index: number;
  playerName: string;
  metrics: BroadcastProRosterListMetrics;
}

export const BroadcastProRosterSheetRow: React.FC<
  BroadcastProRosterSheetRowProps
> = ({ index, playerName, metrics }) => {
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const { glass } = useBroadcastProTheme();
  const indexResult = resolveBroadcastProRosterIndex(index);
  const titleFontFamily =
    fontClasses?.heading?.family ?? fonts?.title?.family ?? "Teko";

  const rowHeightPx = Math.max(1, Math.round(metrics.rowPx));

  return (
    <div
      className={csClass(componentStyles, "broadcastProRosterRow")}
      style={{ height: rowHeightPx, flexShrink: 0 }}
    >
      <div
        className={csClass(componentStyles, "broadcastProRosterPlayerNumber")}
        style={{
          ...cellBlur,
          width: metrics.numColWidthPx,
          minHeight: "100%",
          backgroundColor: glass.panel,
          border: glass.border,
        }}
      >
        <div className="flex h-full w-full min-h-0 items-center justify-center">
          <div style={rosterTekoOpticalNudge}>
            <BroadcastProScoreText
              value={formatBroadcastProRosterIndex(index)}
              role="rosterIndex"
              variant={indexResult.colorVariant}
              fontFamily={titleFontFamily}
              style={rosterCellTextStyle(metrics.numFontPx)}
            />
          </div>
        </div>
      </div>

      <div
        className={csClass(componentStyles, "broadcastProRosterNameCell")}
        style={{
          ...cellBlur,
          minHeight: "100%",
          backgroundColor: glass.panel,
          border: glass.border,
          paddingLeft: metrics.cellPaddingXPx,
          paddingRight: metrics.cellPaddingXPx,
          paddingTop: metrics.cellPaddingYPx,
          paddingBottom: metrics.cellPaddingYPx,
        }}
      >
        <div
          className="flex min-h-0 w-full flex-1 items-center justify-start"
          style={rosterTekoOpticalNudge}
        >
          <RosterPlayerName
            value={truncatePlayerName(
              playerName.toUpperCase(),
              MAX_PLAYER_NAME_LENGTH,
            )}
            fontFamily={titleFontFamily}
            style={{
              ...rosterCellTextStyle(metrics.nameFontPx),
              fontWeight: 400,
              display: "block",
            }}
            variant="onContainerCopy"
          />
        </div>
      </div>
    </div>
  );
};
