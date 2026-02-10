import { RosterDataItem } from "../../../../_types/types";
import { ColorVariant } from "../../../../../../../components/typography/AnimatedText";

/**
 * Props interface for against team (opponent) components
 */
export interface AgainstTeamProps {
  roster: RosterDataItem;
  variant?: ColorVariant;
  logoSize?: string;
}
