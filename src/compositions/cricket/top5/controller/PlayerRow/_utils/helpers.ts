/**
 * Get default restrictions object for player name and team name lengths
 * @returns Restrictions object with default values
 */
export const getDefaultRestrictions = () => {
  return {
    nameLength: 20,
    teamLength: 35,
  };
};
