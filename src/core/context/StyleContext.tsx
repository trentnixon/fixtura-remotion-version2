import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useThemeContext } from "./ThemeContext";

import { DesignPalette } from "../utils/designPalettes/types";

interface StyleContextProps {
  // Legacy properties for backward compatibility
  THEME: any;
  fontConfig: any;
  fontSizing: any;

  getActivePalette: (paletteName?: string) => DesignPalette;
  selectedPalette: DesignPalette;
}

const StyleContext = createContext<StyleContextProps | null>(null);

export const StyleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Use the new ThemeContext
  const theme = useThemeContext();

  // Create a backward-compatible THEME object
  const THEME = useMemo(() => {
    // Include all color properties from the theme
    return {
      ...theme.colors,
      // Include font properties
      fontFamily: theme.fontConfig,
      headingFontFamily: theme.headingFontFamily,
      subheadingFontFamily: theme.subheadingFontFamily,
    };
  }, [theme]);

  const contextValue: StyleContextProps = {
    THEME,
    fontConfig: theme.fontConfig,
    fontSizing: theme.typography?.Title?.sizes || {},

    getActivePalette: theme.getActivePalette,
    selectedPalette: theme.selectedPalette,
  };

  return (
    <StyleContext.Provider value={contextValue}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStylesContext = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error("useStylesContext must be used within a StyleProvider");
  }
  return context;
};

// Re-export the types for backward compatibility
export type { DesignPalette } from "../utils/designPalettes/types";
