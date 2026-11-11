export type OverlayCanvasDataset = {
  "data-ladder"?: "";
  "data-leaderboard"?: "batting" | "bowling";
  "data-roster"?: "";
  "data-totw"?: "";
  "data-result-single"?: "";
  "data-upcoming"?: "";
};

/** Composition metadata id → canvas `data-*` contract (design prototype + Remotion). */
export const resolveOverlayCanvasDataset = (
  compositionId: string | undefined,
): OverlayCanvasDataset => {
  switch (compositionId) {
    case "CricketLadder":
      return { "data-ladder": "" };
    case "CricketTop5Batting":
      return { "data-leaderboard": "batting" };
    case "CricketTop5Bowling":
      return { "data-leaderboard": "bowling" };
    case "CricketBattingPerformances":
      return { "data-leaderboard": "batting" };
    case "CricketBowlingPerformances":
      return { "data-leaderboard": "bowling" };
    case "CricketRoster":
      return { "data-roster": "" };
    case "CricketTeamOfTheWeek":
      return { "data-totw": "" };
    case "CricketResultSingle":
      return { "data-result-single": "" };
    case "CricketUpcoming":
      return { "data-upcoming": "" };
    default:
      return {};
  }
};
