import React, { CSSProperties, ReactNode } from "react";
import { TextureOverlay, TextureOverlayProps } from "./TextureOverlayView";

export interface BrickworkAssetAtmosphereProps extends Partial<TextureOverlayProps> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Full asset-area atmosphere wrapper — texture covers entire region, content stays above. */
export const BrickworkAssetAtmosphere: React.FC<BrickworkAssetAtmosphereProps> = ({
  children,
  className = "",
  style,
  ...textureProps
}) => (
  <div className={`relative h-full w-full ${className}`} style={style}>
    <TextureOverlay variant="grain" {...textureProps} />
    <div className="relative z-10 h-full w-full">{children}</div>
  </div>
);
