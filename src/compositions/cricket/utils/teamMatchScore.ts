const normalizeScore = (rawScore?: string | null): string => {
  const score = (rawScore || "").trim();
  if (score.length === 0 || score.toUpperCase() === "N/A") {
    return "Yet to Bat";
  }
  return score;
};

const getFirstInningsDisplay = (
  matchType: string,
  inningsValue?: string | null,
): { show: boolean; value: string } => {
  if (matchType !== "Two Day+") {
    return { show: false, value: "" };
  }
  const value = (inningsValue || "").trim();
  if (value.length === 0) return { show: false, value: "" };
  const lowered = value.toLowerCase();
  if (lowered === "1" || lowered === "n/a" || lowered === "yet to bat") {
    return { show: false, value: "" };
  }
  const looksLikeScore =
    /\d+\s*\/\s*\d+/.test(value) || /\bd\//i.test(value) || value.includes("&");
  if (!looksLikeScore) return { show: false, value: "" };
  return { show: true, value };
};

export type ResolvedTeamMatchScore = {
  current: string;
  prior: string | null;
};

/** Current innings score plus optional prior innings line for Two Day+ displays. */
export const resolveTeamMatchScore = (
  matchType: string,
  rawScore?: string | null,
  firstInningsField?: string | null,
): ResolvedTeamMatchScore => {
  const fromField = getFirstInningsDisplay(matchType, firstInningsField);
  if (fromField.show) {
    return {
      current: normalizeScore(rawScore),
      prior: fromField.value,
    };
  }

  const trimmed = (rawScore || "").trim();
  if (matchType !== "Two Day+" || !trimmed.includes("&")) {
    return { current: normalizeScore(rawScore), prior: null };
  }

  const ampIndex = trimmed.indexOf("&");
  const beforeAmp = trimmed.slice(0, ampIndex).trim();
  const afterAmp = trimmed.slice(ampIndex + 1).trim();
  if (!beforeAmp || !afterAmp) {
    return { current: normalizeScore(rawScore), prior: null };
  }

  return {
    current: normalizeScore(afterAmp),
    prior: `${beforeAmp} &`,
  };
};
