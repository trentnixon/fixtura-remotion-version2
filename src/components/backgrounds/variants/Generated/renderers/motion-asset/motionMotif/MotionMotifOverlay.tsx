import React, { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { Lottie } from "@remotion/lottie";
import type { MotifPalette } from "./broadcastMotifLottie";
import { createBroadcastMotifLottie } from "./broadcastMotifLottie";
import {
  getTileOpacityMultiplier,
  getTilePlaybackRate,
  MOTION_MOTIF_VARIANTS,
  type MotionMotifVariantKey,
} from "./variants";

type MotionMotifOverlayProps = {
  variant: MotionMotifVariantKey;
  palette: MotifPalette;
  width: number;
  height: number;
};

export const MotionMotifOverlay: React.FC<MotionMotifOverlayProps> = ({
  variant,
  palette,
  width,
  height,
}) => {
  const settings = MOTION_MOTIF_VARIANTS[variant];
  const animationData = useMemo(
    () => createBroadcastMotifLottie(palette),
    [palette.accent, palette.line],
  );

  const renderMotif = (key: string, playbackRate = 1, opacity = 1) => (
    <div
      key={key}
      style={{
        width: "100%",
        height: "100%",
        opacity: settings.motifOpacity * opacity,
        transform: `scale(${settings.motifScale})`,
        transformOrigin: "center center",
      }}
    >
      <Lottie
        animationData={animationData}
        loop
        playbackRate={playbackRate}
        renderer="svg"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );

  if (variant !== "tiled-field" || !settings.tileCount) {
    return (
      <AbsoluteFill style={{ overflow: "hidden" }}>
        {renderMotif("center")}
      </AbsoluteFill>
    );
  }

  const tiles: React.ReactNode[] = [];
  const cellW = width / settings.tileCount;
  const cellH = height / settings.tileCount;

  for (let row = 0; row < settings.tileCount; row += 1) {
    for (let col = 0; col < settings.tileCount; col += 1) {
      const phase = (row + col) % 3;
      tiles.push(
        <AbsoluteFill
          key={`${row}-${col}`}
          style={{
            left: col * cellW,
            top: row * cellH,
            width: cellW,
            height: cellH,
            overflow: "hidden",
          }}
        >
          {renderMotif(
            `${row}-${col}`,
            getTilePlaybackRate(phase),
            getTileOpacityMultiplier(phase),
          )}
        </AbsoluteFill>,
      );
    }
  }

  return <AbsoluteFill style={{ overflow: "hidden" }}>{tiles}</AbsoluteFill>;
};
