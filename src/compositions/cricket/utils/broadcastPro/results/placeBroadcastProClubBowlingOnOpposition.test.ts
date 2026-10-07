import { describe, expect, it } from "vitest";
import type { Team } from "../../../results/_types/types";
import { placeBroadcastProClubBowlingOnOpposition } from "./placeBroadcastProClubBowlingOnOpposition";

const side = (name: string, isClubTeam: boolean, bowler: string): Team => ({
  logo: { url: "", width: 0, height: 0 },
  name,
  overs: "20",
  score: "100",
  isHome: isClubTeam,
  isClubTeam,
  battingPerformances: [],
  bowlingPerformances: [
    {
      runs: 12,
      team: name,
      overs: 4,
      player: bowler,
      economy: "3",
      maidens: 0,
      wickets: 1,
    },
  ],
});

describe("placeBroadcastProClubBowlingOnOpposition", () => {
  it("leaves both bowling lists in place for an association account", () => {
    const homeTeam = side("Club", true, "Club Bowler");
    const awayTeam = side("Oppo", false, "Oppo Bowler");
    expect(
      placeBroadcastProClubBowlingOnOpposition(homeTeam, awayTeam, false),
    ).toEqual({ homeTeam, awayTeam });
  });

  it("puts the home club's bowling under the away score", () => {
    const homeTeam = side("Club", true, "Club Bowler");
    const awayTeam = side("Oppo", false, "Oppo Bowler");
    const placed = placeBroadcastProClubBowlingOnOpposition(
      homeTeam,
      awayTeam,
      true,
    );
    expect(placed.homeTeam.bowlingPerformances[0]?.player).toBe("Club Bowler");
    expect(placed.awayTeam.bowlingPerformances[0]?.player).toBe("Club Bowler");
  });

  it("puts the away club's bowling under the home score", () => {
    const homeTeam = side("Oppo", false, "Oppo Bowler");
    const awayTeam = side("Club", true, "Club Bowler");
    const placed = placeBroadcastProClubBowlingOnOpposition(
      homeTeam,
      awayTeam,
      true,
    );
    expect(placed.homeTeam.bowlingPerformances[0]?.player).toBe("Club Bowler");
    expect(placed.awayTeam.bowlingPerformances[0]?.player).toBe("Club Bowler");
  });
});
