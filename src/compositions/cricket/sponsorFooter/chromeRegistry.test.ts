import { describe, expect, it } from "vitest";
import { resolveSponsorFooterChrome } from "./chromeRegistry";

describe("resolveSponsorFooterChrome", () => {
  it("resolves scoreline and night session chrome", () => {
    expect(resolveSponsorFooterChrome("scoreline")?.defaultSponsorStripKey).toBe(
      "scorelineSponsorStrip",
    );
    expect(
      resolveSponsorFooterChrome("nightSession")?.defaultSponsorStripKey,
    ).toBe("nightSessionSponsorStrip");
  });

  it("returns null for unknown kinds", () => {
    expect(resolveSponsorFooterChrome(undefined)).toBeNull();
  });
});
