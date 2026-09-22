import { describe, expect, it } from "vitest";
import { resolveBroadcastProCopyVariant } from "./copy-variant";
import { broadcastProTheme } from "../../variants/broadcastPro/theme";
import { broadcastProRoundedTheme } from "../../variants/broadcastProRounded/theme";

describe("resolveBroadcastProCopyVariant", () => {
  it("uses container copy inside a container, including titles on chips", () => {
    expect(
      resolveBroadcastProCopyVariant({ surface: "container", role: "copy" }),
    ).toBe("onContainerCopy");
    expect(
      resolveBroadcastProCopyVariant({ surface: "container", role: "title" }),
    ).toBe("onContainerCopy");
  });

  it("uses non-container title on the scene background", () => {
    expect(
      resolveBroadcastProCopyVariant({ surface: "background", role: "title" }),
    ).toBe("onContainerTitle");
  });

  it("uses copy-without-background for copy on the scene", () => {
    expect(
      resolveBroadcastProCopyVariant({ surface: "background", role: "copy" }),
    ).toBe("onContainerCopyNoBg");
  });
});

describe("Broadcast Pro theme contract", () => {
  it("fills the 1080×1350 canvas with header, asset, and footer", () => {
    const { header, asset, footer } = broadcastProTheme.layout.heights;
    expect(header + asset + footer).toBe(1350);
  });

  it("keeps the header between 180px and 220px", () => {
    expect(broadcastProTheme.layout.heights.header).toBeGreaterThanOrEqual(180);
    expect(broadcastProTheme.layout.heights.header).toBeLessThanOrEqual(220);
  });

  it("lets the secondary headline wrap", () => {
    expect(broadcastProTheme.broadcastProHeadlineSizing?.secondaryWraps).toBe(
      true,
    );
    expect(
      broadcastProTheme.componentStyles.broadcastProHeadlineSecondary.className,
    ).not.toMatch(/whitespace-nowrap/);
  });

  it("keeps the header org crest smaller than the old 104px badge", () => {
    expect(
      broadcastProTheme.broadcastProHeadlineSizing?.headerOrgCrestPx,
    ).toBeLessThan(104);
    expect(
      broadcastProTheme.broadcastProHeadlineSizing?.headerOrgCrestPx,
    ).toBeGreaterThan(0);
  });

  it("fits crest, title, and chip inside the header height", () => {
    const header = broadcastProTheme.layout.heights.header;
    const sizing = broadcastProTheme.broadcastProHeadlineSizing;
    expect(sizing).toBeDefined();
    const LOGO_GAP = 8;
    const CHIP_GAP = 8;
    const CHIP_BLOCK = 40;
    const stack =
      (sizing?.headerOrgCrestPx ?? 0) +
      LOGO_GAP +
      (sizing?.mainHeaderMaxPx ?? 0) * (sizing?.lineHeight ?? 1) +
      CHIP_GAP +
      CHIP_BLOCK;
    expect(stack).toBeLessThanOrEqual(header);
  });

  it("keeps in-container copy the same in Alt modes and flips only titles", () => {
    expect(broadcastProTheme.mode.light.text.copy).toBe(
      broadcastProTheme.mode.lightAlt.text.copy,
    );
    expect(broadcastProTheme.mode.dark.text.copy).toBe(
      broadcastProTheme.mode.darkAlt.text.copy,
    );
    expect(broadcastProTheme.mode.light.text.title).not.toBe(
      broadcastProTheme.mode.lightAlt.text.title,
    );
    expect(broadcastProTheme.mode.dark.text.title).not.toBe(
      broadcastProTheme.mode.darkAlt.text.title,
    );
  });

  it("maps player, team, and Top 5 names onto Teko or Rajdhani without font-black", () => {
    const { playerName, teamName, ladderTeamName } =
      broadcastProTheme.componentStyles;
    const top5 = broadcastProTheme.componentStyles.Top5PlayerName;
    for (const role of [playerName, teamName, top5]) {
      expect(role.className).toMatch(/font-teko|font-rajdhani/);
      expect(role.className).not.toMatch(/font-black/);
    }
    expect(ladderTeamName.className).toMatch(/font-rajdhani/);
    expect(
      broadcastProTheme.componentStyles.broadcastProScoreTableRank.className,
    ).toMatch(/font-rajdhani/);
  });
});

describe("Broadcast Pro Rounded theme contract", () => {
  it("matches Broadcast Pro zone heights", () => {
    expect(broadcastProRoundedTheme.layout.heights).toEqual(
      broadcastProTheme.layout.heights,
    );
  });

  it("lets the secondary headline wrap", () => {
    expect(
      broadcastProRoundedTheme.broadcastProRoundedHeadlineSizing
        ?.secondaryWraps,
    ).toBe(true);
  });
});
