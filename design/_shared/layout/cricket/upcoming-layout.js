import { dedupeVenueLabel } from "./venue.js";
import { logoHasCrest } from "./crest.js";

/**
 * @param {ParentNode} root
 */
export function syncScorelineUpcomingLayout(root = document) {
  const clubName =
    root.querySelector('[data-hydrate="club-name"]')?.textContent?.trim() ?? "";
  const clubFocus = clubName.replace(/\s+cricket club.*$/i, "").trim();

  root.querySelectorAll(".fixture-card").forEach((card, index) => {
    if (!(card instanceof HTMLElement)) {
      return;
    }

    const fixtureNumber = index + 1;

    const homeMark = root
      .querySelector(`[data-hydrate="fixture-${fixtureNumber}-home-logo"]`)
      ?.closest(".team-band, .fixture-opponent__cell--mark");
    const awayMark = root
      .querySelector(`[data-hydrate="fixture-${fixtureNumber}-away-logo"]`)
      ?.closest(".team-band, .fixture-opponent__cell--mark");
    const homeName = root.querySelector(
      `[data-hydrate="fixture-${fixtureNumber}-home-team"]`,
    );
    const awayName = root.querySelector(
      `[data-hydrate="fixture-${fixtureNumber}-away-team"]`,
    );
    const homeTeam = homeName?.textContent?.trim() ?? "";
    const awayTeam = awayName?.textContent?.trim() ?? "";

    const teamIsClub = (name) =>
      clubFocus.length > 3 &&
      name.toLowerCase().includes(clubFocus.toLowerCase());
    const homeIsClub = teamIsClub(homeTeam);
    const awayIsClub = teamIsClub(awayTeam);

    for (const [mark, side] of [
      [homeMark, "home"],
      [awayMark, "away"],
    ]) {
      if (!(mark instanceof HTMLElement)) {
        continue;
      }

      const img = root.querySelector(
        `[data-hydrate="fixture-${fixtureNumber}-${side}-logo"]`,
      );
      mark.dataset.hasCrest = logoHasCrest(img) ? "true" : "false";
      delete mark.dataset.clubTeam;
    }

    for (const el of [homeMark, awayMark, homeName, awayName]) {
      if (el instanceof HTMLElement) {
        delete el.dataset.clubTeam;
      }
    }

    if (homeIsClub) {
      if (homeMark instanceof HTMLElement) {
        homeMark.dataset.clubTeam = "true";
      }
      if (homeName instanceof HTMLElement) {
        homeName.dataset.clubTeam = "true";
      }
    } else if (awayIsClub) {
      if (awayMark instanceof HTMLElement) {
        awayMark.dataset.clubTeam = "true";
      }
      if (awayName instanceof HTMLElement) {
        awayName.dataset.clubTeam = "true";
      }
      if (homeMark instanceof HTMLElement) {
        homeMark.dataset.clubTeam = "false";
      }
      if (homeName instanceof HTMLElement) {
        homeName.dataset.clubTeam = "false";
      }
    }

    const ground = root.querySelector(
      `[data-hydrate="fixture-${fixtureNumber}-ground"]`,
    );
    if (ground?.textContent) {
      ground.textContent = dedupeVenueLabel(ground.textContent);
    }
  });
}
