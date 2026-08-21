import { Sponsor } from "../../types/data/sponsors";

export const FOOTER_SPONSOR_MAX = 5;

export type SelectFooterSponsorsInput = {
  primaryForScreen: Sponsor[];
  entities: Sponsor[];
  max?: number;
};

/**
 * Select logos for a content footer.
 * Entities claim slots first; remaining slots fill from primaryForScreen.
 * Returned list is paint order: primaries, then entities.
 */
export const selectFooterSponsors = ({
  primaryForScreen,
  entities,
  max = FOOTER_SPONSOR_MAX,
}: SelectFooterSponsorsInput): Sponsor[] => {
  const selectedEntities = entities.slice(0, max);
  const remainingSlots = max - selectedEntities.length;
  const selectedPrimaries = primaryForScreen.slice(0, remainingSlots);
  return [...selectedPrimaries, ...selectedEntities];
};
