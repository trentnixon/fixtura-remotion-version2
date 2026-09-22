import { describe, expect, it } from "vitest";
import type { VideoMetadata } from "../../../../../core/types/data/videoData";
import {
  getBroadcastProRoundedHeaderSecondaryLine,
  shouldHideBroadcastProRoundedHeaderSecondary,
} from "./getBroadcastProRoundedHeaderSecondaryLine";

const metadata = (videoTitle: string): VideoMetadata => ({
  title: "Team List",
  titleSplit: ["Team", "List"],
  videoTitle,
  assetId: 32,
  assetTypeId: 1,
  compositionId: "CricketRoster",
  includeSponsors: true,
});

describe("getBroadcastProRoundedHeaderSecondaryLine", () => {
  it("removes the CricketRoster asset token from the video title", () => {
    expect(
      getBroadcastProRoundedHeaderSecondaryLine(
        metadata("Western Suburbs Cricket Club CricketRoster"),
        "Western Suburbs Cricket Club",
      ),
    ).toBe("Western Suburbs Cricket Club");
  });

  it("falls back when the asset token is the whole video title", () => {
    expect(
      getBroadcastProRoundedHeaderSecondaryLine(
        metadata("CricketRoster"),
        "Western Suburbs Cricket Club",
      ),
    ).toBe("Team · List");
  });
});

describe("shouldHideBroadcastProRoundedHeaderSecondary", () => {
  it("hides the secondary chip on ladder, results, and team of the week", () => {
    expect(shouldHideBroadcastProRoundedHeaderSecondary("CricketLadder")).toBe(
      true,
    );
    expect(shouldHideBroadcastProRoundedHeaderSecondary("CricketResults")).toBe(
      true,
    );
    expect(
      shouldHideBroadcastProRoundedHeaderSecondary("CricketTeamOfTheWeek"),
    ).toBe(true);
  });
});
