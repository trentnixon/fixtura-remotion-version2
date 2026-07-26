/**
 * Unit tests for parseCricketScore — run with: node scripts/parseCricketScore.test.mjs
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const YET_TO_BAT = "Yet to Bat";

const normalize = (value) => value.trim();

const parseMatchScore = (value) => {
  const trimmed = normalize(value);

  if (!trimmed || trimmed.toUpperCase() === "N/A") {
    return { kind: "yetToBat", display: YET_TO_BAT };
  }

  if (trimmed.toLowerCase() === YET_TO_BAT.toLowerCase()) {
    return { kind: "yetToBat", display: YET_TO_BAT };
  }

  const wicketsRuns = /^(\d+)\/(\d+)$/.exec(trimmed);
  if (wicketsRuns) {
    return {
      kind: "wicketsRuns",
      wickets: wicketsRuns[1],
      runs: wicketsRuns[2],
      display: `${wicketsRuns[1]}/${wicketsRuns[2]}`,
    };
  }

  if (/^\d+$/.test(trimmed)) {
    return { kind: "runsOnly", runs: trimmed, display: trimmed };
  }

  return { kind: "plain", primary: trimmed, display: trimmed };
};

const parsePlayerStat = (value) => {
  const trimmed = normalize(value);

  if (!trimmed) {
    return { kind: "plain", primary: "", display: "" };
  }

  const batting = /^(\d+\*?)\s*(\(\d+\))?$/.exec(trimmed);
  if (batting) {
    const primary = batting[1];
    const suffix = batting[2];
    return {
      kind: "batting",
      primary,
      suffix,
      display: suffix ? `${primary} ${suffix}` : primary,
    };
  }

  const bowling = /^(\d+\/\d+)\s*(\(\d+(?:\.\d+)?\))?$/.exec(trimmed);
  if (bowling) {
    const primary = bowling[1];
    const suffix = bowling[2];
    return {
      kind: "bowling",
      primary,
      suffix,
      display: suffix ? `${primary} ${suffix}` : primary,
    };
  }

  return { kind: "plain", primary: trimmed, display: trimmed };
};

describe("parseMatchScore", () => {
  it("parses wickets/runs", () => {
    assert.deepEqual(parseMatchScore("8/284"), {
      kind: "wicketsRuns",
      wickets: "8",
      runs: "284",
      display: "8/284",
    });
  });

  it("parses runs only", () => {
    assert.deepEqual(parseMatchScore("171"), {
      kind: "runsOnly",
      runs: "171",
      display: "171",
    });
  });

  it("normalises yet to bat", () => {
    assert.deepEqual(parseMatchScore("Yet to Bat"), {
      kind: "yetToBat",
      display: "Yet to Bat",
    });
    assert.deepEqual(parseMatchScore("N/A"), {
      kind: "yetToBat",
      display: "Yet to Bat",
    });
  });

  it("falls back for unknown formats", () => {
    assert.deepEqual(parseMatchScore("TBC"), {
      kind: "plain",
      primary: "TBC",
      display: "TBC",
    });
  });
});

describe("parsePlayerStat", () => {
  it("parses batting with not-out and balls", () => {
    assert.deepEqual(parsePlayerStat("33* (14)"), {
      kind: "batting",
      primary: "33*",
      suffix: "(14)",
      display: "33* (14)",
    });
  });

  it("parses batting without suffix", () => {
    assert.deepEqual(parsePlayerStat("24"), {
      kind: "batting",
      primary: "24",
      suffix: undefined,
      display: "24",
    });
  });

  it("parses bowling figures", () => {
    assert.deepEqual(parsePlayerStat("1/26 (3)"), {
      kind: "bowling",
      primary: "1/26",
      suffix: "(3)",
      display: "1/26 (3)",
    });
  });

  it("parses economy-style plain values", () => {
    assert.deepEqual(parsePlayerStat("8.4"), {
      kind: "plain",
      primary: "8.4",
      display: "8.4",
    });
  });
});
