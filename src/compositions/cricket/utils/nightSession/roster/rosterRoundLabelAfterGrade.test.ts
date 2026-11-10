import { describe, expect, it } from "vitest";
import { rosterRoundLabelAfterGrade } from "./rosterRoundLabelAfterGrade";

describe("rosterRoundLabelAfterGrade", () => {
  it("strips grade prefix from round", () => {
    expect(
      rosterRoundLabelAfterGrade(
        "2022 T20 World Cup",
        "2022 T20 World Cup — First Round",
      ),
    ).toBe("First Round");
  });

  it("returns empty when round equals grade", () => {
    expect(rosterRoundLabelAfterGrade("Grade A", "Grade A")).toBe("");
  });

  it("returns full round when it does not share grade prefix", () => {
    expect(rosterRoundLabelAfterGrade("Grade A", "Grand Final")).toBe(
      "Grand Final",
    );
  });
});
