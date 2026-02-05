/**
 * Default frame duration if not specified
 */
export const DEFAULT_DISPLAY_DURATION = 300;

/**
 * Default games per screen if not specified in contentLayout
 */
export const DEFAULT_GAMES_PER_SCREEN = 2;

/**
 * Extracts games per screen from contentLayout configuration
 * @param fixturesLayout - Layout configuration object
 * @returns Number of games to display per screen
 */
export const getGamesPerScreen = (
  fixturesLayout?: { CricketUpcoming?: number },
): number => {
  if (
    fixturesLayout &&
    typeof fixturesLayout.CricketUpcoming === "number"
  ) {
    return fixturesLayout.CricketUpcoming;
  }
  return fixturesLayout?.CricketUpcoming || DEFAULT_GAMES_PER_SCREEN;
};

/**
 * Calculates the display duration per screen based on timings or video metadata
 * @param timings - Timing configuration object
 * @param frameOptions - Array of frame options from video metadata
 * @returns Display duration in frames
 */
export const calculateDisplayDurationPerScreen = (
  timings?: { FPS_SCORECARD?: number },
  frameOptions?: number[],
): number => {
  return (
    timings?.FPS_SCORECARD || frameOptions?.[0] || DEFAULT_DISPLAY_DURATION
  );
};

/**
 * Validates and checks if games data is valid and non-empty
 * @param gamesData - Games data to validate
 * @returns True if data is valid and has games
 */
export const hasValidGames = (gamesData: unknown): boolean => {
  return (
    gamesData !== null &&
    gamesData !== undefined &&
    Array.isArray(gamesData) &&
    gamesData.length > 0
  );
};

/**
 * Calculates the total number of screens needed based on games count and games per screen
 * @param gamesCount - Total number of games
 * @param gamesPerScreen - Number of games to display per screen
 * @returns Total number of screens needed
 */
export const calculateTotalScreens = (
  gamesCount: number,
  gamesPerScreen: number,
): number => {
  return Math.ceil(gamesCount / gamesPerScreen);
};
