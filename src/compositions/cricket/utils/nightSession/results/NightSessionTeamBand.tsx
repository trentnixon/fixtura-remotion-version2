import React from "react";
import { Img } from "remotion";
import type { MatchResult } from "../../../results/_types/types";
import { resolveTeamMatchScore } from "../../teamMatchScore";
import { NightSessionTeamBandLogoBg } from "../NightSessionTeamBandLogoBg";

export const NightSessionTeamBand: React.FC<{
  team: MatchResult["homeTeam"];
  matchType: string;
  logoUrl: string;
  isClubTeam: boolean;
  side: "home" | "away";
  /** Logo as `.team-band` background; hides inline `.team-mark` when crest exists. */
  bandLogoBackground?: boolean;
}> = ({
  team,
  matchType,
  logoUrl,
  isClubTeam,
  side,
  bandLogoBackground = false,
}) => {
  const hasCrest = Boolean(logoUrl);
  const showBandLogoBackground = bandLogoBackground && hasCrest;
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
      data-logo-band-bg={showBandLogoBackground ? "true" : "false"}
    >
      {showBandLogoBackground ? (
        <NightSessionTeamBandLogoBg logoUrl={logoUrl} />
      ) : null}
      <div className="team-group">
        {showBandLogoBackground ? null : (
          <div className="team-mark">
            <span className="mark-fallback" aria-hidden />
            {hasCrest ? <Img src={logoUrl} alt="" /> : null}
          </div>
        )}
        <div className="team-identity">
          <h2 className="team-name">{team.name}</h2>
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
        </p>
        <span className="overs" data-empty={oversValue ? "false" : "true"}>
          {oversValue ? (
            <>
              <span>{oversValue}</span> ov
            </>
          ) : null}
        </span>
      </div>
    </div>
  );
};
