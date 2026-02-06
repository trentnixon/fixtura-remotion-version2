import { PerformanceData } from "../../_types/types";

export interface PerformanceRowLayoutProps {
  performance: PerformanceData;
  index: number;
  rowHeight: number;
  delay: number;
}

export interface PerformanceRowLayoutPropsWithRestrictions
  extends PerformanceRowLayoutProps {
  restrictions: { nameLength: number; teamLength: number };
}
