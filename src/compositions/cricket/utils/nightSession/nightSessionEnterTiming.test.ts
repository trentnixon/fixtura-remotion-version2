import { describe, expect, it } from "vitest";
import {
  calculateNightSessionInnerDelay,
  calculateNightSessionRowDelay,
  createNightSessionRowEnterTiming,
  resolveNightSessionEnterDeadlineFrames,
  resolveNightSessionRowStaggerFrames,
} from "./nightSessionEnterTiming";

describe("nightSessionEnterTiming", () => {
  it("uses half of the scene duration as the enter deadline", () => {
    expect(resolveNightSessionEnterDeadlineFrames(300)).toBe(150);
    expect(resolveNightSessionEnterDeadlineFrames(271)).toBe(135);
  });

  it("shrinks row stagger as item count grows", () => {
    const few = resolveNightSessionRowStaggerFrames(5, 300);
    const many = resolveNightSessionRowStaggerFrames(22, 300);
    expect(many).toBeLessThan(few);
    expect(many).toBeGreaterThanOrEqual(1);
  });

  it("finishes the last row enter by the 50% deadline", () => {
    const timing = createNightSessionRowEnterTiming(11, 300);
    const lastIndex = 10;
    const rowDelay = timing.rowDelayForIndex(lastIndex);
    const statsDelay = timing.innerDelay(rowDelay, "stats");
    const statsEnd = statsDelay + 13;
    expect(statsEnd).toBeLessThanOrEqual(timing.enterDeadlineFrames);
  });

  it("finishes upcoming context tier on the last card by the deadline", () => {
    const timing = createNightSessionRowEnterTiming(6, 300);
    const lastIndex = 5;
    const rowDelay = timing.rowDelayForIndex(lastIndex);
    const contextDelay = timing.innerDelay(rowDelay, "context");
    expect(contextDelay + 13).toBeLessThanOrEqual(timing.enterDeadlineFrames);
  });

  it("compresses inner tier offsets when stagger alone is not enough", () => {
    const timing = createNightSessionRowEnterTiming(40, 120);
    const rowDelay = timing.rowDelayForIndex(39);
    const statsDelay = timing.innerDelay(rowDelay, "stats");
    expect(statsDelay + 13).toBeLessThanOrEqual(timing.enterDeadlineFrames);
    expect(calculateNightSessionInnerDelay(rowDelay, "stats", 40, 120)).toBe(
      statsDelay,
    );
  });

  it("returns zero stagger for a single item", () => {
    expect(calculateNightSessionRowDelay(0, 1, 300)).toBe(0);
    expect(resolveNightSessionRowStaggerFrames(1, 300)).toBe(0);
  });

  it("allows fixed row stagger override (e.g. simultaneous results fixtures)", () => {
    expect(
      calculateNightSessionRowDelay(1, 2, 270, { rowStaggerFrames: 0 }),
    ).toBe(0);
    const timing = createNightSessionRowEnterTiming(2, 270, {
      rowStaggerFrames: 0,
    });
    expect(timing.rowDelayForIndex(0)).toBe(0);
    expect(timing.rowDelayForIndex(1)).toBe(0);
  });

  it("starts performance exits after hold and finishes last row on scene end", () => {
    const timing = createNightSessionRowEnterTiming(7, 180, {
      minHoldAfterEnterFrames: 48,
      staggerRowExits: true,
    });
    const firstExit = timing.rowExitFrameForIndex(0);
    const lastExit = timing.rowExitFrameForIndex(6);
    expect(firstExit).toBeGreaterThanOrEqual(timing.enterDeadlineFrames + 48);
    expect(lastExit + 10).toBeLessThanOrEqual(180);
    expect(lastExit).toBeGreaterThan(firstExit);
  });

  it("fits seven performance rows within a 180f screen (still at 90f)", () => {
    const timing = createNightSessionRowEnterTiming(7, 180);
    expect(timing.enterDeadlineFrames).toBe(90);
    const lastIndex = 6;
    const rowDelay = timing.rowDelayForIndex(lastIndex);
    const statsDelay = timing.innerDelay(rowDelay, "stats");
    expect(statsDelay + 13).toBeLessThanOrEqual(90);
  });
});
