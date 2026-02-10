import { RosterDataItem } from "../../../../_types/types";
import { ColorVariant } from "../../../../../../../components/typography/AnimatedText";

/**
 * Props interface for against team (opponent) components
 * Note: Used by SmallOpponentCard which displays the account holder team as the opponent
 */
export interface AgainstTeamProps {
  roster: RosterDataItem;
  variant?: ColorVariant;
  logoSize?: string;
}
