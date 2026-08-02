import type { ResultSummary } from "../../../results/_types/types";
import type { BroadcastProRoundedResultMatchData } from "./types";

export type BroadcastProRoundedVerdictAbandoned = {
  kind: "abandoned";
  status: string;
  result?: string;
};

export type BroadcastProRoundedVerdictHero = {
  kind: "hero";
  winner: string;
  contextLine: string;
};

export type BroadcastProRoundedVerdictCompact = {
  kind: "compact";
  line: string;
};

export type BroadcastProRoundedVerdictModel =
  | BroadcastProRoundedVerdictAbandoned
  | BroadcastProRoundedVerdictHero
  | BroadcastProRoundedVerdictCompact;

const swapResultWord = (
  resultWord: string,
  lostReplacement = "Lost to",
  wonReplacement = "defeated",
): string => {
  const normalizedWord = resultWord.toLowerCase().trim();

  if (normalizedWord === "lost") {
    return lostReplacement;
  }
  if (normalizedWord === "won") {
    return wonReplacement;
  }

  return resultWord;
};

const getLoserTeam = (summary: ResultSummary): string =>
  summary.winner === summary.homeTeam ? summary.awayTeam : summary.homeTeam;

export const buildVerdictContextLine = (
  resultShort: string | undefined,
  summary: ResultSummary,
): string => {
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

export const buildCompactVerdictLine = (
  match: Pick<
    BroadcastProRoundedResultMatchData,
    "resultShort" | "resultSummary"
  >,
): string | null => {
  const short = match.resultShort?.trim();
  if (short) {
    return short;
  }

  if (match.resultSummary) {
    const { homeTeam, resultWord, winner } = match.resultSummary;
    return `${homeTeam} ${resultWord} to ${winner}`;
  }

  return null;
};

export const buildBroadcastProRoundedVerdictModel = (
  match: BroadcastProRoundedResultMatchData,
): BroadcastProRoundedVerdictModel | null => {
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
    return {
      kind: "compact",
      line: compactLine,
    };
  }

  return null;
};
