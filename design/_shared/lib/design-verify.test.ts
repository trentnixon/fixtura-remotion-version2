import { describe, expect, it } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runDesignVerify } from "./design-verify.js";
import { runHandoffDesignVerification } from "../../../src/core/handoff/runHandoffDesignVerification";

const repoRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);

describe("design-verify explore", () => {
  it("passes for grandfathered variants and materialized starters", () => {
    const result = runDesignVerify(repoRoot, { handoff: false });
    expect(result.errors, result.errors.join("\n")).toEqual([]);
    expect(result.ok).toBe(true);
  });
});

describe("design-verify handoff", () => {
  it("passes for scoreline results (registry + routing + theme + contracts)", () => {
    const explore = runDesignVerify(repoRoot, {
      handoff: false,
      variant: "scoreline",
      asset: "results",
    });
    expect(explore.errors, explore.errors.join("\n")).toEqual([]);
    expect(explore.ok).toBe(true);

    const handoff = runHandoffDesignVerification(repoRoot, {
      variant: "scoreline",
      asset: "results",
    });
    expect(handoff.errors, handoff.errors.join("\n")).toEqual([]);
    expect(handoff.ok).toBe(true);
  });
});
