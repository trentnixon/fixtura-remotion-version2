import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import { fileURLToPath } from "node:url";
import {
  assertSharedFixtureShape,
  comparePngExact,
  parseApprovalRecord,
  parseDualIngressSection,
  MATRIX_ROWS,
  SHARED_FIXTURE_PATH,
  loadSharedFixture,
} from "../../../../../../scripts/generated-backgrounds-phase-0-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tmpDir = path.join(__dirname, ".tmp-phase0");

describe("generated backgrounds phase-0 lib", () => {
  it("rejects shared fixtures missing foreground locks", () => {
    expect(() =>
      assertSharedFixtureShape({
        width: 1080,
        height: 1350,
        fps: 30,
        frame: 0,
        palette: { id: "primary", appearanceTheme: {} },
        foreground: { text: {}, logo: {}, card: {} },
      }),
    ).toThrow(/foreground\.text\.content/);
  });

  it("loads the locked shared.json fixture", () => {
    expect(fs.existsSync(SHARED_FIXTURE_PATH)).toBe(true);
    expect(() => assertSharedFixtureShape(loadSharedFixture())).not.toThrow();
  });

  it("derives outputsMatch from zero differing pixels only", () => {
    fs.mkdirSync(tmpDir, { recursive: true });
    const makePng = (file: string, fill: number) => {
      const png = new PNG({ width: 4, height: 4 });
      for (let i = 0; i < png.data.length; i += 4) {
        png.data[i] = fill;
        png.data[i + 1] = fill;
        png.data[i + 2] = fill;
        png.data[i + 3] = 255;
      }
      fs.writeFileSync(file, PNG.sync.write(png));
    };
    const a = path.join(tmpDir, "a.png");
    const b = path.join(tmpDir, "b.png");
    const c = path.join(tmpDir, "c.png");
    makePng(a, 0);
    makePng(b, 0);
    makePng(c, 255);
    expect(comparePngExact(a, b)).toMatchObject({
      differingPixels: 0,
      outputsMatch: "yes",
    });
    expect(comparePngExact(a, c).outputsMatch).toBe("no");
    expect(comparePngExact(a, c).differingPixels).toBeGreaterThan(0);
  });

  it("parses approval rows and dual-ingress measurements", () => {
    const markdown = `# Phase 0 approval record

## Dual-ingress pairs

### G-geo ↔ N-geo
- differingPixels: 0
- outputsMatch: yes

## G-geo — Geometric field
- rowId: G-geo
- workingName: Geometric field
- wireIngress: Graphics geometric
- stillPath: \`stills/G-geo.png\`
- productDecision: unresolved
- engineeringResult: unresolved
`;
    expect(parseDualIngressSection(markdown)[0].fields.differingPixels).toBe(
      "0",
    );
    expect(parseApprovalRecord(markdown)[0].rowId).toBe("G-geo");
    expect(MATRIX_ROWS).toHaveLength(13);
  });
});
