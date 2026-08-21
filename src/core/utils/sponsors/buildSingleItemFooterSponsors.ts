import { AssignSponsors, Sponsor } from "../../types/data/sponsors";
import { collectEntitiesFromRows } from "./buildMultiRowFooterSponsors";
import { selectFooterSponsors } from "./selectFooterSponsors";

export type BuildSingleItemFooterSponsorsInput = {
  assignSponsors?: AssignSponsors | null;
  /**
   * Per-item primaries from Scheduler. When this array is present (including
   * empty), it is used as-is so Creator entity-wins is not undone by fallback.
   */
  primaryForScreen?: Sponsor[] | null;
  /** Used only when primaryForScreen is absent (null/undefined). */
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
    primaryForScreen != null ? primaryForScreen : fallbackPrimary;

  return selectFooterSponsors({
    primaryForScreen: primaries,
    entities: collectEntitiesFromRows([{ assignSponsors }]),
  });
};
