import React, { CSSProperties, ReactNode } from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { getClassicSurfaceRoles } from "./colours";
import { ClassicPanelTextureOverlay } from "./PanelTextureOverlayView";

export interface ClassicTexturedSurfaceProps {
  className?: string;
  style?: CSSProperties;
  /** Defaults to Classic content surface role. */
  backgroundColor?: string;
  showSurfaceTexture?: boolean;
  children?: ReactNode;
}

/**
 * Content surface with fibre texture correctly layered under children.
 * Use this for Classic panels that are not wrapped in ClassicOffsetPanel.
 */
export const ClassicTexturedSurface: React.FC<ClassicTexturedSurfaceProps> = ({
  className = "",
  style,
  backgroundColor,
  showSurfaceTexture = true,
  children,
}) => {
  const { selectedPalette, colors } = useThemeContext();
  const roles = getClassicSurfaceRoles(selectedPalette, {
    primary: colors.primary,
    secondary: colors.secondary,
  });
  const surface = backgroundColor ?? roles.content.surface;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: surface,
        isolation: "isolate",
        ...style,
      }}
    >
      {showSurfaceTexture ? <ClassicPanelTextureOverlay /> : null}
      <div className="relative z-[2] h-full min-h-0 w-full">{children}</div>
    </div>
  );
};
