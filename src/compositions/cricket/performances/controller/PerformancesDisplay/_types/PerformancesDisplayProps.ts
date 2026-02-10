import { PerformanceData } from "../../../_types/types";
import { AssignSponsors } from "../../../../_types/composition-types";

export interface PerformancesDisplayProps {
  performances: PerformanceData[];
  itemsPerScreen: number;
  screenIndex: number;
}

export interface PerformancesDisplayWithSponsorsProps
  extends PerformancesDisplayProps {
  assignSponsors: AssignSponsors;
}
