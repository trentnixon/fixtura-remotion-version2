import { AssignSponsors, Sponsor } from "../../types/data/sponsors";
import { collectEntitiesFromRows } from "./buildMultiRowFooterSponsors";
import { selectFooterSponsors } from "./selectFooterSponsors";

export type BuildSingleItemFooterSponsorsInput = {
  assignSponsors?: AssignSponsors | null;
  primaryForScreen?: Sponsor[] | null;
  /** Used when primaryForScreen is absent or empty (usually account primary). */
  fallbackPrimary?: Sponsor[];
};

/**
 * Footer logos for a single content item (Ladder, Top5 row, resultSingle, etc.).
 */
export const buildSingleItemFooterSponsors = ({
  assignSponsors,
  primaryForScreen,
  fallbackPrimary = [],
}: BuildSingleItemFooterSponsorsInput): Sponsor[] => {
  const primaries =
    primaryForScreen && primaryForScreen.length > 0
      ? primaryForScreen
      : fallbackPrimary;

  return selectFooterSponsors({
    primaryForScreen: primaries,
    entities: collectEntitiesFromRows([{ assignSponsors }]),
  });
};
