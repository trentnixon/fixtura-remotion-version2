import { useCurrentFrame, useVideoConfig } from "remotion";
import { THREE_SCENE_LOOP_DURATION_IN_SECONDS } from "./sceneConstants";

export const useLoopProgress = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loopFrames = fps * THREE_SCENE_LOOP_DURATION_IN_SECONDS;
  return (frame % loopFrames) / loopFrames;
};
