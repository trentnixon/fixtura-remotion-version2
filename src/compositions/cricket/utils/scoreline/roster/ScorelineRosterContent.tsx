import React from "react";
import type { RosterDataItem } from "../../../teamRoster/_types/types";
import { formatDate } from "../../../utils/utils-text";
import {
  ScorelineFixtureMatchup,
  ScorelineRosterGrade,
} from "../fixture/ScorelineFixturePrimitives";
import { dedupeVenueLabel } from "../results/dedupeVenueLabel";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../componentStyles";
import { resolveScorelineRosterClubSides } from "./resolveScorelineRosterClubSides";
import { resolveScorelineRosterLineup } from "./resolveScorelineRosterPlayerEntry";
import {
  ScorelineRosterEmptyRow,
  ScorelineRosterRow,
} from "./ScorelineRosterRow";

export const ScorelineRosterContent: React.FC<{
  roster: RosterDataItem;
  availableHeight: number;
}> = ({ roster, availableHeight }) => {
  const { componentStyles } = useThemeContext();
  const { homeIsClub, awayIsClub } = resolveScorelineRosterClubSides(
    roster.isHomeTeam,
  );
  const squadTeamName = roster.isHomeTeam ? roster.teamHome : roster.teamAway;
  const lineup = resolveScorelineRosterLineup(roster.teamRoster);

  return (
    <main
      className={`roster-ledger ${csClass(componentStyles, "scorelineRosterLedger")}`}
      style={{ height: availableHeight, maxHeight: availableHeight }}
    >
      <div className="roster-stack">
        <ScorelineFixtureMatchup
          home={{
            sideLabel: "Home",
            teamName: roster.teamHome,
            logoUrl: roster.teamHomeLogo,
            isClubTeam: homeIsClub,
          }}
          away={{
            sideLabel: "Away",
            teamName: roster.teamAway,
            logoUrl: roster.teamAwayLogo,
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
          ]}
        />

        <div className="roster-lineup">
          <div className="roster-squad-header">
            <span className="roster-squad-label">Line-up</span>
            <p className="roster-squad-team">{squadTeamName}</p>
          </div>

          <div
            className="roster-rows"
            data-density={
              lineup.kind === "players" ? lineup.density : undefined
            }
          >
            {lineup.kind === "empty" ? (
              <ScorelineRosterEmptyRow message={lineup.message} />
            ) : (
              lineup.rows.map((row) => (
                <ScorelineRosterRow
                  key={`${row.index}-${row.name}`}
                  index={row.index}
                  name={row.name}
                  badges={row.badges}
                />
              ))
            )}
          </div>
        </div>

        <div className="roster-context">
          <p className="roster-context-date">{formatDate(roster.date)}</p>
          <p className="roster-context-venue">
            {dedupeVenueLabel(roster.ground)}
          </p>
        </div>
      </div>
    </main>
  );
};

export default ScorelineRosterContent;
