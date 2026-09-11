import { describe, expect, it } from "vitest";
import {
  resolveScorelineResultStatementLength,
  resolveScorelineResultStatementText,
} from "./resolveScorelineResultStatement";

describe("resolveScorelineResultStatementText", () => {
  it("prefers full result over resultShort", () => {
    expect(
      resolveScorelineResultStatementText(
        "Coomera won by 5 wickets",
        "Coomera def Mudgeeraba Blue",
      ),
    ).toBe("Coomera won by 5 wickets");
  });

  it("falls back to resultShort then pending copy", () => {
    expect(resolveScorelineResultStatementText("", "Short headline")).toBe(
      "Short headline",
    );
    expect(resolveScorelineResultStatementText("", "")).toBe("Result pending");
  });
});

describe("resolveScorelineResultStatementLength", () => {
  it("marks statements longer than 48 characters as long", () => {
    const long =
      "Surfers Paradise won by an absolutely enormous margin of two hundred and thirty one runs";
    expect(resolveScorelineResultStatementLength(long)).toBe("long");
    expect(
      resolveScorelineResultStatementLength("Surfers Paradise won by 231 runs"),
    ).toBe("normal");
  });
});
