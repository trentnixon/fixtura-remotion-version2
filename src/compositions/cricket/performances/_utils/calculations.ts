import { Timings } from "../../../../core/types/data/common";
import { PerformanceData } from "../_types/types";
import { AssignSponsors } from "../../composition-types";
import { DivideFixturesBy } from "../../../../core/types/data/videoData";

/**
 * Default items per screen if not specified in contentLayout
 */
export const DEFAULT_ITEMS_PER_SCREEN = 5;

/**
 * Default display duration in frames if not specified
 */
export const DEFAULT_DISPLAY_DURATION = 300;

/**
 * Get items per screen from contentLayout configuration
 * @param fixturesLayout - The divideFixturesBy configuration object
 * @returns Number of items to display per screen
 */
export const getItemsPerScreen = (
  fixturesLayout: DivideFixturesBy | Record<string, unknown>,
): number => {
  const fixturesConfig = fixturesLayout as DivideFixturesBy;

  if (
    fixturesConfig &&
    typeof fixturesConfig.CricketBattingPerformances === "number" &&
    fixturesConfig.CricketBattingPerformances > 0
  ) {
    return fixturesConfig.CricketBattingPerformances;
  } else if (
    fixturesConfig &&
    typeof fixturesConfig.CricketBowlingPerformances === "number" &&
    fixturesConfig.CricketBowlingPerformances > 0
  ) {
    return fixturesConfig.CricketBowlingPerformances;
  }

  return DEFAULT_ITEMS_PER_SCREEN;
};

/**
 * Calculate display duration per screen based on timings and metadata
 * @param timings - Video data timings object
 * @param frameOptions - Array of frame options from metadata
 * @returns Display duration in frames
 */
export const calculateDisplayDurationPerScreen = (
  timings: Timings | undefined,
  frameOptions: number[],
): number => {
  let displayDurationPerScreen =
    timings?.FPS_PREFORMANCECARD || frameOptions[0] || DEFAULT_DISPLAY_DURATION;

  // Ensure duration is always positive (defensive check)
  if (
    typeof displayDurationPerScreen !== "number" ||
    displayDurationPerScreen <= 0
  ) {
    console.warn(
      "[Performances] Invalid durationInFrames:",
      displayDurationPerScreen,
      "using default",
      DEFAULT_DISPLAY_DURATION,
    );
    displayDurationPerScreen = DEFAULT_DISPLAY_DURATION;
  }

  return displayDurationPerScreen;
};

/**
 * Check if performances data is valid
 * @param performancesData - The performances data to validate
 * @returns True if data is valid, false otherwise
 */
export const hasValidPerformances = (
  performancesData: unknown,
): boolean => {
  return (
    performancesData !== null &&
    performancesData !== undefined &&
    Array.isArray(performancesData) &&
    performancesData.length > 0
  );
};

/**
 * Calculate total number of screens needed based on data length and items per screen
 * @param dataLength - Total number of performance items
 * @param itemsPerScreen - Number of items to display per screen
 * @returns Total number of screens needed
 */
export const calculateTotalScreens = (
  dataLength: number,
  itemsPerScreen: number,
): number => {
  return Math.ceil(dataLength / itemsPerScreen);
};

/**
 * Merge and transform assignSponsors from all performances into a single AssignSponsors object
 * @param performances - Array of performance data objects
 * @returns Merged AssignSponsors object
 */
export const mergeAssignSponsors = (
  performances: PerformanceData[],
): AssignSponsors => {
  return performances.reduce(
    (acc, performance) => {
      const { assignSponsors } = performance;
      if (!assignSponsors) return acc;

      // Collect unique grades and competitions
      const grades = acc.grade || [];
      const competitions = acc.competition || [];
      const teams = acc.team || [];

      // Add grade if it exists and is unique
      if (assignSponsors.grade && assignSponsors.grade.id) {
        const gradeExists = grades.some(
          (g) => g.id === assignSponsors.grade.id,
        );
        if (!gradeExists) {
          grades.push({
            id: assignSponsors.grade.id,
            name: assignSponsors.grade.name,
            logo: { url: "" }, // Performance data doesn't include logos
          });
        }
      }

      // Add competition if it exists and is unique
      if (assignSponsors.competition && assignSponsors.competition.id) {
        const compExists = competitions.some(
          (c) => c.id === assignSponsors.competition.id,
        );
        if (!compExists) {
          competitions.push({
            id: assignSponsors.competition.id,
            name: assignSponsors.competition.name,
            logo: { url: "" }, // Performance data doesn't include logos
          });
        }
      }

      // Add team if it exists (Team is an object, not array in performance data)
      if (assignSponsors.Team && assignSponsors.Team.name) {
        const teamExists = teams.some(
          (t) => t.home?.name === assignSponsors.Team.name,
        );
        if (!teamExists) {
          teams.push({
            home: { name: assignSponsors.Team.name },
            away: { name: "" },
            logo: { url: "" }, // Performance data doesn't include logos
          });
        }
      }

      return {
        grade: grades,
        competition: competitions,
        team: teams,
      };
    },
    { grade: [], competition: [], team: [] } as AssignSponsors,
  );
};
