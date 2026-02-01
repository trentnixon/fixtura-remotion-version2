import { ResultSummary } from "../../../../types";

export interface ResultStatementShortProps {
  resultShort: string;
  delay: number;
  outerContainer: object;
}

export interface ResultStatementTextProps {
  resultSummary: ResultSummary;
  delay: number;
  outerContainer: object;
  CopyVariant?: string;
}
