/**
 * RosterHeader Components Index
 * Layout-based exports for header components
 */

// Account holder components (account holder perspective)
export { LargeTeamHeader as AccountTeamLarge } from "./accountHolder/LargeTeamHeader";
export { SmallOpponentCard as AccountTeamSmall } from "./accountHolder/SmallOpponentCard";

// Against team components (against team perspective)
export { LargeTeamHeader as AgainstTeamLarge } from "./Against/LargeTeamHeader";
export { SmallOpponentCard as AgainstTeamSmall } from "./Against/SmallOpponentCard";

// Legacy exports for backward compatibility
export { LargeTeamHeader as AccountLogoInSubtleWrapper } from "./accountHolder/LargeTeamHeader";
export { LargeTeamHeader as AccountLogoNoWrapper } from "./Against/LargeTeamHeader";
export { SmallOpponentCard as AgainstTeamLegacy } from "./accountHolder/SmallOpponentCard";
