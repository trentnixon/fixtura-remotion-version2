import type { Sponsor } from "../../../../core/types/data/sponsors";
import type { RosterDataItem } from "../_types/types";

export const buildRosterFooterSponsors = (
  roster: RosterDataItem,
): Sponsor[] => {
  return (roster.sponsors ?? [])
    .filter((sponsor) => sponsor?.logo?.url)
    .map((sponsor) => ({
      id: sponsor.id,
      name: sponsor.name,
      logo: {
        id: sponsor.logo.id,
        url: sponsor.logo.url,
        width: sponsor.logo.width,
        height: sponsor.logo.height,
      },
    }));
};
