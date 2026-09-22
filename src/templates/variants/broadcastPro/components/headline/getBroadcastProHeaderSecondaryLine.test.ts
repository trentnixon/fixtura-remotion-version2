import { describe, expect, it } from "vitest";
import type { VideoMetadata } from "../../../../../core/types/data/videoData";
import {
  getBroadcastProHeaderSecondaryLine,
  shouldHideBroadcastProHeaderSecondary,
} from "./getBroadcastProHeaderSecondaryLine";

const metadata = (videoTitle: string): VideoMetadata => ({
  title: "Team List",
  titleSplit: ["Team", "List"],
  videoTitle,
  assetId: 32,
  assetTypeId: 1,
  compositionId: "CricketRoster",
  includeSponsors: true,
});

describe("getBroadcastProHeaderSecondaryLine", () => {
  it("removes the CricketRoster asset token from the video title", () => {
    expect(
      getBroadcastProHeaderSecondaryLine(
        metadata("Western Suburbs Cricket Club CricketRoster"),
        "Western Suburbs Cricket Club",
      ),
    ).toBe("Western Suburbs Cricket Club");
  });

  it("falls back when the asset token is the whole video title", () => {
    expect(
      getBroadcastProHeaderSecondaryLine(
        metadata("CricketRoster"),
        "Western Suburbs Cricket Club",
      ),
    ).toBe("Team · List");
  });
});

describe("shouldHideBroadcastProHeaderSecondary", () => {
  it("hides the metadata chip on ladder, top 5, performances, results, result single, upcoming, and team of the week", () => {
    expect(shouldHideBroadcastProHeaderSecondary("CricketLadder")).toBe(true);
    expect(shouldHideBroadcastProHeaderSecondary("CricketTop5Batting")).toBe(
      true,
    );
    expect(shouldHideBroadcastProHeaderSecondary("CricketTop5Bowling")).toBe(
      true,
    );
    expect(
      shouldHideBroadcastProHeaderSecondary("CricketBattingPerformances"),
    ).toBe(true);
    expect(
      shouldHideBroadcastProHeaderSecondary("CricketBowlingPerformances"),
    ).toBe(true);
    expect(shouldHideBroadcastProHeaderSecondary("CricketResults")).toBe(true);
    expect(shouldHideBroadcastProHeaderSecondary("CricketResultSingle")).toBe(
      true,
    );
    expect(shouldHideBroadcastProHeaderSecondary("CricketUpcoming")).toBe(true);
    expect(shouldHideBroadcastProHeaderSecondary("CricketTeamOfTheWeek")).toBe(
      true,
    );
  });

  it("keeps the chip on roster", () => {
    expect(shouldHideBroadcastProHeaderSecondary("CricketRoster")).toBe(false);
  });
});
