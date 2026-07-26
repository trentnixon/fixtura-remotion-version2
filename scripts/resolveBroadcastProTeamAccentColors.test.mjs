/**
 * Unit tests for resolveBroadcastProTeamAccentColors — run with:
 * node --test scripts/resolveBroadcastProTeamAccentColors.test.mjs
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const PRIMARY = "#00e5ff";
const SECONDARY = "#ffb2b9";

const getClubSide = ({ isAccountClub, homeIsClub, awayIsClub }) => {
  if (!isAccountClub) return null;
  if (homeIsClub && !awayIsClub) return "home";
  if (!homeIsClub && awayIsClub) return "away";
  return null;
};

const isHomeWinner = (summary, homeName, awayName) => {
  const winner = summary.winner.trim();
  if (winner === homeName.trim()) return true;
  if (winner === awayName.trim()) return false;
  return true;
};

const assignBySide = (primarySide, primary, secondary) => {
  if (primarySide === "home") {
    return {
      home: primary,
      away: secondary,
      homeRole: "primary",
      awayRole: "secondary",
    };
  }
  if (primarySide === "away") {
    return {
      home: secondary,
      away: primary,
      homeRole: "secondary",
      awayRole: "primary",
    };
  }
  return {
    home: primary,
    away: secondary,
    homeRole: "primary",
    awayRole: "secondary",
  };
};

const resolveBroadcastProTeamAccentColors = (input) => {
  const { match, isAccountClub, primary, secondary } = input;
  const { homeTeam, awayTeam, resultSummary } = match;

  const clubSide = getClubSide({
    isAccountClub,
    homeIsClub: homeTeam.isClubTeam,
    awayIsClub: awayTeam.isClubTeam,
  });

  if (clubSide != null) {
    return assignBySide(clubSide, primary, secondary);
  }

  if (resultSummary?.winner) {
    const homeWon = isHomeWinner(
      resultSummary,
      homeTeam.name,
      awayTeam.name,
    );
    return assignBySide(homeWon ? "home" : "away", primary, secondary);
  }

  return assignBySide("home", primary, secondary);
};

describe("resolveBroadcastProTeamAccentColors", () => {
  it("club video: home club gets primary (Falcons home win)", () => {
    const result = resolveBroadcastProTeamAccentColors({
      isAccountClub: true,
      primary: PRIMARY,
      secondary: SECONDARY,
      match: {
        status: "Final",
        homeTeam: { name: "Strathmore Heights PVHCC Falcons", isClubTeam: true },
        awayTeam: { name: "Sydenham Hillside U14 Girls", isClubTeam: false },
        resultSummary: {
          winner: "Strathmore Heights PVHCC Falcons",
          homeTeam: "Strathmore Heights PVHCC Falcons",
          awayTeam: "Sydenham Hillside U14 Girls",
          resultWord: "won",
        },
      },
    });
    assert.equal(result.home, PRIMARY);
    assert.equal(result.away, SECONDARY);
    assert.equal(result.homeRole, "primary");
    assert.equal(result.awayRole, "secondary");
  });

  it("club video: away club gets primary even when away wins", () => {
    const result = resolveBroadcastProTeamAccentColors({
      isAccountClub: true,
      primary: PRIMARY,
      secondary: SECONDARY,
      match: {
        status: "Final",
        homeTeam: { name: "East Keilor U12", isClubTeam: false },
        awayTeam: { name: "Strathmore Heights U12", isClubTeam: true },
        resultSummary: {
          winner: "Strathmore Heights U12",
          homeTeam: "East Keilor U12",
          awayTeam: "Strathmore Heights U12",
          resultWord: "won",
        },
      },
    });
    assert.equal(result.home, SECONDARY);
    assert.equal(result.away, PRIMARY);
    assert.equal(result.homeRole, "secondary");
    assert.equal(result.awayRole, "primary");
  });

  it("club video: away club keeps primary when club loses", () => {
    const result = resolveBroadcastProTeamAccentColors({
      isAccountClub: true,
      primary: PRIMARY,
      secondary: SECONDARY,
      match: {
        status: "Final",
        homeTeam: { name: "Jacana CUBS U14", isClubTeam: false },
        awayTeam: { name: "Strathmore Heights U14 Mixed (Fri)", isClubTeam: true },
        resultSummary: {
          winner: "Jacana CUBS U14",
          homeTeam: "Jacana CUBS U14",
          awayTeam: "Strathmore Heights U14 Mixed (Fri)",
          resultWord: "won",
        },
      },
    });
    assert.equal(result.home, SECONDARY);
    assert.equal(result.away, PRIMARY);
    assert.equal(result.awayRole, "primary");
  });

  it("association: winner gets primary when neither is club", () => {
    const result = resolveBroadcastProTeamAccentColors({
      isAccountClub: false,
      primary: PRIMARY,
      secondary: SECONDARY,
      match: {
        status: "Final",
        homeTeam: { name: "Jacana CUBS U14", isClubTeam: false },
        awayTeam: { name: "Strathmore Heights U14 Mixed (Fri)", isClubTeam: false },
        resultSummary: {
          winner: "Jacana CUBS U14",
          homeTeam: "Jacana CUBS U14",
          awayTeam: "Strathmore Heights U14 Mixed (Fri)",
          resultWord: "won",
        },
      },
    });
    assert.equal(result.home, PRIMARY);
    assert.equal(result.away, SECONDARY);
  });

  it("association: away winner gets primary", () => {
    const result = resolveBroadcastProTeamAccentColors({
      isAccountClub: false,
      primary: PRIMARY,
      secondary: SECONDARY,
      match: {
        status: "Final",
        homeTeam: { name: "East Keilor U12", isClubTeam: false },
        awayTeam: { name: "Strathmore Heights U12", isClubTeam: false },
        resultSummary: {
          winner: "Strathmore Heights U12",
          homeTeam: "East Keilor U12",
          awayTeam: "Strathmore Heights U12",
          resultWord: "won",
        },
      },
    });
    assert.equal(result.home, SECONDARY);
    assert.equal(result.away, PRIMARY);
  });

  it("positional fallback when no winner data", () => {
    const result = resolveBroadcastProTeamAccentColors({
      isAccountClub: false,
      primary: PRIMARY,
      secondary: SECONDARY,
      match: {
        status: "Abandoned",
        homeTeam: { name: "Team A", isClubTeam: false },
        awayTeam: { name: "Team B", isClubTeam: false },
      },
    });
    assert.equal(result.home, PRIMARY);
    assert.equal(result.away, SECONDARY);
  });
});
