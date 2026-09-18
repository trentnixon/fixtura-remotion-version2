import {
  syncNightSessionLeaderboardDensity,
  syncScorelineLeaderboardLayout,
} from "../../scoreline-layout.js";

export function populatePerformancesBatting() {
  syncScorelineLeaderboardLayout(document);
  syncNightSessionLeaderboardDensity(document);
}
