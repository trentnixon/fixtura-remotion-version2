import {
  resolveSponsorFooterChrome,
  type SponsorFooterChromeKind,
} from "./chromeRegistry";

export type SponsorFooterChromePlan =
  | { kind: "hidden" }
  | {
      kind: "visible";
      chromeKind: SponsorFooterChromeKind;
      sponsorStripKey: string;
      footerHeight: number;
    };

export type PlanSponsorFooterChromeInput = {
  themeChromeKind?: SponsorFooterChromeKind;
  chromeKindOverride?: SponsorFooterChromeKind;
  sponsorStripKey?: string;
  layoutFooterHeight: number;
  heightOverride?: number;
};

export const planSponsorFooterChrome = (
  input: PlanSponsorFooterChromeInput,
): SponsorFooterChromePlan => {
  const chromeKind = input.chromeKindOverride ?? input.themeChromeKind;
  if (!chromeKind) {
    return { kind: "hidden" };
  }

  const chrome = resolveSponsorFooterChrome(chromeKind);
  if (!chrome) {
    return { kind: "hidden" };
  }

  return {
    kind: "visible",
    chromeKind,
    sponsorStripKey: input.sponsorStripKey ?? chrome.defaultSponsorStripKey,
    footerHeight: input.heightOverride ?? input.layoutFooterHeight,
  };
};
