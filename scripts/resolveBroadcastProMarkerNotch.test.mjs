/**
 * Unit tests for Broadcast Pro marker/notch helpers — run with:
 * node --test scripts/resolveBroadcastProMarkerNotch.test.mjs
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const BROADCAST_PRO_EDGE_MARKER_WIDTH_PX = {
  standard: 8,
  compact: 4,
};

const resolveBroadcastProEdgeMarkerStyle = (tier, variant, colors) => {
  const width = BROADCAST_PRO_EDGE_MARKER_WIDTH_PX[tier];
  const color =
    variant === "primary"
      ? colors.accentColor
      : variant === "secondary" && colors.secondaryColor
        ? colors.secondaryColor
        : colors.mutedColor;
  return {
    borderLeftWidth: width,
    borderLeftStyle: "solid",
    borderLeftColor: color,
  };
};

const shouldShowBroadcastProLadderZoneDivider = ({
  position,
  totalTeams,
  finalsCount = 4,
}) => {
  const cutoff = Math.max(1, Math.min(finalsCount, totalTeams));
  return totalTeams > cutoff && position === cutoff;
};

const formatBroadcastProQualificationLabel = (n) =>
  `Top ${n} Qualify for Finals`;

describe("resolveBroadcastProEdgeMarkerStyle", () => {
  it("uses 8px standard and 4px compact widths", () => {
    const colors = { accentColor: "#00e5ff", mutedColor: "rgba(255,255,255,0.2)" };
    assert.equal(
      resolveBroadcastProEdgeMarkerStyle("standard", "primary", colors)
        .borderLeftWidth,
      8,
    );
    assert.equal(
      resolveBroadcastProEdgeMarkerStyle("compact", "primary", colors)
        .borderLeftWidth,
      4,
    );
  });
});

describe("shouldShowBroadcastProLadderZoneDivider", () => {
  it("shows after last finals row when table exceeds finals count", () => {
    assert.equal(
      shouldShowBroadcastProLadderZoneDivider({
        position: 4,
        totalTeams: 6,
      }),
      true,
    );
    assert.equal(
      shouldShowBroadcastProLadderZoneDivider({
        position: 4,
        totalTeams: 4,
      }),
      false,
    );
  });
});

describe("formatBroadcastProQualificationLabel", () => {
  it("matches stitch copy", () => {
    assert.equal(formatBroadcastProQualificationLabel(4), "Top 4 Qualify for Finals");
  });
});
