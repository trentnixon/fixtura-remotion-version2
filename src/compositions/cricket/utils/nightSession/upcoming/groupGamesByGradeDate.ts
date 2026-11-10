import type { GameData } from "../../../upcoming/_types/types";

export type NightSessionDateGroup = {
  dateLabel: string;
  games: GameData[];
};

export type NightSessionGradeGroup = {
  gradeName: string;
  dateGroups: NightSessionDateGroup[];
};

const label = (value: string | null | undefined): string => value?.trim() ?? "";

/** Preserve screen order; merge adjacent rows sharing grade and date. */
export function groupGamesByGradeDate(
  games: GameData[],
): NightSessionGradeGroup[] {
  const gradeGroups: NightSessionGradeGroup[] = [];

  for (const game of games) {
    const gradeName = label(game.gradeName);
    const dateLabel = label(game.date);

    let gradeGroup = gradeGroups.at(-1);
    if (!gradeGroup || gradeGroup.gradeName !== gradeName) {
      gradeGroup = { gradeName, dateGroups: [] };
      gradeGroups.push(gradeGroup);
    }

    let dateGroup = gradeGroup.dateGroups.at(-1);
    if (!dateGroup || dateGroup.dateLabel !== dateLabel) {
      dateGroup = { dateLabel, games: [] };
      gradeGroup.dateGroups.push(dateGroup);
    }

    dateGroup.games.push(game);
  }

  return gradeGroups;
}
