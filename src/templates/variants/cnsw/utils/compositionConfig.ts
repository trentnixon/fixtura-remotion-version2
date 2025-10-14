/**
 * CNSW Template - Composition Configuration
 *
 * Centralized configuration for composition-based term swapping
 * Used by both CNSWIntro and CNSWMainHeader components
 */

export interface LineConfig {
  value: string;
  spacing?: string; // Optional - now using hardcoded lookup
  fontSize?: string;
  color?: string;
}

export interface HeaderLineConfig extends LineConfig {
  headerFontSize?: string;
  headerColor?: string;
}

export interface CompositionConfig {
  topLine: LineConfig;
  bottomLine: LineConfig;
  header?: {
    topLine: HeaderLineConfig;
    bottomLine: HeaderLineConfig;
  };
}

export interface LeagueTitleConfig {
  value: string;
  spacing: string;
}

// === COMPOSITION-BASED TERM CONFIGURATION ===
export const compositionConfig: Record<string, CompositionConfig> = {
  CricketLadder: {
    topLine: {
      value: "LEAGUE",
      spacing: "0.25em",
    },
    bottomLine: {
      value: "TABLES",
      spacing: "0.66em",
    },
    header: {
      topLine: {
        value: "LADDER",
        spacing: "0.2em",
        headerFontSize: "7em",
      },
      bottomLine: {
        value: "",
        spacing: "0.3em",
        headerFontSize: "0em",
      },
    },
  },
  CricketResults: {
    topLine: {
      value: "Weekend",
      spacing: "0.069em",
    },
    bottomLine: {
      value: "RESULTS",
      spacing: "0.46em",
    },
    header: {
      topLine: {
        value: "Weekend",
        spacing: "0.2em",
        headerFontSize: "6em",
      },
      bottomLine: {
        value: "RESULTS",
        spacing: "0.38em",
        headerFontSize: "5.2em",
      },
    },
  },
  CricketUpcoming: {
    topLine: {
      value: "FIXTURES",
      spacing: "0.065em",
    },
    bottomLine: {
      value: "SCHEDULE",
      spacing: "0.3em",
    },
    header: {
      topLine: {
        value: "FIXTURES",
        spacing: "0.2em",
        headerFontSize: "7em",
      },
      bottomLine: {
        value: "",
        spacing: "0.15em",
        headerFontSize: "0em",
      },
    },
  },
  CricketTop5Bowling: {
    topLine: {
      value: "Leading",
      spacing: "0.155em",
    },
    bottomLine: {
      value: "Wicket-takers",
      spacing: "0.055em",
    },
    header: {
      topLine: {
        value: "Leading",
        spacing: "0.1em",
        headerFontSize: "10em",
      },
      bottomLine: {
        value: "Wicket-takers",
        spacing: "0.27em",
        headerFontSize: "4em",
      },
    },
  },
  CricketTop5Batting: {
    topLine: {
      value: "Leading",
      spacing: "0.155em",
    },
    bottomLine: {
      value: "Run-Scorers",
      spacing: "0.07em",
    },
    header: {
      topLine: {
        value: "Leading",
        spacing: "0.1em",
        headerFontSize: "10em",
      },
      bottomLine: {
        value: "Run-Scorers",
        spacing: "0.38em",
        headerFontSize: "4em",
      },
    },
  },
  CricketRoster: {
    topLine: {
      value: "Team",
      spacing: "0.67em",
    },
    bottomLine: {
      value: "Roster",
      spacing: "0.62em",
    },
    header: {
      topLine: {
        value: "Team",
        spacing: "0.3em",
        headerFontSize: "6em",
      },
      bottomLine: {
        value: "Roster",
        spacing: "0.15em",
        headerFontSize: "5em",
      },
    },
  },
  CricketResultSingle: {
    topLine: {
      value: "Weekend",
      spacing: "0.05em",
    },
    bottomLine: {
      value: "Result",
      spacing: "0.62em",
    },
    header: {
      topLine: {
        value: "Weekend",
        spacing: "0.2em",
        headerFontSize: "6em",
      },
      bottomLine: {
        value: "Result",
        spacing: "0.4em",
        headerFontSize: "6em",
      },
    },
  },
};

// League title config removed - now using dynamic spacing calculation

// === UTILITY FUNCTIONS ===

/**
 * Get composition configuration with fallback
 */
export const getCompositionConfig = (
  compositionId: string,
): CompositionConfig => {
  return (
    compositionConfig[compositionId] || compositionConfig["CricketResultSingle"]
  );
};

/**
 * Get header-specific configuration with fallback
 */
export const getHeaderConfig = (
  compositionId: string,
): { topLine: HeaderLineConfig; bottomLine: HeaderLineConfig } => {
  const config = getCompositionConfig(compositionId);

  // Return header config if it exists, otherwise create default header config from base config
  if (config.header) {
    return config.header;
  }

  // Fallback: create header config from base config
  return {
    topLine: {
      ...config.topLine,
      headerFontSize: "7em",
    },
    bottomLine: {
      ...config.bottomLine,
      headerFontSize: "7em",
    },
  };
};

// === VIDEO DIMENSION CONSTANTS ===
// Remotion composition dimensions (from ProductionRoot.tsx)
export const VIDEO_DIMENSIONS = {
  WIDTH: 1080, // px
  HEIGHT: 1350, // px
} as const;

// === HARDCODED TEXT SPACING LOOKUP ===
// Specific letter spacing for known hardcoded values
export const hardcodedTextSpacing: Record<
  string,
  { intro: string; header: string }
> = {
  // TopLine values
  LEAGUE: { intro: "0.25em", header: "0.2em" },
  Weekend: { intro: "0.069em", header: "0.2em" },
  FIXTURES: { intro: "0.065em", header: "0.2em" },
  Leading: { intro: "0.155em", header: "0.1em" },
  Team: { intro: "0.67em", header: "0.3em" },

  // BottomLine values
  TABLES: { intro: "0.66em", header: "0.3em" },
  RESULTS: { intro: "0.46em", header: "0.38em" },
  SCHEDULE: { intro: "0.3em", header: "0.15em" },
  "Wicket-takers": { intro: "0em", header: "0.27em" },
  "Run-Scorers": { intro: "0.07em", header: "0.38em" },
  Roster: { intro: "0.66em", header: "0.15em" },
  Result: { intro: "0.62em", header: "0.4em" },
};

/**
 * Get hardcoded letter spacing for known text values
 */
export const getHardcodedSpacing = (
  text: string,
  context: "intro" | "header",
): string => {
  return hardcodedTextSpacing[text]?.[context] || "0.2em";
};

/**
 * Calculate letter spacing to make text fill a container width perfectly
 *
 * @param text - The text string to fit
 * @param fontSize - Font size in pixels
 * @param containerWidth - Container width in pixels
 * @param avgCharWidth - Average character width as percentage of fontSize (default: 0.6 for condensed fonts)
 * @returns Letter spacing in em units
 */
export const calculateFitToWidthSpacing = (
  text: string,
  fontSize: number,
  containerWidth: number,
  avgCharWidth: number = 0.5, // Adjust based on font - Druk is condensed
): string => {
  if (!text || text.length === 0) return "0em";

  // 1. Estimate natural text width (without letter spacing)
  const estimatedTextWidth = text.length * fontSize * avgCharWidth;

  // 2. Calculate available space for letter spacing
  const availableSpace = containerWidth - estimatedTextWidth;

  // 3. Distribute space across character gaps (n-1 gaps for n characters)
  const numGaps = text.length - 1;
  if (numGaps <= 0) return "0em";

  // 4. Calculate letter spacing per gap in pixels
  const letterSpacingPx = availableSpace / numGaps;

  // 5. Convert to em (relative to font size)
  const letterSpacingEm = letterSpacingPx / fontSize;

  // 6. Clamp to reasonable values (-0.1em to 1em)
  const clampedSpacing = Math.max(-0.1, Math.min(1, letterSpacingEm));

  // Debug logging removed for production

  return `${clampedSpacing.toFixed(3)}em`;
};

/**
 * Get league title configuration with fit-to-width spacing
 */
export const getLeagueTitleConfig = (
  leagueTitle?: string,
  containerWidth?: number,
  fontSize?: number,
  avgCharWidth?: number,
): LeagueTitleConfig => {
  const title = leagueTitle?.toUpperCase() || "";

  // If container width and font size provided, calculate fit-to-width spacing
  const spacing =
    containerWidth && fontSize
      ? calculateFitToWidthSpacing(
          title,
          fontSize,
          containerWidth,
          avgCharWidth,
        )
      : "0.22em"; // Default fallback

  return {
    value: title,
    spacing,
  };
};

// createHeaderConfig removed - not used in current implementation
