import React from "react";
import { ScorelineCreaseMarkup } from "../../../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";
import type { ScorelineRosterBadge } from "./resolveScorelineRosterPlayerEntry";

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

export const ScorelineRosterRow: React.FC<{
  index: number;
  name: string;
  badges: ScorelineRosterBadge[];
}> = ({ index, name, badges }) => (
  <div className="roster-entry">
    <div className="roster-row">
      <span className="roster-index">{index}</span>
      <p className="roster-player" title={name}>
        {name}
      </p>
      <div className="roster-badges" hidden={badges.length === 0}>
        {renderBadges(badges)}
      </div>
    </div>
    <div className="roster-crease" aria-hidden>
      <ScorelineCreaseMarkup />
    </div>
  </div>
);

export const ScorelineRosterEmptyRow: React.FC<{ message: string }> = ({
  message,
}) => (
  <div className="roster-entry">
    <div className="roster-row" data-empty-roster="true">
      <span className="roster-index" hidden />
      <p className="roster-player">{message}</p>
      <div className="roster-badges" hidden />
    </div>
    <div className="roster-crease" aria-hidden hidden />
  </div>
);

export default ScorelineRosterRow;
