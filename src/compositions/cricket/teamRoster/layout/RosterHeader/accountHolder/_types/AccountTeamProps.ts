import { RosterDataItem } from "../../../../_types/types";
import { ColorVariant } from "../../../../../../../components/typography/AnimatedText";

/**
 * Props interface for account team header components
 */
export interface AccountTeamProps {
  roster: RosterDataItem;
  variant?: ColorVariant;
  logoSize?: string;
  backgroundColor?: string;
  /** When true, removes margin and padding from container and logo wrapper */
  compact?: boolean;
}
