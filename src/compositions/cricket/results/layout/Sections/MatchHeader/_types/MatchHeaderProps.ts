export interface MatchHeaderProps {
  date?: string;
  type?: string;
  round: string;
  ground?: string;
  grade?: string;
  height: number;
  delay: number;
  backgroundColor: string;
  className?: string;
  CopyVariant?: string;
}

export interface SingleDataPointHeaderProps {
  grade: string;
  height: number;
  delay: number;
  backgroundColor: string;
  align: string;
  variant?: string;
}
