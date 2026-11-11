import { describe, expect, it } from "vitest";
import {
  COMPOSITION_ROUTE_TO_EXPORT_BLOCK,
  compositionExportBlockNameFromRoute,
} from "./compositionRouteToExportBlock";

describe("compositionExportBlockNameFromRoute", () => {
  it("matches design-verify legacy map for cricket routes", () => {
    expect(compositionExportBlockNameFromRoute("cricket/results")).toBe(
      "CricketResults",
    );
    expect(compositionExportBlockNameFromRoute("cricket/top5")).toBe(
      "CricketTop5",
    );
    expect(compositionExportBlockNameFromRoute("cricket/team-roster")).toBe(
      "CricketRoster",
    );
    expect(Object.keys(COMPOSITION_ROUTE_TO_EXPORT_BLOCK).length).toBeGreaterThan(
      10,
    );
  });
});
