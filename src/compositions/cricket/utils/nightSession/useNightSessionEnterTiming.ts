import { useMemo } from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import {
  createNightSessionRowEnterTiming,
  type NightSessionRowEnterTiming,
  type NightSessionRowEnterTimingOptions,
  type NightSessionSceneDurationKey,
  resolveNightSessionSceneDurationFrames,
} from "./nightSessionEnterTiming";

export const useNightSessionEnterTiming = (
  itemCount: number,
  durationKey: NightSessionSceneDurationKey = "FPS_MAIN",
  sceneDurationFramesOverride?: number,
  timingOptions?: NightSessionRowEnterTimingOptions,
): NightSessionRowEnterTiming => {
  const { data } = useVideoDataContext();
  const sceneDurationFrames =
    typeof sceneDurationFramesOverride === "number" &&
    sceneDurationFramesOverride > 0
      ? sceneDurationFramesOverride
      : resolveNightSessionSceneDurationFrames(data.timings, durationKey);

  return useMemo(
    () =>
      createNightSessionRowEnterTiming(
        itemCount,
        sceneDurationFrames,
        timingOptions,
      ),
    [itemCount, sceneDurationFrames, timingOptions],
  );
};
