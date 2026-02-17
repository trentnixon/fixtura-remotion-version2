export interface TopSectionProps {
  teamName: string;
  delay: number;
  delayName?: number;
  style?: React.CSSProperties;
  variant?: string;
  className?: string;
}

export interface TeamNameWrappedProps {
  teamName: string;
  delay: number;
  outerStyles: object;
  innerStyles: object;
  /** Text color variant (e.g. onContainerCopyNoBg) */
  variant?: string;
}
