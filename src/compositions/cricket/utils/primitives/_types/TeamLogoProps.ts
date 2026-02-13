/**
 * Team logo data structure
 */
export interface TeamLogo {
  url: string;
  width?: number;
  height?: number;
  id?: number;
}

/**
 * Props interface for TeamLogo component
 */
export interface TeamLogoProps {
  logo: TeamLogo | null;
  teamName: string;
  delay: number;
  size?: number;
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  bgColor?: string;
  /** Optional style merged onto the img (e.g. clipPath for angled edges). */
  imgStyle?: React.CSSProperties;
}
