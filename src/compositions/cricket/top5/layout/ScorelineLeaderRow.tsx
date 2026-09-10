import React from "react";
import { Img } from "remotion";
import type { PlayerData } from "../_types/types";
import { ScorelineCreaseMarkup } from "../../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";
import { formatTop5Stats } from "../../utils/scoreline/top5/formatTop5Stats";
import { truncateText } from "../layout/_utils/helpers";
import { getDefaultRestrictions } from "../controller/PlayerRow/_utils/helpers";

export const ScorelineLeaderRow: React.FC<{
  player: PlayerData;
  rank: number;
  rowHeight: number;
  compact: boolean;
  showCrease: boolean;
}> = ({ player, rank, rowHeight, showCrease }) => {
  const restrictions = getDefaultRestrictions();
  const stats = formatTop5Stats(player);
  const isFirst = rank === 1;
  const name = truncateText(player.name, restrictions.nameLength);
  const team = truncateText(player.playedFor, restrictions.teamLength);
  const logoUrl = player.teamLogo?.url;

  return (
    <div className="leader-entry">
      <article
        className="leader-row"
        style={{ minHeight: rowHeight, maxHeight: rowHeight }}
      >
        <span className="leader-rank" aria-hidden>
          {rank}
        </span>
        <div
          className="leader-mark"
          data-has-crest={logoUrl ? "true" : "false"}
        >
          {logoUrl ? <Img src={logoUrl} alt="" /> : null}
        </div>
        <div className="leader-copy">
          <p className="leader-name">{name}</p>
          <div className="leader-team-block">
            <span className="leader-team-label">Played for</span>
            <p className="leader-team">{team}</p>
          </div>
        </div>
        <div className="leader-stats">
          {stats.figureLabel ? (
            <span className="leader-figure-label">{stats.figureLabel}</span>
          ) : null}
          <p className="leader-figure">
            {stats.main}
            {stats.suffix ? (
              <span className="leader-balls"> {stats.suffix}</span>
            ) : null}
          </p>
          {stats.subline ? (
            <p
              className="leader-sr"
              data-empty={stats.subline ? "false" : "true"}
            >
              {stats.subline}
            </p>
          ) : null}
        </div>
      </article>
      {showCrease ? (
        <div className="leader-crease" aria-hidden>
          <ScorelineCreaseMarkup />
        </div>
      ) : null}
    </div>
  );
};

export default ScorelineLeaderRow;
