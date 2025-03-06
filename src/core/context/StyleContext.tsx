import React, { createContext, useContext, ReactNode } from "react";
import { useThemeContext } from "./ThemeContext";

interface StyleContextProps {
  // Legacy properties for backward compatibility
  THEME: any;
  fontConfig: any;
  fontSizing: any;
}

const StyleContext = createContext<StyleContextProps | null>(null);

export const StyleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Use the new ThemeContext
  const theme = useThemeContext();

  // Create a backward-compatible THEME object
  const THEME = {
    // Include all color properties from the theme
    ...theme.colors,
    // Include font properties
    fontFamily: theme.fontConfig,
    headingFontFamily: theme.headingFontFamily,
    subheadingFontFamily: theme.subheadingFontFamily,
  };

  const contextValue: StyleContextProps = {
    THEME,
    fontConfig: theme.fontConfig,
    fontSizing: theme.typography?.Title?.sizes || {},
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
