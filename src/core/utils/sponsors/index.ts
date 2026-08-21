export { asSponsorArray } from "./asSponsorArray";

export {
  FOOTER_SPONSOR_MAX,
  selectFooterSponsors,
} from "./selectFooterSponsors";
export type { SelectFooterSponsorsInput } from "./selectFooterSponsors";

export {
  OUTRO_SPONSOR_PAGE_SIZE,
  OUTRO_PAGE_ANIMATE_IN_FRAMES,
  OUTRO_PAGE_HOLD_FRAMES,
  OUTRO_PAGE_ANIMATE_OUT_FRAMES,
  OUTRO_PAGE_DURATION_FRAMES,
  OUTRO_PAGE_LOGO_EXIT_FRAME,
  OUTRO_NO_SPONSORS_DURATION_FRAMES,
  buildOutroSponsorSequence,
  chunkSponsors,
  countOutroSponsors,
  calculateOutroDurationFromSponsors,
} from "./outroSponsors";
export type { BuildOutroSponsorSequenceInput } from "./outroSponsors";

export {
  buildMultiRowFooterSponsors,
  collectEntitiesFromRows,
} from "./buildMultiRowFooterSponsors";
export type { FooterSponsorRow } from "./buildMultiRowFooterSponsors";

export { buildSingleItemFooterSponsors } from "./buildSingleItemFooterSponsors";
export type { BuildSingleItemFooterSponsorsInput } from "./buildSingleItemFooterSponsors";

export {
  INTRO_PRIMARY_SPONSOR_MAX,
  getIntroPrimarySponsors,
} from "./getIntroPrimarySponsors";
