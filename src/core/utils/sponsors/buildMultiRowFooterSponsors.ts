import { AssignSponsors, Sponsor } from "../../types/data/sponsors";
import { selectFooterSponsors } from "./selectFooterSponsors";

export type FooterSponsorRow = {
  assignSponsors?: AssignSponsors | null;
  primaryForScreen?: Sponsor[] | null;
};

/** Collect entity sponsors from every row's grade and team buckets (row order). */
export const collectEntitiesFromRows = (rows: FooterSponsorRow[]): Sponsor[] => {
  const entities: Sponsor[] = [];
  for (const row of rows) {
    const assign = row.assignSponsors;
    if (!assign) continue;
    entities.push(...(assign.grade ?? []), ...(assign.team ?? []));
  }
  return entities;
};

/**
 * Footer logos for multi-row content screens (Results / Upcoming).
 * Entities from all rows; primary fill from the first row's primaryForScreen.
 */
export const buildMultiRowFooterSponsors = (
  rows: FooterSponsorRow[],
): Sponsor[] => {
  if (rows.length === 0) return [];
  return selectFooterSponsors({
    primaryForScreen: rows[0].primaryForScreen ?? [],
    entities: collectEntitiesFromRows(rows),
  });
};
