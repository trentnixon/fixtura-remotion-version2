import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  cellBlur,
  useBroadcastProRoundedTheme,
} from "../../../../../compositions/cricket/utils/broadcastProRounded";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import {
  formatBroadcastProRoundedRosterIndex,
  resolveBroadcastProRoundedRosterIndex,
} from "../../../../../compositions/cricket/utils/broadcastProRounded/roster";
import { BroadcastProRoundedScoreText } from "../score/BroadcastProRoundedScoreText";
import { RosterPlayerName } from "../../../../../compositions/cricket/utils/primitives/RosterPlayerName";
import { truncatePlayerName } from "../../../../../compositions/cricket/teamRoster/layout/utils";
import type { BroadcastProRoundedRosterListMetrics } from "../../../../../compositions/cricket/teamRoster/controller/Display/_utils/broadcastProRoundedRosterListMetrics";

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

export interface BroadcastProRoundedRosterSheetRowProps {
  index: number;
  playerName: string;
  metrics: BroadcastProRoundedRosterListMetrics;
  nameColor?: string;
}

export const BroadcastProRoundedRosterSheetRow: React.FC<
  BroadcastProRoundedRosterSheetRowProps
> = ({ index, playerName, metrics, nameColor }) => {
  const { componentStyles, fontClasses, fonts, layout } = useThemeContext();
  const { glass, text, accent } = useBroadcastProRoundedTheme();
  const cellRadius = layout.borderRadius.container;
  const indexResult = resolveBroadcastProRoundedRosterIndex(index);
  const titleFontFamily =
    fontClasses?.heading?.family ?? fonts?.title?.family ?? "Teko";

  const indexColor = indexResult.variant === "leader" ? accent : text.muted;

  const rowHeightPx = Math.max(1, Math.round(metrics.rowPx));

  return (
    <div
      className={csClass(componentStyles, "broadcastProRoundedRosterRow")}
      style={{ height: rowHeightPx, flexShrink: 0 }}
    >
      <div
        className={`overflow-hidden ${cellRadius} ${csClass(componentStyles, "broadcastProRoundedRosterPlayerNumber")}`}
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
            <BroadcastProRoundedScoreText
              value={formatBroadcastProRoundedRosterIndex(index)}
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
        className={`overflow-hidden ${cellRadius} ${csClass(componentStyles, "broadcastProRoundedRosterNameCell")}`}
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
