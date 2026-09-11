/** Row density when a performance screen shows more than five leaderboard rows. */
export type PerformanceScreenDensity = "compact" | "tight";

export const resolvePerformanceScreenDensity = (
  rowCount: number,
): PerformanceScreenDensity | undefined => {
  if (rowCount <= 5) {
    return undefined;
  }

  if (rowCount === 6) {
    return "compact";
  }

  return "tight";
};
