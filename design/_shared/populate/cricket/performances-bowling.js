import {
  syncNightSessionLeaderboardDensity,
  syncScorelineLeaderboardLayout,
} from "../../scoreline-layout.js";

export function populatePerformancesBowling() {
  syncScorelineLeaderboardLayout(document);
  syncNightSessionLeaderboardDensity(document);
}
