import { describe, expect, it } from "vitest";
import { groupGamesByGradeDate } from "./groupGamesByGradeDate";
import { countNightSessionUpcomingEnterItems } from "./countNightSessionUpcomingEnterItems";
import type { GameData } from "../../../upcoming/_types/types";

const game = (
  id: string,
  gradeName: string,
  date: string,
  time: string,
): GameData =>
  ({
    gameID: id,
    gradeName,
    date,
    time,
    teamHome: "A",
    teamAway: "B",
    type: "",
    round: null,
    gender: "",
    ground: "",
    prompt: "",
    ageGroup: "",
    teamAwayLogo: null,
    teamHomeLogo: null,
    assignSponsors: { teamAway: "", teamHome: "" },
  }) as GameData;

describe("groupGamesByGradeDate", () => {
  it("nests date under grade without time buckets", () => {
    const result = groupGamesByGradeDate([
      game("1", "Seniors", "Sat 1", "10:00"),
      game("2", "Seniors", "Sat 1", "14:00"),
      game("3", "Seniors", "Sun 2", "09:00"),
    ]);

    expect(result).toEqual([
      {
        gradeName: "Seniors",
        dateGroups: [
          {
            dateLabel: "Sat 1",
            games: [
              game("1", "Seniors", "Sat 1", "10:00"),
              game("2", "Seniors", "Sat 1", "14:00"),
            ],
          },
          {
            dateLabel: "Sun 2",
            games: [game("3", "Seniors", "Sun 2", "09:00")],
          },
        ],
      },
    ]);
  });
});

describe("countNightSessionUpcomingEnterItems", () => {
  it("counts grade, date, separators, and cards in ledger order", () => {
    const groups = groupGamesByGradeDate([
      game("1", "Seniors", "Sat 1", "10:00"),
      game("2", "Seniors", "Sat 1", "14:00"),
      game("3", "Seniors", "Sun 2", "09:00"),
    ]);

    expect(countNightSessionUpcomingEnterItems(groups)).toBe(9);
  });
});
