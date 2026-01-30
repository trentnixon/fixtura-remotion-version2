// Shared helpers for team sections to avoid duplication

export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

// Normalizes scores so that "N/A" renders as "Yet to Bat"
export const normalizeScore = (rawScore?: string | null): string => {
  const score = (rawScore || "").trim();
  if (score.length === 0 || score.toUpperCase() === "N/A") {
    return "Yet to Bat";
  }
  return score;
};

// Only render a legitimate first-innings string (not placeholders)
export const getFirstInningsDisplay = (
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
