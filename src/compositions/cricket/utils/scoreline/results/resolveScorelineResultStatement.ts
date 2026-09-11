export const SCORELINE_RESULT_STATEMENT_LONG_THRESHOLD = 48;

export const resolveScorelineResultStatementText = (
  result: string | undefined,
  resultShort?: string,
): string => {
  const full = result?.trim();
  if (full) {
    return full;
  }

  const short = resultShort?.trim();
  if (short) {
    return short;
  }

  return "Result pending";
};

export const resolveScorelineResultStatementLength = (
  text: string,
): "normal" | "long" =>
  text.length > SCORELINE_RESULT_STATEMENT_LONG_THRESHOLD ? "long" : "normal";
