import React, { CSSProperties } from "react";
import TeamLogo from "../../../../compositions/cricket/utils/primitives/TeamLogo";
import { TeamLogo as TeamLogoType } from "../../../../compositions/cricket/utils/primitives/_types/TeamLogoProps";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { getBrickworkColourRoles } from "./colours";
import {
  getLogoPlateFit,
  getLogoPlatePadding,
  LogoPlateMode,
} from "./logoPlateTokens";

export interface LogoPlateProps {
  mode: LogoPlateMode;
  logo: TeamLogoType | string | null;
  teamName: string;
  delay: number;
  /** Square plate edge length (px). Omit when filling a parent via className/style. */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Standard Brickwork logo well — neutral surface, controlled padding, mode-driven fit.
 */
export const LogoPlate: React.FC<LogoPlateProps> = ({
  mode,
  logo,
  teamName,
  delay,
  size,
  className = "",
  style,
}) => {
  const { selectedPalette } = useThemeContext();
  const roles = getBrickworkColourRoles(selectedPalette);
  const fit = getLogoPlateFit(mode);
  const padding = getLogoPlatePadding(mode);

  const plateStyle: CSSProperties = {
    boxSizing: "border-box",
    backgroundColor: roles.neutral.surfaceContrast,
    padding,
    ...(size !== undefined ? { width: size, height: size } : {}),
    ...style,
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden ${className}`}
      style={plateStyle}
    >
      <TeamLogo
        logo={logo}
        teamName={teamName}
        delay={delay}
        fit={fit}
        imgStyle={{
          width: "100%",
          height: "100%",
          objectFit: fit,
        }}
      />
    </div>
  );
};
