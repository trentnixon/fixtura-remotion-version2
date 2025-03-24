import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useThemeContext } from "./ThemeContext";

import { DesignPalette } from "../utils/designPalettes/types";

interface StyleContextProps {
  // Legacy properties for backward compatibility
  theme: any;
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
  const createdTheme = useThemeContext();

  // Create a backward-compatible THEME object
  const theme = useMemo(() => {
    // Include all color properties from the theme
    return {
      ...createdTheme.colors,
      // Include font properties
      fontFamily: createdTheme.fontConfig,
      headingFontFamily: createdTheme.headingFontFamily,
      subheadingFontFamily: createdTheme.subheadingFontFamily,
    };
  }, [createdTheme]);

  const contextValue: StyleContextProps = {
    theme,
    fontConfig: createdTheme.fontConfig,
    fontSizing: createdTheme.typography?.Title?.sizes || {},

    getActivePalette: createdTheme.getActivePalette,
    selectedPalette: createdTheme.selectedPalette,
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
