export type BroadcastProModeName = "light" | "lightAlt" | "dark" | "darkAlt";

export type BroadcastProImageEffectType =
  | "none"
  | "zoom"
  | "pan"
  | "kenburns"
  | "breathing"
  | "focusblur"
  | "coloroverlay";

export type BroadcastProImageOverlayStyle =
  | "none"
  | "solid"
  | "gradient"
  | "vignette";

export type BroadcastProPanDirection = "left" | "right" | "up" | "down";

export interface BroadcastProImageInput {
  effectType?: string;
  overlayStyle?: string;
  overlayOpacity?: number;
  overlayColor?: string;
  zoomIntensity?: number;
  panDirection?: string;
  panIntensity?: number;
  width?: number;
  height?: number;
  ratio?: "landscape" | "portrait" | "square";
}

export interface BroadcastProImageDefaults {
  effectType: BroadcastProImageEffectType;
  overlayStyle: Exclude<BroadcastProImageOverlayStyle, "none">;
  overlayOpacity: number;
  overlayColor: string;
  zoomIntensity: number;
  panDirection: BroadcastProPanDirection;
  panIntensity: number;
}

export const BROADCAST_PRO_MAX_ZOOM = 1.08;
export const BROADCAST_PRO_DEFAULT_OVERLAY_OPACITY = 0.5;
export const BROADCAST_PRO_SLOW_PAN_INTENSITY = 6;

const DENSE_TABLE_COMPOSITIONS = new Set([
  "CricketLadder",
  "CricketResults",
  "CricketRoster",
]);

const MOTION_EFFECTS = new Set<BroadcastProImageEffectType>([
  "zoom",
  "pan",
  "kenburns",
  "breathing",
  "focusblur",
]);

const normalizeEffect = (raw?: string): BroadcastProImageEffectType => {
  const value = (raw ?? "none").toLowerCase().replace(/[-_]/g, "");
  switch (value) {
    case "zoom":
      return "zoom";
    case "pan":
      return "pan";
    case "kenburns":
    case "kb":
      return "kenburns";
    case "breathing":
    case "pulse":
      return "breathing";
    case "focusblur":
    case "blur":
      return "focusblur";
    case "coloroverlay":
      return "coloroverlay";
    default:
      return "none";
  }
};

const normalizeOverlay = (raw?: string): BroadcastProImageOverlayStyle => {
  const value = (raw ?? "").toLowerCase();
  if (
    value === "solid" ||
    value === "gradient" ||
    value === "vignette" ||
    value === "none"
  ) {
    return value;
  }
  return "vignette";
};

const overlayColorForMode = (mode: BroadcastProModeName): string => {
  if (mode === "dark" || mode === "darkAlt") {
    return "rgba(255, 255, 255, 1)";
  }
  return "rgba(0, 0, 0, 1)";
};

const resolveStillRatio = (
  image?: BroadcastProImageInput,
  stillRatio?: number,
): number | undefined => {
  if (stillRatio != null) return stillRatio;
  if (image?.width && image.height) return image.width / image.height;
  if (image?.ratio === "portrait") return 0.6;
  if (image?.ratio === "landscape") return 1.6;
  return undefined;
};

const resolvePanDirection = ({
  requested,
  stillRatio,
}: {
  requested?: string;
  stillRatio?: number;
}): BroadcastProPanDirection => {
  const isPortrait = stillRatio != null && stillRatio < 0.7;
  const isLandscape = stillRatio != null && stillRatio > 1.3;
  if (isPortrait) return "up";
  if (isLandscape) return "left";
  if (
    requested === "left" ||
    requested === "right" ||
    requested === "up" ||
    requested === "down"
  ) {
    return requested;
  }
  return "left";
};

export const resolveBroadcastProImageDefaults = ({
  mode,
  image,
  stillRatio,
  compositionId,
}: {
  mode: BroadcastProModeName;
  image?: BroadcastProImageInput;
  stillRatio?: number;
  compositionId?: string;
}): BroadcastProImageDefaults => {
  let effectType = normalizeEffect(image?.effectType);
  const denseTable =
    compositionId != null && DENSE_TABLE_COMPOSITIONS.has(compositionId);

  if (denseTable && effectType === "pan") {
    effectType = "none";
  }

  let overlayStyle = normalizeOverlay(image?.overlayStyle);
  if (overlayStyle === "none" && MOTION_EFFECTS.has(effectType)) {
    overlayStyle = "vignette";
  }
  if (overlayStyle === "none") {
    overlayStyle = "vignette";
  }

  const requestedOpacity = image?.overlayOpacity;
  const overlayOpacity =
    requestedOpacity != null && requestedOpacity > BROADCAST_PRO_DEFAULT_OVERLAY_OPACITY
      ? requestedOpacity
      : BROADCAST_PRO_DEFAULT_OVERLAY_OPACITY;

  const zoomIntensity = Math.min(
    image?.zoomIntensity ?? BROADCAST_PRO_MAX_ZOOM,
    BROADCAST_PRO_MAX_ZOOM,
  );

  const panDirection = resolvePanDirection({
    requested: image?.panDirection,
    stillRatio: resolveStillRatio(image, stillRatio),
  });

  const panIntensity = denseTable
    ? 0
    : Math.min(
        image?.panIntensity ?? BROADCAST_PRO_SLOW_PAN_INTENSITY,
        BROADCAST_PRO_SLOW_PAN_INTENSITY,
      );

  return {
    effectType,
    overlayStyle,
    overlayOpacity,
    overlayColor: image?.overlayColor ?? overlayColorForMode(mode),
    zoomIntensity,
    panDirection,
    panIntensity,
  };
};
