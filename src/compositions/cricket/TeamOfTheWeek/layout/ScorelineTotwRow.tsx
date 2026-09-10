import React from "react";
import { Img } from "remotion";
import type { TeamOfTheWeekPlayer } from "../types";
import { ScorelineCreaseMarkup } from "../../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";
import {
  formatTotwStats,
  getTotwRoleLabel,
} from "../../utils/scoreline/totw/formatTotwStats";

export const ScorelineTotwRow: React.FC<{
  player: TeamOfTheWeekPlayer;
  index: number;
  rowHeight: number;
  compact: boolean;
  showCrease: boolean;
}> = ({ player, index, rowHeight, showCrease }) => {
  const stats = formatTotwStats(player);
  const isFirst = index === 0;
  const logoUrl = player.club?.logo?.url;

  return (
    <div className="totw-entry">
      <article
        className="totw-row"
        style={{ minHeight: rowHeight, maxHeight: rowHeight }}
      >
        <span className="totw-rank" aria-hidden>
          {index + 1}
        </span>
        <div
          className="totw-mark"
          data-has-crest={logoUrl ? "true" : "false"}
        >
          {logoUrl ? <Img src={logoUrl} alt="" /> : null}
        </div>
        <div className="totw-copy">
          <span className="totw-role">{getTotwRoleLabel(player)}</span>
          <p className="totw-name">{player.player}</p>
          <div className="totw-team-block">
            <span className="totw-team-label">Played for</span>
            <p className="totw-team">{player.primaryTeam}</p>
          </div>
        </div>
        <div className="totw-stats">
          <p className="totw-figure">
            {stats.main}
            {stats.suffix ? (
              <span className="totw-balls"> {stats.suffix}</span>
            ) : null}
          </p>
          {stats.subline ? (
            <p
              className="totw-subline"
              data-empty={stats.subline ? "false" : "true"}
            >
              {stats.subline}
            </p>
          ) : null}
        </div>
      </article>
      {showCrease ? (
        <div className="totw-crease" aria-hidden>
          <ScorelineCreaseMarkup />
        </div>
      ) : null}
    </div>
  );
};

export default ScorelineTotwRow;
