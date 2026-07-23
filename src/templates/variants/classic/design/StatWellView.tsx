import React, { CSSProperties, ReactNode } from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { getClassicSurfaceRoles } from "./colours";
import {
  ClassicStatWellAlign,
  ClassicStatWellVariant,
  ClassicStatWellWidth,
  getClassicStatWellLayoutTokens,
  getClassicStatWellSurfaceStyles,
} from "./statWell";

export interface ClassicStatWellProps {
  variant?: ClassicStatWellVariant;
  width?: ClassicStatWellWidth;
  align?: ClassicStatWellAlign;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Recessed numerical compartment (or contrast band for non-numeric cells).
 */
export const ClassicStatWell: React.FC<ClassicStatWellProps> = ({
  variant = "recessed",
  width = "compact",
  align = "center",
  className = "",
  style,
  children,
}) => {
  const { selectedPalette, colors } = useThemeContext();
  const roles = getClassicSurfaceRoles(selectedPalette, {
    primary: colors.primary,
    secondary: colors.secondary,
  });
  const layoutTokens = getClassicStatWellLayoutTokens(width, align);
  const surfaceStyles = getClassicStatWellSurfaceStyles(roles, variant);

  const isHugWidth = layoutTokens.widthClass.includes("w-auto");

  return (
    <div
      className={`relative z-10 whitespace-nowrap leading-none ${layoutTokens.alignClass} ${layoutTokens.widthClass} ${layoutTokens.paddingClass} ${className}`}
      style={{
        ...surfaceStyles,
        ...(layoutTokens.minWidthPx != null
          ? { minWidth: layoutTokens.minWidthPx }
          : null),
        ...(isHugWidth ? { width: "fit-content" } : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
