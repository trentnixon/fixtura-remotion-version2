import {
  compositeSurfaceColor,
  resolveBroadcastProCoreAccentOnSurface,
  resolveBroadcastProCoreCopyOnBackground,
  resolveBroadcastProCoreTextOnContainer,
  resolveBroadcastProCoreTextOnGlass,
  type BroadcastProCoreTextOnContainer,
} from "../broadcastProCore";

export type BroadcastProTextOnContainer = BroadcastProCoreTextOnContainer;

export {
  compositeSurfaceColor,
  resolveBroadcastProCoreAccentOnSurface as resolveBroadcastProAccentOnSurface,
  resolveBroadcastProCoreCopyOnBackground as resolveBroadcastProCopyOnBackground,
  resolveBroadcastProCoreTextOnContainer as resolveBroadcastProTextOnContainer,
  resolveBroadcastProCoreTextOnGlass as resolveBroadcastProTextOnGlass,
};
