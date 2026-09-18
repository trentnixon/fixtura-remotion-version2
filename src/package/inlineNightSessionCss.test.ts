import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const packageDir = dirname(fileURLToPath(import.meta.url));
const root = join(packageDir, "../..");
const generatedFile = join(packageDir, "generated/nightSessionBundledCss.ts");

describe("inline-night-session-css", () => {
  it("generates bundled CSS module with Night Session layout selectors", () => {
    execSync("node scripts/inline-night-session-css.mjs", {
      cwd: root,
      stdio: "pipe",
    });

    expect(existsSync(generatedFile)).toBe(true);

    const content = readFileSync(generatedFile, "utf8");
    expect(content).toContain("NIGHT_SESSION_BUNDLED_CSS");
    expect(content).toContain(".night-session-canvas");
    expect(content).toContain(".leaderboard-ledger");
  });
});
