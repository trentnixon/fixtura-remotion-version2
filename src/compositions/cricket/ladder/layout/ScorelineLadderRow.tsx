import React from "react";
import { Img } from "remotion";
import type { TeamData } from "../types";
import { ScorelineCreaseMarkup } from "../../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";
import { parseTeamPosition } from "../controller/TeamRows/_utils/calculations";

const resolveLogo = (team: TeamData): string | undefined => {
  const candidate = team.clubLogo ?? team.playHQLogo ?? team.teamLogo;
  if (!candidate) {
    return undefined;
  }

  return typeof candidate === "string" ? candidate : candidate.url;
};

export const ScorelineLadderRow: React.FC<{
  team: TeamData;
  index: number;
  isBiasTeam: boolean;
  rowHeight: number;
  compact: boolean;
  showCrease: boolean;
}> = ({ team, index, isBiasTeam, rowHeight, compact, showCrease }) => {
  const position = parseTeamPosition(team.position);
  const isFirst = index === 0;
  const logoUrl = resolveLogo(team);

  return (
    <div className="ladder-entry">
      <div
        className="ladder-row"
        data-bias={isBiasTeam ? "true" : "false"}
        style={{ minHeight: rowHeight, maxHeight: rowHeight }}
      >
        <span className="ladder-rank">{position}</span>
        <div
          className="ladder-mark"
          data-has-crest={logoUrl ? "true" : "false"}
        >
          {logoUrl ? <Img src={logoUrl} alt="" /> : null}
        </div>
        <p className="ladder-team">{team.teamName}</p>
        <span className="ladder-stat">{team.P}</span>
        <span className="ladder-stat">{team.W}</span>
        <span className="ladder-stat">{team.L}</span>
        <span className="ladder-stat">{team.BYE}</span>
        <span className="ladder-stat ladder-stat--pts">{team.PTS}</span>
      </div>
      {showCrease ? (
        <div className="ladder-crease" aria-hidden>
          <ScorelineCreaseMarkup />
        </div>
      ) : null}
    </div>
  );
};

export default ScorelineLadderRow;
