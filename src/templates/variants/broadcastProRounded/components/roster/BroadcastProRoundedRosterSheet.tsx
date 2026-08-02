import React, { useMemo } from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useBroadcastProRoundedTheme } from "../../../../../compositions/cricket/utils/broadcastProRounded";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import { BroadcastProRoundedVerticalStripMarker } from "../marker/BroadcastProRoundedVerticalStripMarker";
import { computeBroadcastProRoundedRosterPlayerListMetrics } from "../../../../../compositions/cricket/teamRoster/controller/Display/_utils/broadcastProRoundedRosterListMetrics";
import { BroadcastProRoundedRosterSheetRow } from "./BroadcastProRoundedRosterSheetRow";

export interface BroadcastProRoundedRosterSheetProps {
  players: string[];
  availableHeightPx: number;
  nameColor?: string;
  className?: string;
}

export const BroadcastProRoundedRosterSheet: React.FC<
  BroadcastProRoundedRosterSheetProps
> = ({ players, availableHeightPx, nameColor, className = "" }) => {
  const { componentStyles, broadcastProRoundedRosterListSizing } =
    useThemeContext();
  const { accent } = useBroadcastProRoundedTheme();

  const metrics = useMemo(
    () =>
      computeBroadcastProRoundedRosterPlayerListMetrics(
        availableHeightPx,
        players.length,
        broadcastProRoundedRosterListSizing,
      ),
    [availableHeightPx, players.length, broadcastProRoundedRosterListSizing],
  );

  return (
    <div
      className={`flex h-full min-h-0 min-w-0 flex-1 gap-2 ${className}`.trim()}
    >
      <div
        className={csClass(
          componentStyles,
          "broadcastProRoundedRosterPlayerList",
        )}
        style={{ gap: metrics.gapPx }}
      >
        {players.map((player, index) => (
          <BroadcastProRoundedRosterSheetRow
            key={`${index}-${player}`}
            index={index}
            playerName={player}
            metrics={metrics}
            nameColor={nameColor}
          />
        ))}
      </div>
      <BroadcastProRoundedVerticalStripMarker
        accentColor={accent}
        className={csClass(
          componentStyles,
          "broadcastProRoundedRosterAccentStrip",
        )}
      />
    </div>
  );
};
