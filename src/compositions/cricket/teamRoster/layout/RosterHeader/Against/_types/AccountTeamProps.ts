import { RosterDataItem } from "../../../../_types/types";
import { ColorVariant } from "../../../../../../../components/typography/AnimatedText";

/**
 * Props interface for account team header components
 * Note: Used by LargeTeamHeader which displays the against team as the main team
 */
export interface AccountTeamProps {
  roster: RosterDataItem;
  variant?: ColorVariant;
  logoSize?: string;
  backgroundColor?: string;
}
