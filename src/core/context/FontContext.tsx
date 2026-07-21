import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
//import { useGlobalContext } from "./GlobalContext";
import { useVideoDataContext } from "./VideoDataContext";
import { useThemeContext } from "./ThemeContext";
import {
  loadFontByName,
  loadFontsFromTheme,
  getAllFontNames,
} from "../utils/fonts/fontLoader";
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
  const createdTheme = useThemeContext();

  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  // Load fonts when the component mounts / theme or metadata changes
  useEffect(() => {
    let handle: number | null = null;
    let cancelled = false;

    const loadFonts = async () => {
      handle = delayRender("Loading fonts");

      try {
        await loadFontsFromTheme(
          createdTheme as unknown as TemplateThemeConfig,
        );

        const metadata = video.metadata as {
          fontTestMode?: boolean;
          fontTestList?: string[];
        };
        const fontTestMode = metadata?.fontTestMode || false;
        const fontTestList = metadata?.fontTestList || [];

        if (
          fontTestMode &&
          Array.isArray(fontTestList) &&
          fontTestList.length > 0
        ) {
          for (const fontName of fontTestList) {
            await loadFontByName(fontName);
          }
        }

        if (!cancelled) {
          setFontsLoaded(true);
        }
      } catch (error) {
        console.error("FontContext: Error loading fonts:", error);
        if (!cancelled) {
          setFontsLoaded(true);
        }
      } finally {
        if (handle !== null) {
          continueRender(handle);
          handle = null;
        }
      }
    };

    loadFonts();

    return () => {
      cancelled = true;
      if (handle !== null) {
        continueRender(handle);
      }
    };
  }, [createdTheme, video.metadata]);

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
