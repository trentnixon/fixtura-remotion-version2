import { BattingStats, BowlingStats, FieldingStats } from "../../../types";

export interface BattingStatDisplayProps {
  batting: BattingStats;
  delay: number;
}

export interface BowlingStatDisplayProps {
  bowling: BowlingStats;
  delay: number;
}

export interface FieldingStatDisplayProps {
  fielding: FieldingStats;
  delay: number;
}

export interface StatItemProps {
  label: string;
  value: string | number;
  delay: number;
  highlight?: boolean;
}
