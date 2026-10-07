import { Sponsor } from "../../types/data/sponsors";

export const FOOTER_SPONSOR_MAX = 5;

export type SelectFooterSponsorsInput = {
  primaryForScreen: Sponsor[];
  entities: Sponsor[];
  max?: number;
};

/** First occurrence of each sponsor id wins. */
const uniqueById = (sponsors: Sponsor[]): Sponsor[] => {
  const seen = new Set<number>();
  const out: Sponsor[] = [];
  for (const sponsor of sponsors) {
    if (seen.has(sponsor.id)) continue;
    seen.add(sponsor.id);
    out.push(sponsor);
  }
  return out;
};

/**
 * Select logos for a content footer.
 * Entities claim slots first; remaining slots fill from primaryForScreen.
 * Duplicate ids are removed (entities win over primaries).
 * Returned list is paint order: primaries, then entities.
 */
export const selectFooterSponsors = ({
  primaryForScreen,
  entities,
  max = FOOTER_SPONSOR_MAX,
}: SelectFooterSponsorsInput): Sponsor[] => {
  const selectedEntities = uniqueById(entities).slice(0, max);
  const entityIds = new Set(selectedEntities.map((s) => s.id));
  const remainingSlots = max - selectedEntities.length;
  const selectedPrimaries = uniqueById(primaryForScreen)
    .filter((s) => !entityIds.has(s.id))
    .slice(0, remainingSlots);
  return [...selectedPrimaries, ...selectedEntities];
};
