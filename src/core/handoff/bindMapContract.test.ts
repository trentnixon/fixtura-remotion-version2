import { describe, expect, it } from "vitest";
import {
  extractHydrateKeysFromBindMap,
  verifyBindMapHtmlContract,
} from "./bindMapContract";

describe("bindMapContract", () => {
  it("extracts hydrate keys from scalar selectors", () => {
    const keys = extractHydrateKeysFromBindMap({
      '[data-hydrate="header-title"]': "data.title",
      '[data-hydrate="club-name"]': "data.club.name",
    });
    expect(keys).toEqual(["header-title", "club-name"]);
  });

  it("reports missing scalar anchors in HTML", () => {
    const errors = verifyBindMapHtmlContract(
      '<p data-hydrate="header-title">x</p>',
      {
        '[data-hydrate="header-title"]': "data.title",
        '[data-hydrate="club-name"]': "data.club",
      },
    );
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("club-name");
  });
});
