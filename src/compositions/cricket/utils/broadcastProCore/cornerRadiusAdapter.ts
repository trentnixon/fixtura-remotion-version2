import type { ThemeLayout } from "../../../../templates/types/global/theme-shared";

export const DEFAULT_BROADCAST_PRO_CONTAINER_RADIUS = "rounded-none";
export const DEFAULT_BROADCAST_PRO_IMAGE_RADIUS = "rounded-none";

type LayoutRadius = Pick<ThemeLayout, "borderRadius">;

/** Container / panel radius from theme layout (square vs rounded variant dimension). */
export const resolveBroadcastProContainerRadius = (
  layout: LayoutRadius,
): string => layout.borderRadius.container || DEFAULT_BROADCAST_PRO_CONTAINER_RADIUS;

/** Crest / image radius; falls back to container radius. */
export const resolveBroadcastProImageRadius = (layout: LayoutRadius): string =>
  layout.borderRadius.image ??
  layout.borderRadius.container ??
  DEFAULT_BROADCAST_PRO_IMAGE_RADIUS;

export const broadcastProGlassPanelClass = (
  layout: LayoutRadius,
  opts?: { overflowHidden?: boolean; extraClassName?: string },
): string => {
  const parts = [
    opts?.overflowHidden ? "overflow-hidden" : "",
    resolveBroadcastProContainerRadius(layout),
    opts?.extraClassName ?? "",
  ].filter(Boolean);
  return parts.join(" ").trim();
};
