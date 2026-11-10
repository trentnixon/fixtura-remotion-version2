import type { NightSessionGradeGroup } from "./groupGamesByGradeDate";

/** Ledger enter steps: grade rail, date rail, creases, and fixture cards (display order). */
export function countNightSessionUpcomingEnterItems(
  gradeGroups: NightSessionGradeGroup[],
): number {
  let count = 0;

  for (const gradeGroup of gradeGroups) {
    if (gradeGroup.gradeName) {
      count += 1;
    }
    for (const dateGroup of gradeGroup.dateGroups) {
      if (dateGroup.dateLabel) {
        count += 2;
      }
      const gameCount = dateGroup.games.length;
      if (gameCount > 0) {
        count += gameCount;
        count += Math.max(0, gameCount - 1);
      }
    }
  }

  return count;
}
