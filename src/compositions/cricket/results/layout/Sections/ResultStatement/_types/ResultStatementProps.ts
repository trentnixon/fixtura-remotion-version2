import { ResultSummary } from "../../../../_types/types";

export interface ResultStatementShortProps {
  resultShort: string;
  delay: number;
  outerContainer: object;
  variant?: string;
}

export interface ResultStatementTextProps {
  resultSummary: ResultSummary;
  delay: number;
  outerContainer: object;
  variant?: string;
}
