import { RosterDataItem } from "../../../_types/types";

/**
 * Props interface for RosterPlayerList component
 */
export interface RosterPlayerListProps {
  roster: RosterDataItem;
  className?: string;
  gap?: string;
}
