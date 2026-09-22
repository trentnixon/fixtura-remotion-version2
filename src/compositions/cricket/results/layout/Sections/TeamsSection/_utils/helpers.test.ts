import { describe, expect, it } from "vitest";
import { resolveTeamMatchScore } from "../../../../../utils/teamMatchScore";

describe("resolveTeamMatchScore", () => {
  it("splits composite Two Day+ score when first-innings field is null", () => {
    expect(resolveTeamMatchScore("Two Day+", "10/242 & 2/82", null)).toEqual({
      prior: "10/242 &",
      current: "2/82",
    });
  });

  it("uses first-innings field when provided", () => {
    expect(resolveTeamMatchScore("Two Day+", "2/82", "10/242 &")).toEqual({
      prior: "10/242 &",
      current: "2/82",
    });
  });

  it("returns a single score when there is no ampersand", () => {
    expect(resolveTeamMatchScore("Two Day+", "10/216", null)).toEqual({
      prior: null,
      current: "10/216",
    });
  });

  it("ignores composite split for non Two Day+ matches", () => {
    expect(resolveTeamMatchScore("One Day", "10/242 & 2/82", null)).toEqual({
      prior: null,
      current: "10/242 & 2/82",
    });
  });
});
