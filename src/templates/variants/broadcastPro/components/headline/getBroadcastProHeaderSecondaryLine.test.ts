import { describe, expect, it } from "vitest";
import type { VideoMetadata } from "../../../../../core/types/data/videoData";
import { getBroadcastProHeaderSecondaryLine } from "./getBroadcastProHeaderSecondaryLine";

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
