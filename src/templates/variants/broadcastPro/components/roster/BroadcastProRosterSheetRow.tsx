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
import type { BroadcastProRosterListMetrics } from "../../../../../compositions/cricket/teamRoster/controller/Display/_utils/broadcastProRosterListMetrics";

/** Teko caps sit high in the em box; nudge copy toward optical vertical center. */
const TEKO_ROSTER_TEXT_NUDGE_EM = 0.06;

const rosterTekoOpticalNudge: React.CSSProperties = {
  transform: `translateY(${TEKO_ROSTER_TEXT_NUDGE_EM}em)`,
};

/** Broadcast Pro roster — longer names than default list truncation. */
const BROADCAST_PRO_ROSTER_NAME_MAX_LENGTH = 42;

const normalizeRosterPlayerName = (playerName: string): string =>
  playerName.replace(/\s+/g, " ").trim();

const rosterCellTextStyle = (
  fontSizePx: number,
  lineHeight = 1,
): React.CSSProperties => ({
  fontSize: fontSizePx,
  lineHeight,
  margin: 0,
  padding: 0,
});

export interface BroadcastProRosterSheetRowProps {
  index: number;
  playerName: string;
  metrics: BroadcastProRosterListMetrics;
  nameColor?: string;
}

export const BroadcastProRosterSheetRow: React.FC<
  BroadcastProRosterSheetRowProps
> = ({ index, playerName, metrics, nameColor }) => {
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const { glass, text, accent } = useBroadcastProTheme();
  const indexResult = resolveBroadcastProRosterIndex(index);
  const titleFontFamily =
    fontClasses?.heading?.family ?? fonts?.title?.family ?? "Teko";

  const indexColor = indexResult.variant === "leader" ? accent : text.muted;

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
              style={{
                ...rosterCellTextStyle(metrics.numFontPx),
                color: indexColor,
              }}
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
        <div className="flex min-h-0 w-full flex-1 items-center justify-start overflow-visible">
          <RosterPlayerName
            value={truncatePlayerName(
              normalizeRosterPlayerName(playerName).toUpperCase(),
              BROADCAST_PRO_ROSTER_NAME_MAX_LENGTH,
            )}
            fontFamily={titleFontFamily}
            style={{
              ...rosterCellTextStyle(metrics.nameFontPx, 1.1),
              fontWeight: 400,
              display: "block",
              ...(nameColor != null ? { color: nameColor } : {}),
            }}
            variant="onContainerCopy"
          />
        </div>
      </div>
    </div>
  );
};
