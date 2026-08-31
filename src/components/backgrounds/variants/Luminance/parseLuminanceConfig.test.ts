import { describe, expect, it } from "vitest";
import { parseLuminanceMapConfig } from "./parseLuminanceConfig";

describe("parseLuminanceMapConfig", () => {
  it("accepts theme presets", () => {
    expect(parseLuminanceMapConfig({ kind: "theme", preset: "brand" })).toEqual(
      { kind: "theme", preset: "brand" },
    );
  });

  it("accepts explicit stops", () => {
    expect(
      parseLuminanceMapConfig({
        kind: "stops",
        stops: [
          { position: 0, color: "#000000" },
          { position: 1, color: "#ffffff" },
        ],
      }),
    ).toMatchObject({ kind: "stops" });
  });

  it("rejects fewer than two stops", () => {
    expect(() =>
      parseLuminanceMapConfig({
        kind: "stops",
        stops: [{ position: 0, color: "#000000" }],
      }),
    ).toThrow();
  });

  it("rejects unsorted stops", () => {
    expect(() =>
      parseLuminanceMapConfig({
        kind: "stops",
        stops: [
          { position: 0.8, color: "#111111" },
          { position: 0.2, color: "#222222" },
        ],
      }),
    ).toThrow(/sorted/i);
  });

  it("rejects duplicate stop positions", () => {
    expect(() =>
      parseLuminanceMapConfig({
        kind: "stops",
        stops: [
          { position: 0.5, color: "#111111" },
          { position: 0.5, color: "#222222" },
        ],
      }),
    ).toThrow(/duplicate/i);
  });

  it("rejects invalid colors", () => {
    expect(() =>
      parseLuminanceMapConfig({
        kind: "stops",
        stops: [
          { position: 0, color: "not-a-color" },
          { position: 1, color: "#ffffff" },
        ],
      }),
    ).toThrow();
  });
});
