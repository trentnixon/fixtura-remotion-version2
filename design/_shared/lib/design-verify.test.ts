import { describe, expect, it } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runDesignVerify } from "./design-verify.js";

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("design-verify explore", () => {
  it("passes for grandfathered variants and materialized starters", () => {
    const result = runDesignVerify(repoRoot, { handoff: false });
    expect(result.errors, result.errors.join("\n")).toEqual([]);
    expect(result.ok).toBe(true);
  });
});
