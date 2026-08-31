import { describe, expect, it } from "vitest";
import { parseLuminanceMapConfig } from "./parseLuminanceConfig";

const validProtectedSegments = [
  { kind: "solid" as const, from: 0, to: 0.05, color: "#000000" },
  { kind: "solid" as const, from: 0.05, to: 0.15, color: "#224466" },
  {
    kind: "gradient" as const,
    from: 0.15,
    to: 0.85,
    fromColor: "#224466",
    toColor: "#8899aa",
  },
  { kind: "solid" as const, from: 0.85, to: 0.95, color: "#8899aa" },
  { kind: "solid" as const, from: 0.95, to: 1, color: "#FFFFFF" },
];

describe("parseLuminanceMapConfig segments", () => {
  it("accepts a full-coverage segment map", () => {
    expect(
      parseLuminanceMapConfig({
        kind: "segments",
        segments: validProtectedSegments,
      }),
    ).toMatchObject({ kind: "segments" });
  });

  it("accepts protected-brand theme preset with custom core and transition widths", () => {
    expect(
      parseLuminanceMapConfig({
        kind: "theme",
        preset: "protected-brand",
        protectedEndpointCore: 0.02,
        endpointTransitionWidth: 0.06,
        brandSolidWidth: 0.07,
      }),
    ).toEqual({
      kind: "theme",
      preset: "protected-brand",
      protectedEndpointCore: 0.02,
      endpointTransitionWidth: 0.06,
      brandSolidWidth: 0.07,
    });
  });

  it("rejects protected-brand layouts that leave no midtone room", () => {
    expect(() =>
      parseLuminanceMapConfig({
        kind: "theme",
        preset: "protected-brand",
        protectedEndpointCore: 0.2,
        endpointTransitionWidth: 0.2,
        brandSolidWidth: 0.2,
      }),
    ).toThrow(/midtone/i);
  });

  it("rejects overlapping segments", () => {
    expect(() =>
      parseLuminanceMapConfig({
        kind: "segments",
        segments: [
          { kind: "solid", from: 0, to: 0.6, color: "#000000" },
          { kind: "solid", from: 0.5, to: 1, color: "#ffffff" },
        ],
      }),
    ).toThrow(/overlap/i);
  });

  it("rejects gaps between segments", () => {
    expect(() =>
      parseLuminanceMapConfig({
        kind: "segments",
        segments: [
          { kind: "solid", from: 0, to: 0.4, color: "#000000" },
          { kind: "solid", from: 0.5, to: 1, color: "#ffffff" },
        ],
      }),
    ).toThrow(/gap/i);
  });

  it("rejects segments that do not start at 0", () => {
    expect(() =>
      parseLuminanceMapConfig({
        kind: "segments",
        segments: [{ kind: "solid", from: 0.1, to: 1, color: "#ffffff" }],
      }),
    ).toThrow(/start at 0/i);
  });

  it("rejects segments that do not end at 1", () => {
    expect(() =>
      parseLuminanceMapConfig({
        kind: "segments",
        segments: [{ kind: "solid", from: 0, to: 0.9, color: "#000000" }],
      }),
    ).toThrow(/end at 1/i);
  });

  it("rejects zero-width segments", () => {
    expect(() =>
      parseLuminanceMapConfig({
        kind: "segments",
        segments: [
          { kind: "solid", from: 0, to: 0, color: "#000000" },
          { kind: "solid", from: 0, to: 1, color: "#ffffff" },
        ],
      }),
    ).toThrow(/positive width/i);
  });

  it("rejects invalid segment colors", () => {
    expect(() =>
      parseLuminanceMapConfig({
        kind: "segments",
        segments: [{ kind: "solid", from: 0, to: 1, color: "not-a-color" }],
      }),
    ).toThrow();
  });
});
