import React, { useId } from "react";
import { AbsoluteFill } from "remotion";
import {
  ForegroundProtection,
  LUMINANCE_LAYER_Z_INDEX,
} from "./ForegroundProtection";
import { LuminanceMappedImage } from "./LuminanceMappedImage";
import type { LuminanceRenderPlan } from "./resolveLuminanceRenderPlan";

type Props = {
  plan: LuminanceRenderPlan;
  className?: string;
  style?: React.CSSProperties;
};

/** Thin view: renders a precomputed {@link LuminanceRenderPlan}. */
export const LuminanceBackgroundView: React.FC<Props> = ({
  plan,
  className = "",
  style = {},
}) => {
  const filterInstanceId = useId();

  return (
    <AbsoluteFill
      className={`luminance-background ${className}`}
      style={{ zIndex: -1, ...style }}
      data-testid="luminance-background-root"
    >
      {plan.mode === "fallback" ? (
        <div
          data-testid="luminance-fallback"
          style={{
            position: "absolute",
            inset: 0,
            background: plan.fallbackBackground,
            zIndex: LUMINANCE_LAYER_Z_INDEX.mappedImage,
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: LUMINANCE_LAYER_Z_INDEX.mappedImage,
          }}
        >
          <LuminanceMappedImage
            src={plan.assetSrc}
            lut={plan.lut}
            filterInstanceId={filterInstanceId}
            backend={plan.backend}
            contrast={plan.contrast}
            brightness={plan.brightness}
            opacity={plan.opacity}
            objectFit={plan.objectFit}
            objectPosition={plan.objectPosition}
            supersampleScale={plan.supersampleScale}
            protectedMattes={plan.protectedMattes}
          />
        </div>
      )}

      <ForegroundProtection
        preset={plan.protectionPreset}
        scrimColor={plan.scrimColor}
        opacity={0.5}
      />
    </AbsoluteFill>
  );
};
