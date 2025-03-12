import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useGlobalContext } from "./GlobalContext";
import { useVideoDataContext } from "./VideoDataContext";
import { DesignPalette } from "../utils/designPalettes/types";
import { createColorSystem } from "../utils/colorSystem";
import { ComponentStyles, ThemeContextProps } from "./types/ThemeContextTypes";

// Create the context with proper typing
const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { settings } = useGlobalContext();
  const { Video } = useVideoDataContext();

  // Create the merged theme using useMemo for performance
  const theme = useMemo(() => {
    // Extract theme data
    const dataTheme = Video.Theme || {};
    const templateVariation = Video.TemplateVariation;

    // Extract colors with fallbacks
    const primaryColor = dataTheme.primary || settings.primary || "#111111";
    const secondaryColor =
      dataTheme.secondary || settings.secondary || "#ffffff";

    // Create the color system
    const colorSystem = createColorSystem(primaryColor, secondaryColor);

    console.log("[colorSystem]", colorSystem);
    // Log available palettes in development
    if (process.env.NODE_ENV !== "production") {
      console.log("\n=== AVAILABLE PALETTES ===");
      Object.keys(colorSystem.palettes).forEach((paletteName) => {
        console.log(`- ${paletteName}`);
      });
    }

    // Helper function to get active palette
    const getActivePalette = (paletteName?: string): DesignPalette => {
      if (!paletteName) {
        // Get from template variation or default to primary
        const variationPalette = templateVariation?.Palette;
        paletteName = variationPalette || "primary";
      }

      // Ensure paletteName is a valid string before using as index
      return (
        colorSystem.palettes[
          paletteName as keyof typeof colorSystem.palettes
        ] || colorSystem.palettes.primary
      );
    };

    // Create component styles with defaults
    const componentStyles: ComponentStyles = settings.componentStyles || {
      title: {
        className:
          "text-6xl font-bold tracking-tight leading-tight text-center m-0 px-4",
        style: {},
      },
      subtitle: {
        className:
          "text-3xl font-semibold tracking-normal leading-snug text-center m-0 px-4",
        style: {},
      },
      body: {
        className: "text-lg font-normal tracking-normal leading-relaxed",
        style: {},
      },
    };

    // Return the complete theme
    return {
      ...settings,
      componentStyles,
      getActivePalette,
      selectedPalette: getActivePalette(),
    };
  }, [settings, Video.Theme, Video.TemplateVariation]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
