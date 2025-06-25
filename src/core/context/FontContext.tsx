import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
//import { useGlobalContext } from "./GlobalContext";
import { useVideoDataContext } from "./VideoDataContext";
import { useStylesContext } from "./StyleContext";
import { useThemeContext } from "./ThemeContext";
import {
  loadFontByName,
  loadFontsFromTheme,
  getAllFontNames,
} from "../utils/fontLoader";
import { continueRender, delayRender } from "remotion";
import { TemplateThemeConfig } from "../../templates/types/TemplateThemeConfig";

interface FontContextProps {
  fontsLoaded: boolean;
  loadFont: (
    fontName: string,
    weight?: string,
    style?: string,
  ) => Promise<void>;
  availableFonts: string[];
}

const FontContext = createContext<FontContextProps | null>(null);

export const FontProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //const { settings } = useGlobalContext();
  const { video } = useVideoDataContext();
  const { theme } = useStylesContext();
  const createdTheme = useThemeContext();

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontLoadingHandle, setFontLoadingHandle] = useState<number | null>(
    null,
  );

  // Get all available fonts
  const availableFonts = getAllFontNames();

  // Load a specific font on demand
  const loadFont = async (
    fontName: string,
    weight?: string,
    style?: string,
  ) => {
    await loadFontByName(fontName, weight, style);
  };

  // Load fonts when the component mounts
  useEffect(() => {
    const loadFonts = async () => {
      //console.log("FontContext: Starting font loading process");

      // Create a delay render handle
      const handle = delayRender("Loading fonts");
      setFontLoadingHandle(handle);

      try {
        // Load fonts from theme
        await loadFontsFromTheme(
          createdTheme as unknown as TemplateThemeConfig,
        );

        // Check if there are font testing metadata in the appearance or metadata
        // Use type assertion since these are custom properties
        const metadata = video.metadata as {
          fontTestMode?: boolean;
          fontTestList?: string[];
        };
        const fontTestMode = metadata?.fontTestMode || false;
        const fontTestList = metadata?.fontTestList || [];

        // If in font test mode, load additional fonts
        if (fontTestMode) {
          // Load specific test fonts if specified
          if (Array.isArray(fontTestList) && fontTestList.length > 0) {
            for (const fontName of fontTestList) {
              await loadFontByName(fontName);
            }
          }
        }

        //console.log("FontContext: All fonts loaded successfully");
        setFontsLoaded(true);
      } catch (error) {
        console.error("FontContext: Error loading fonts:", error);
        // Even if there's an error, we should continue rendering
        setFontsLoaded(true);
      } finally {
        // Continue rendering using the local handle variable
        continueRender(handle);
      }
    };

    loadFonts();

    // Cleanup function
    return () => {
      if (fontLoadingHandle !== null) {
        continueRender(fontLoadingHandle);
      }
    };
  }, [theme, video.metadata]);

  const contextValue: FontContextProps = {
    fontsLoaded,
    loadFont,
    availableFonts,
  };

  return (
    <FontContext.Provider value={contextValue}>{children}</FontContext.Provider>
  );
};

export const useFontContext = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFontContext must be used within a FontProvider");
  }
  return context;
};
