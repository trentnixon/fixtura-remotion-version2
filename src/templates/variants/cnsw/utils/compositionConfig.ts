/**
 * CNSW Template - Composition Configuration
 *
 * Centralized configuration for composition-based term swapping
 * Used by both CNSWIntro and CNSWMainHeader components
 */

export interface LineConfig {
  value: string;
  spacing: string;
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

// === LEAGUE TITLE CONFIGURATION ===
export const leagueTitleConfig: Record<string, LeagueTitleConfig> = {
  "Men's Premier Cricket": {
    value: "MEN'S PREMIER CRICKET",
    spacing: "0.22em",
  },
  "Women's Premier Cricket": {
    value: "WOMEN'S PREMIER CRICKET",
    spacing: "0.22em",
  },
  "Junior Premier Cricket": {
    value: "JUNIOR PREMIER CRICKET",
    spacing: "0.22em",
  },
  "Senior Premier Cricket": {
    value: "SENIOR PREMIER CRICKET",
    spacing: "0.22em",
  },
  "Mixed Premier Cricket": {
    value: "MIXED PREMIER CRICKET",
    spacing: "0.22em",
  },
};

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

/**
 * Get league title configuration with fallback
 */
export const getLeagueTitleConfig = (
  leagueTitle?: string,
): LeagueTitleConfig => {
  return (
    leagueTitleConfig[leagueTitle || "Men's Premier Cricket"] || {
      value: leagueTitle?.toUpperCase(),
      spacing: "0.31em",
    }
  );
};

/**
 * Create header configuration with theme colors
 */
export const createHeaderConfig = (
  compositionId: string,
  topLineColor: string,
  bottomLineColor: string = "#ffffff",
): Record<string, CompositionConfig> => {
  const baseConfig = getCompositionConfig(compositionId);

  return {
    [compositionId]: {
      topLine: {
        ...baseConfig.topLine,
        fontSize: "4em",
        color: topLineColor,
      },
      bottomLine: {
        ...baseConfig.bottomLine,
        fontSize: "3em",
        color: bottomLineColor,
      },
    },
  };
};
