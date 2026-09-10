import React from "react";
import type { RosterDataItem } from "../../../teamRoster/_types/types";
import { getTeamPerspective } from "../../../teamRoster/layout/utils";
import { formatDate, formatGroundLocation } from "../../../utils/utils-text";
import {
  ScorelineFixtureMatchup,
  ScorelineRosterGrade,
} from "../fixture/ScorelineFixturePrimitives";
import { teamMatchesClub } from "../teamMatchesClub";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";

const resolveRosterDensity = (
  playerCount: number,
): "normal" | "compact" | "tight" => {
  if (playerCount <= 12) {
    return "normal";
  }

  if (playerCount <= 16) {
    return "compact";
  }

  return "tight";
};

export const ScorelineRosterContent: React.FC<{
  roster: RosterDataItem;
  availableHeight: number;
}> = ({ roster, availableHeight }) => {
  const { club } = useVideoDataContext();
  const { accountHolder, against } = getTeamPerspective(roster);
  const clubName = club?.name;
  const homeIsClub = teamMatchesClub(accountHolder.name, clubName);
  const awayIsClub = teamMatchesClub(against.name, clubName);
  const density = resolveRosterDensity(roster.teamRoster.length);
  const homeSide = roster.isHomeTeam ? "Home" : "Away";
  const awaySide = roster.isHomeTeam ? "Away" : "Home";

  return (
    <main
      className="roster-ledger"
      style={{ height: availableHeight, maxHeight: availableHeight }}
    >
      <div className="roster-stack">
        <ScorelineFixtureMatchup
          home={{
            sideLabel: homeSide,
            teamName: accountHolder.name,
            logoUrl: accountHolder.logoUrl,
            isClubTeam: homeIsClub,
          }}
          away={{
            sideLabel: awaySide,
            teamName: against.name,
            logoUrl: against.logoUrl,
            isClubTeam: awayIsClub,
          }}
        />

        <ScorelineRosterGrade
          gradeName={roster.gradeName}
          metaChips={[
            roster.type,
            roster.round,
            roster.ageGroup,
            roster.gender,
          ].filter(Boolean)}
        />

        <div className="roster-lineup">
          <div className="roster-squad-header">
            <span className="roster-squad-label">Line-up</span>
            <p className="roster-squad-team">{accountHolder.name}</p>
          </div>

          <div className="roster-rows" data-density={density}>
            {roster.teamRoster.map((playerName, index) => (
              <div key={`${playerName}-${index}`} className="roster-entry">
                <div className="roster-row">
                  <span className="roster-index">{index + 1}</span>
                  <p className="roster-player">{playerName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="roster-context">
          <p className="roster-context-date">{formatDate(roster.date)}</p>
          <p className="roster-context-venue">
            {formatGroundLocation(roster.ground)}
          </p>
        </div>
      </div>
    </main>
  );
};

export default ScorelineRosterContent;
