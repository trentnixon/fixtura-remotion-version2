export type RosterPlayerBadge = { label: string; captain: boolean };

export declare function parseRosterPlayerEntry(raw: string): {
  emptyRoster: boolean;
  name: string;
  badges: RosterPlayerBadge[];
};
