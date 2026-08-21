import { PerformanceData } from "../../../_types/types";
import { AssignSponsors } from "../../../../_types/composition-types";
import type { Sponsor } from "../../../../../../core/types/data/sponsors";

export interface PerformancesDisplayProps {
  performances: PerformanceData[];
  itemsPerScreen: number;
  screenIndex: number;
}

export interface PerformancesDisplayWithSponsorsProps
  extends PerformancesDisplayProps {
  assignSponsors?: AssignSponsors;
  footerSponsors?: Sponsor[];
}
