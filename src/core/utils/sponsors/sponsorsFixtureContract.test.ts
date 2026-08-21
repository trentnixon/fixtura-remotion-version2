import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const samplesRoot = join(process.cwd(), "testData", "samples");

const walkJson = (dir: string): string[] => {
  const out: string[] = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, name.name);
    if (name.isDirectory()) {
      out.push(...walkJson(full));
    } else if (name.name.endsWith(".json")) {
      out.push(full);
    }
  }
  return out;
};

const collectSponsorBlocks = (value: unknown, path: string, hits: string[]) => {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((item, i) =>
      collectSponsorBlocks(item, `${path}[${i}]`, hits),
    );
    return;
  }
  const record = value as Record<string, unknown>;
  if ("sponsors" in record || "Sponsors" in record) {
    const sponsors = (record.sponsors ?? record.Sponsors) as
      | Record<string, unknown>
      | undefined;
    if (sponsors && typeof sponsors === "object" && "default" in sponsors) {
      hits.push(`${path}.${"sponsors" in record ? "sponsors" : "Sponsors"}`);
    }
  }
  for (const [key, child] of Object.entries(record)) {
    collectSponsorBlocks(child, `${path}.${key}`, hits);
  }
};

describe("sponsors fixture contract (v2 hard-cut)", () => {
  it("no sample ships legacy sponsors.default as account sponsor source", () => {
    const hits: string[] = [];
    for (const file of walkJson(samplesRoot)) {
      const json = JSON.parse(readFileSync(file, "utf8")) as unknown;
      collectSponsorBlocks(json, file.replace(samplesRoot, "samples"), hits);
    }
    expect(hits).toEqual([]);
  });
});
