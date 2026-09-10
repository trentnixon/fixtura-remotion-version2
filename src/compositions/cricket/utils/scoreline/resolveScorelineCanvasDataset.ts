export type ScorelineCanvasDataset = {
  "data-ladder"?: "";
  "data-leaderboard"?: "batting" | "bowling";
  "data-roster"?: "";
  "data-totw"?: "";
};

export const resolveScorelineCanvasDataset = (
  compositionId: string | undefined,
): ScorelineCanvasDataset => {
  switch (compositionId) {
    case "CricketLadder":
      return { "data-ladder": "" };
    case "CricketTop5Batting":
      return { "data-leaderboard": "batting" };
    case "CricketTop5Bowling":
      return { "data-leaderboard": "bowling" };
    case "CricketRoster":
      return { "data-roster": "" };
    case "CricketTeamOfTheWeek":
      return { "data-totw": "" };
    default:
      return {};
  }
};
