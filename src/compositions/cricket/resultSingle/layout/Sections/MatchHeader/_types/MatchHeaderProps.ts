export interface MatchHeaderProps {
  date?: string;
  type?: string;
  round: string;
  ground: string;
  height: number;
  delay: number;
  className?: string;
  backgroundColor?: string;
  CopyVariant?: string;
}

export interface RoundGroundProps extends MatchHeaderProps {
  userBackgroundColor?: string;
  variant?: string;
}
