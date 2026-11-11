import { dedupeVenueLabel } from "./venue.js";
import { logoHasCrest } from "./crest.js";

/**
 * @param {ParentNode} root
 */
export function syncScorelineRosterLayout(root = document) {
  const homeBand = root
    .querySelector('[data-hydrate="home-logo"]')
    ?.closest(".team-band");
  const awayBand = root
    .querySelector('[data-hydrate="away-logo"]')
    ?.closest(".team-band");

  for (const [band, logoKey] of [
    [homeBand, "home-logo"],
    [awayBand, "away-logo"],
  ]) {
    if (!(band instanceof HTMLElement)) {
      continue;
    }

    const img = root.querySelector(`[data-hydrate="${logoKey}"]`);
    band.dataset.hasCrest = logoHasCrest(img) ? "true" : "false";
  }

  if (homeBand instanceof HTMLElement && awayBand instanceof HTMLElement) {
    const homeIsClub = homeBand.dataset.clubTeam === "true";
    if (
      homeBand.dataset.clubTeam === "true" ||
      homeBand.dataset.clubTeam === "false"
    ) {
      awayBand.dataset.clubTeam = homeIsClub ? "false" : "true";
    }
  }

  const venue = root.querySelector('[data-hydrate="fixture-ground"]');
  if (venue?.textContent) {
    venue.textContent = dedupeVenueLabel(venue.textContent);
  }
}
