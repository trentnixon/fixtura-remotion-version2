import React, { useMemo } from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useBroadcastProTheme } from "../../../../../compositions/cricket/utils/broadcastPro";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import { BroadcastProVerticalStripMarker } from "../marker/BroadcastProVerticalStripMarker";
import { computeBroadcastProRosterPlayerListMetrics } from "../../../../../compositions/cricket/teamRoster/controller/Display/_utils/broadcastProRosterListMetrics";
import { BroadcastProRosterSheetRow } from "./BroadcastProRosterSheetRow";

export interface BroadcastProRosterSheetProps {
  players: string[];
  availableHeightPx: number;
  className?: string;
}

export const BroadcastProRosterSheet: React.FC<
  BroadcastProRosterSheetProps
> = ({ players, availableHeightPx, className = "" }) => {
  const { componentStyles, broadcastProRosterListSizing } = useThemeContext();
  const { accent } = useBroadcastProTheme();

  const metrics = useMemo(
    () =>
      computeBroadcastProRosterPlayerListMetrics(
        availableHeightPx,
        players.length,
        broadcastProRosterListSizing,
      ),
    [availableHeightPx, players.length, broadcastProRosterListSizing],
  );

  return (
    <div className={`flex min-h-0 flex-1 flex-col gap-2 ${className}`.trim()}>
      <div
        className={csClass(componentStyles, "broadcastProRosterPlayerList")}
        style={{ gap: metrics.gapPx }}
      >
        {players.map((player, index) => (
          <BroadcastProRosterSheetRow
            key={`${index}-${player}`}
            index={index}
            playerName={player}
            metrics={metrics}
          />
        ))}
      </div>
      <BroadcastProVerticalStripMarker
        accentColor={accent}
        className={csClass(componentStyles, "broadcastProRosterAccentStrip")}
      />
    </div>
  );
};
