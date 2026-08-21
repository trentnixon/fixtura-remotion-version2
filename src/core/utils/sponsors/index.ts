export {
  FOOTER_SPONSOR_MAX,
  selectFooterSponsors,
} from "./selectFooterSponsors";
export type { SelectFooterSponsorsInput } from "./selectFooterSponsors";

export {
  OUTRO_SPONSOR_PAGE_SIZE,
  buildOutroSponsorSequence,
  chunkSponsors,
} from "./outroSponsors";
export type { BuildOutroSponsorSequenceInput } from "./outroSponsors";

export {
  buildMultiRowFooterSponsors,
  collectEntitiesFromRows,
} from "./buildMultiRowFooterSponsors";
export type { FooterSponsorRow } from "./buildMultiRowFooterSponsors";

export { buildSingleItemFooterSponsors } from "./buildSingleItemFooterSponsors";
export type { BuildSingleItemFooterSponsorsInput } from "./buildSingleItemFooterSponsors";
