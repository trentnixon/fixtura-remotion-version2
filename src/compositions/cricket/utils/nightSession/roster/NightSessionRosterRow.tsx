import React from "react";
import type { ScorelineRosterBadge } from "../../scoreline/roster/resolveScorelineRosterPlayerEntry";
import { formatRosterPlayerName } from "./formatRosterPlayerName";

const renderBadges = (badges: ScorelineRosterBadge[]) =>
  badges.map((badge) => (
    <span
      key={badge.label}
      className={
        badge.captain ? "roster-badge roster-badge--captain" : "roster-badge"
      }
    >
      {badge.label}
    </span>
  ));

export const NightSessionRosterRow: React.FC<{
  index: number;
  name: string;
  badges: ScorelineRosterBadge[];
}> = ({ index, name, badges }) => {
  const displayName = formatRosterPlayerName(name);

  return (
    <div className="roster-entry">
      <div className="roster-row gap-2">
        <span className="roster-index roster-cell">{index}</span>
        <div className="roster-player roster-cell">
          <p className="roster-player__name" title={displayName}>
            {displayName}
          </p>
          {badges.length > 0 ? (
            <span className="roster-badges">{renderBadges(badges)}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const NightSessionRosterEmptyRow: React.FC<{ message: string }> = ({
  message,
}) => (
  <div className="roster-entry">
    <div className="roster-row gap-2" data-empty-roster="true">
      <span className="roster-index roster-cell" hidden />
      <div className="roster-player roster-cell">
        <p className="roster-player__name">{message}</p>
      </div>
    </div>
  </div>
);
