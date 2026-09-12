import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const packageDir = dirname(fileURLToPath(import.meta.url));
const root = join(packageDir, "../..");
const generatedFile = join(packageDir, "generated/scorelineBundledCss.ts");

describe("inline-scoreline-css", () => {
  it("generates bundled CSS module with Scoreline layout selectors", () => {
    execSync("node scripts/inline-scoreline-css.mjs", {
      cwd: root,
      stdio: "pipe",
    });

    expect(existsSync(generatedFile)).toBe(true);

    const content = readFileSync(generatedFile, "utf8");
    expect(content).toContain("SCORELINE_BUNDLED_CSS");
    expect(content).toContain(".scoreline-canvas");
    expect(content).toContain(".results-ledger");
  });
});
