import {
  compositeSurfaceColor,
  resolveBroadcastProCoreAccentOnSurface,
  resolveBroadcastProCoreCopyOnBackground,
  resolveBroadcastProCoreTextOnContainer,
  resolveBroadcastProCoreTextOnGlass,
  type BroadcastProCoreTextOnContainer,
} from "../broadcastProCore";

export type BroadcastProRoundedTextOnContainer = BroadcastProCoreTextOnContainer;

export {
  compositeSurfaceColor,
  resolveBroadcastProCoreAccentOnSurface as resolveBroadcastProRoundedAccentOnSurface,
  resolveBroadcastProCoreCopyOnBackground as resolveBroadcastProRoundedCopyOnBackground,
  resolveBroadcastProCoreTextOnContainer as resolveBroadcastProRoundedTextOnContainer,
  resolveBroadcastProCoreTextOnGlass as resolveBroadcastProRoundedTextOnGlass,
};
