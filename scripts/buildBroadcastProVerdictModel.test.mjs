/**
 * Unit tests for buildBroadcastProVerdictModel — run with:
 * node --test scripts/buildBroadcastProVerdictModel.test.mjs
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const swapResultWord = (resultWord) => {
  const normalizedWord = resultWord.toLowerCase().trim();
  if (normalizedWord === "lost") return "Lost to";
  if (normalizedWord === "won") return "defeated";
  return resultWord;
};

const getLoserTeam = (summary) =>
  summary.winner === summary.homeTeam ? summary.awayTeam : summary.homeTeam;

const buildVerdictContextLine = (resultShort, summary) => {
  const short = resultShort?.trim();

  if (short) {
    const wonByMatch = /won by (.+)$/i.exec(short);
    if (wonByMatch) {
      return `won by ${wonByMatch[1].trim()}`;
    }

    const defIndex = short.toLowerCase().indexOf(" def ");
    if (defIndex >= 0) {
      return short.slice(defIndex + 1).trim();
    }
  }

  const loser = getLoserTeam(summary);
  const word = swapResultWord(summary.resultWord);
  return `${word} ${loser}`;
};

const buildCompactVerdictLine = (match) => {
  const short = match.resultShort?.trim();
  if (short) return short;

  if (match.resultSummary) {
    const { homeTeam, resultWord, winner } = match.resultSummary;
    return `${homeTeam} ${resultWord} to ${winner}`;
  }

  return null;
};

const buildBroadcastProVerdictModel = (match) => {
  if (match.status === "Abandoned") {
    return {
      kind: "abandoned",
      status: match.status,
      result: match.result?.trim() || undefined,
    };
  }

  if (match.resultSummary) {
    return {
      kind: "hero",
      winner: match.resultSummary.winner,
      contextLine: buildVerdictContextLine(
        match.resultShort,
        match.resultSummary,
      ),
    };
  }

  const compactLine = buildCompactVerdictLine(match);
  if (compactLine) {
    return { kind: "compact", line: compactLine };
  }

  return null;
};

describe("buildBroadcastProVerdictModel", () => {
  it("returns abandoned verdict", () => {
    assert.deepEqual(
      buildBroadcastProVerdictModel({
        status: "Abandoned",
        result: "Match abandoned due to rain",
        resultShort: "",
      }),
      {
        kind: "abandoned",
        status: "Abandoned",
        result: "Match abandoned due to rain",
      },
    );
  });

  it("returns hero verdict from resultSummary with def context", () => {
    const summary = {
      winner: "Strathmore Heights PVHCC Falcons",
      homeTeam: "Strathmore Heights PVHCC Falcons",
      awayTeam: "Sydenham Hillside U14 Girls",
      resultWord: "won",
    };

    assert.deepEqual(
      buildBroadcastProVerdictModel({
        status: "Final",
        resultShort:
          "Strathmore Heights PVHCC Falcons def Sydenham Hillside U14 Girls",
        resultSummary: summary,
      }),
      {
        kind: "hero",
        winner: "Strathmore Heights PVHCC Falcons",
        contextLine: "def Sydenham Hillside U14 Girls",
      },
    );
  });

  it("extracts won by margin for hero context", () => {
    const summary = {
      winner: "Team A",
      homeTeam: "Team A",
      awayTeam: "Team B",
      resultWord: "won",
    };

    assert.equal(
      buildVerdictContextLine("Team A won by 108 runs", summary),
      "won by 108 runs",
    );
  });

  it("returns compact verdict when only resultShort exists", () => {
    assert.deepEqual(
      buildBroadcastProVerdictModel({
        status: "Final",
        resultShort: "Team A def Team B",
      }),
      {
        kind: "compact",
        line: "Team A def Team B",
      },
    );
  });

  it("returns null when no verdict data", () => {
    assert.equal(buildBroadcastProVerdictModel({ status: "Final" }), null);
  });
});
