import React from "react";
import { Img } from "remotion";
import type { MatchResult } from "../../../results/_types/types";
import { resolveTeamMatchScore } from "../../teamMatchScore";

export const NightSessionTeamBand: React.FC<{
  team: MatchResult["homeTeam"];
  matchType: string;
  logoUrl: string;
  isClubTeam: boolean;
  side: "home" | "away";
}> = ({ team, matchType, logoUrl, isClubTeam, side }) => {
  const hasCrest = Boolean(logoUrl);
  const oversValue = team.overs?.trim() ?? "";
  const firstInningsField =
    side === "home" ? team.homeScoresFirstInnings : team.awayScoresFirstInnings;
  const scores = resolveTeamMatchScore(
    matchType,
    team.score,
    firstInningsField,
  );

  return (
    <div
      className="team-band"
      data-side={side}
      data-club-team={isClubTeam ? "true" : "false"}
      data-has-crest={hasCrest ? "true" : "false"}
    >
      <div className="team-group">
        <div className="team-mark">
          <span className="mark-fallback" aria-hidden />
          {hasCrest ? <Img src={logoUrl} alt="" /> : null}
        </div>
        <p
          className="team-score"
          data-has-prior-innings={scores.prior ? "true" : "false"}
        >
          <span className="score-stack">
            {scores.prior ? (
              <span className="score score--prior">{scores.prior}</span>
            ) : null}
            <span className="score">{scores.current}</span>
          </span>
          <span className="overs" data-empty={oversValue ? "false" : "true"}>
            {oversValue ? (
              <>
                <span>{oversValue}</span> ov
              </>
            ) : null}
          </span>
        </p>
        <div className="team-identity">
          <h2 className="team-name">{team.name}</h2>
        </div>
      </div>
    </div>
  );
};
