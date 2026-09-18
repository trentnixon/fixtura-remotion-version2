import React from "react";
import { Img } from "remotion";
import type { RosterDataItem } from "../../../teamRoster/_types/types";
import { formatDate } from "../../../utils/utils-text";
import { dedupeVenueLabel } from "../../scoreline/results/dedupeVenueLabel";
import { resolveScorelineRosterClubSides } from "../../scoreline/roster/resolveScorelineRosterClubSides";
import { resolveScorelineRosterLineup } from "../../scoreline/roster/resolveScorelineRosterPlayerEntry";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { csClass } from "../../scoreline/componentStyles";
import {
  NightSessionRosterEmptyRow,
  NightSessionRosterRow,
} from "./NightSessionRosterRow";

const RosterMetaChip: React.FC<{ value: string }> = ({ value }) => {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    return null;
  }
  return <span className="roster-meta-part meta-chip">{trimmed}</span>;
};

const NightSessionRosterTeamBlock: React.FC<{
  side: "home" | "away";
  teamName: string;
  logoUrl: string;
  isClubTeam: boolean;
}> = ({ side, teamName, logoUrl, isClubTeam }) => {
  const hasCrest = Boolean(logoUrl?.trim());

  return (
    <div
      className={`roster-team-block roster-team-block--${side} team-band team-band--${side}`}
      data-club-team={isClubTeam ? "true" : "false"}
    >
      <div className="roster-team-mark roster-cell roster-team-mark--hero team-mark">
        <span className="mark-fallback" aria-hidden />
        {hasCrest ? <Img src={logoUrl} alt="" /> : null}
      </div>
      <p
        className="team-name roster-cell roster-team-name--hero"
        data-club-team={isClubTeam ? "true" : "false"}
      >
        {teamName}
      </p>
    </div>
  );
};

export const NightSessionRosterContent: React.FC<{
  roster: RosterDataItem;
  availableHeight: number;
}> = ({ roster, availableHeight }) => {
  const { componentStyles } = useThemeContext();
  const { homeIsClub, awayIsClub } = resolveScorelineRosterClubSides(
    roster.isHomeTeam,
  );
  const squadTeamName = roster.isHomeTeam ? roster.teamHome : roster.teamAway;
  const lineup = resolveScorelineRosterLineup(roster.teamRoster);
  const venue = dedupeVenueLabel(roster.ground);
  const dateLabel = formatDate(roster.date);

  return (
    <main
      className={`roster-ledger ${csClass(componentStyles, "nightSessionRosterLedger")}`}
      style={{ height: availableHeight, maxHeight: availableHeight }}
    >
      <div className="roster-columns gap-2">
        <section className="roster-info fixture-card fixture-unit">
          <header className="fixture-unit__rail roster-grade">
            <h2 className="fixture-grade-name">{roster.gradeName}</h2>
          </header>
          <div className="fixture-unit__frame roster-info__frame">
            <div className="roster-teams-stack roster-teams-stack--hero gap-2">
              <NightSessionRosterTeamBlock
                side="home"
                teamName={roster.teamHome}
                logoUrl={roster.teamHomeLogo}
                isClubTeam={homeIsClub}
              />
              <NightSessionRosterTeamBlock
                side="away"
                teamName={roster.teamAway}
                logoUrl={roster.teamAwayLogo}
                isClubTeam={awayIsClub}
              />
            </div>

            <div className="roster-meta roster-cell">
              <RosterMetaChip value={roster.type} />
              <RosterMetaChip value={roster.round} />
              <RosterMetaChip value={roster.ageGroup} />
              <RosterMetaChip value={roster.gender} />
            </div>

            <div className="roster-schedule-stack gap-2">
              {dateLabel ? (
                <p className="roster-schedule-line roster-cell">{dateLabel}</p>
              ) : null}
              {venue ? (
                <p className="roster-schedule-line roster-cell">{venue}</p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="roster-lineup fixture-card fixture-unit">
          <header className="fixture-unit__rail roster-lineup__rail">
            <span className="roster-squad-label">Line-up</span>
            <p className="roster-squad-team">{squadTeamName}</p>
          </header>
          <div className="fixture-unit__frame roster-lineup__frame">
            <div
              className="roster-rows"
              data-density={
                lineup.kind === "players" ? lineup.density : undefined
              }
            >
              {lineup.kind === "empty" ? (
                <NightSessionRosterEmptyRow message={lineup.message} />
              ) : (
                lineup.rows.map((row) => (
                  <NightSessionRosterRow
                    key={`${row.index}-${row.name}`}
                    index={row.index}
                    name={row.name}
                    badges={row.badges}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NightSessionRosterContent;
