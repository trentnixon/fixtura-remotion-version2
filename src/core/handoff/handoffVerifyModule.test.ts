import { describe, expect, it } from "vitest";
import { runHandoffDesignVerification } from "./runHandoffDesignVerification";

const repoRoot = process.cwd();

describe("runHandoffDesignVerification", () => {
  it("passes for every registered design cricket asset", () => {
    const result = runHandoffDesignVerification(repoRoot);
    expect(result.errors, result.errors.join("\n")).toEqual([]);
    expect(result.ok).toBe(true);
  });

  it("supports scoped variant + asset filters", () => {
    const result = runHandoffDesignVerification(repoRoot, {
      variant: "scoreline",
      asset: "results",
    });
    expect(result.errors, result.errors.join("\n")).toEqual([]);
    expect(result.ok).toBe(true);
  });
});
