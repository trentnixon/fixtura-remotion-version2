import { useCurrentFrame, useVideoConfig } from "remotion";

export const LOOP_DURATION_IN_SECONDS = 12;

export const useLoopTiming = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;
  const pulse = 0.5 + Math.sin(loopProgress * Math.PI * 2) * 0.5;

  return { frame, loopProgress, pulse };
};
