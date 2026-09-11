import React from "react";
import { Img } from "remotion";
import { ScorelineCreaseMarkup } from "../../../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";

const renderRosterMetaChips = (chips: [string, string, string, string]) =>
  chips.map((chip, index) => (
    <React.Fragment key={`roster-meta-${index}`}>
      {index > 0 ? (
        <span
          className={
            index === 2
              ? "meta-separator meta-separator--secondary"
              : "meta-separator"
          }
          aria-hidden
        />
      ) : null}
      <span className="meta-chip" data-empty={chip.trim() ? "false" : "true"}>
        {chip}
      </span>
    </React.Fragment>
  ));

/** Fixed type · round · age slots — mirrors design upcoming.bind.json chips. */
const renderFixtureMetaChips = (chips: [string, string, string]) =>
  chips.map((chip, index) => (
    <React.Fragment key={`fixture-meta-${index}`}>
      {index > 0 ? (
        <span
          className={
            index === 2
              ? "meta-separator meta-separator--secondary"
              : "meta-separator"
          }
          aria-hidden
        />
      ) : null}
      <span className="meta-chip" data-empty={chip.trim() ? "false" : "true"}>
        {chip}
      </span>
    </React.Fragment>
  ));

export const ScorelineFixtureGrade: React.FC<{
  gradeName: string;
  metaChips: [string, string, string];
}> = ({ gradeName, metaChips }) => {
  const hasVisibleChip = metaChips.some((chip) => chip.trim());

  return (
    <div className="fixture-grade">
      <h2 className="fixture-grade-name">{gradeName}</h2>
      <p
        className="fixture-grade-meta"
        data-empty={hasVisibleChip ? "false" : "true"}
      >
        {renderFixtureMetaChips(metaChips)}
      </p>
    </div>
  );
};

export const ScorelineRosterGrade: React.FC<{
  gradeName: string;
  metaChips: [string, string, string, string];
}> = ({ gradeName, metaChips }) => {
  const hasVisibleChip = metaChips.some((chip) => chip.trim());

  return (
    <div className="roster-grade">
      <h2 className="roster-grade-name">{gradeName}</h2>
      <p
        className="roster-grade-meta"
        data-empty={hasVisibleChip ? "false" : "true"}
      >
        {renderRosterMetaChips(metaChips)}
      </p>
    </div>
  );
};

export const ScorelineFixtureTeamBand: React.FC<{
  side: "home" | "away";
  sideLabel: string;
  teamName: string;
  logoUrl?: string;
  isClubTeam?: boolean;
}> = ({ side, sideLabel, teamName, logoUrl, isClubTeam = false }) => (
  <div
    className={`team-band team-band--${side}`}
    data-club-team={isClubTeam ? "true" : "false"}
    data-has-crest={logoUrl ? "true" : "false"}
  >
    <div className="team-mark">
      {logoUrl ? (
        <Img src={logoUrl} alt="" />
      ) : (
        <span className="mark-fallback" aria-hidden />
      )}
    </div>
    <div className="team-copy">
      <span className="team-side-label">{sideLabel}</span>
      <p className="team-name">{teamName}</p>
    </div>
  </div>
);

export const ScorelineFixtureCentre: React.FC<{
  date: string;
  time: string;
  ground: string;
}> = ({ date, time, ground }) => (
  <div className="fixture-centre">
    <span className="fixture-vs" aria-hidden>
      V
    </span>
    <div className="fixture-when">
      <span className="fixture-field-label">When</span>
      <p className="fixture-date">{date}</p>
      <p className="fixture-time">{time}</p>
    </div>
    <div className="fixture-where">
      <span className="fixture-field-label">Venue</span>
      <p className="fixture-ground">{ground}</p>
    </div>
  </div>
);

export const ScorelineFixtureCentreVs: React.FC = () => (
  <div className="fixture-centre" aria-hidden>
    <span className="fixture-vs">V</span>
  </div>
);

export const ScorelineFixtureMatchup: React.FC<{
  home: Omit<React.ComponentProps<typeof ScorelineFixtureTeamBand>, "side">;
  away: Omit<React.ComponentProps<typeof ScorelineFixtureTeamBand>, "side">;
  centre?: React.ReactNode;
}> = ({ home, away, centre }) => (
  <div className="fixture-matchup">
    <ScorelineFixtureTeamBand side="home" {...home} />
    {centre ?? <ScorelineFixtureCentreVs />}
    <ScorelineFixtureTeamBand side="away" {...away} />
  </div>
);

export const ScorelineFixtureSeparator: React.FC = () => (
  <div className="fixture-separator" aria-hidden>
    <ScorelineCreaseMarkup />
  </div>
);

/** @deprecated Use ScorelineFixtureSeparator */
export const ScorelineCreaseSeparator: React.FC<{
  className?: string;
}> = () => <ScorelineFixtureSeparator />;
