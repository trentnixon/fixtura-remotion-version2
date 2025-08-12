import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { continueRender, delayRender } from "remotion";
import { TemplateThemeConfig } from "../../templates/types/TemplateThemeConfig";

/**
 * Font Loader Utility
 *
 * This module handles font loading for Remotion videos.
 * It provides utilities to load fonts from static files and apply them to your compositions.
 */

/**
 * Font Configuration Interface
 * Defines the structure for font configurations
 */
export interface FontConfig {
  family: string; // Font family name
  url: string; // URL to the font file
  weight?: string; // Font weight (e.g., "400", "700")
  style?: string; // Font style (e.g., "normal", "italic")
}

/**
 * Font Path Map
 *
 * Maps font names to their file paths relative to the public directory.
 *
 * ===== HOW TO ADD A NEW FONT =====
 * 1. Add the font files to the public/fonts directory
 * 2. Add an entry to this map with the format:
 *    "FontName": "path/to/font/file.ttf"
 *
 * For weight variants, use the format:
 *    "FontName-Weight": "path/to/font/weight-variant.ttf"
 *    Example: "Heebo-Bold": "fonts/Heebo/static/Heebo-Bold.ttf"
 *
 * After adding the font, you can use it in your compositions by:
 * - Calling loadFontByName("FontName")
 * - Including it in your theme's font configuration
 */
export const fontPathMap: Record<string, string> = {
  // ===== Display Fonts =====
  // Used for headings, titles, and prominent text elements
  Tungsten: "fonts/Tungsten/Tungsten-Book.otf",
  "Tungsten-Bold": "fonts/Tungsten/Tungsten-Semibold.otf", // Using Semibold as Bold
  "Tungsten-Light": "fonts/Tungsten/Tungsten-Light.otf",
  Druk: "fonts/Druk/Druk_Medium.otf",
  "Monument Extended": "fonts/MonumentExtended/MonumentExtended-Regular.otf",
  "Monument Extended-Ultrabold":
    "fonts/MonumentExtended/MonumentExtended-Ultrabold.otf",

  // ===== Text Fonts =====
  // Used for body text and general content

  // Heebo family
  Heebo: "fonts/Heebo/static/Heebo-Regular.ttf",
  "Heebo-Light": "fonts/Heebo/static/Heebo-Light.ttf",
  "Heebo-Medium": "fonts/Heebo/static/Heebo-Medium.ttf",
  "Heebo-SemiBold": "fonts/Heebo/static/Heebo-SemiBold.ttf",
  "Heebo-Bold": "fonts/Heebo/static/Heebo-Bold.ttf",
  "Heebo-Black": "fonts/Heebo/static/Heebo-Black.ttf",
  "Heebo-Thin": "fonts/Heebo/static/Heebo-Thin.ttf",
  "Heebo-ExtraBold": "fonts/Heebo/static/Heebo-ExtraBold.ttf",
  "Heebo-ExtraLight": "fonts/Heebo/static/Heebo-ExtraLight.ttf",

  // Roboto family
  Roboto: "fonts/Roboto/Roboto-Regular.ttf",
  "Roboto-Light": "fonts/Roboto/Roboto-Light.ttf",
  "Roboto-Medium": "fonts/Roboto/Roboto-Medium.ttf",
  "Roboto-Bold": "fonts/Roboto/Roboto-Bold.ttf",
  "Roboto-Black": "fonts/Roboto/Roboto-Black.ttf",
  "Roboto-Thin": "fonts/Roboto/Roboto-Thin.ttf",
  "Roboto-Italic": "fonts/Roboto/Roboto-Italic.ttf",
  "Roboto-BoldItalic": "fonts/Roboto/Roboto-BoldItalic.ttf",
  "Roboto-BlackItalic": "fonts/Roboto/Roboto-BlackItalic.ttf",
  "Roboto-LightItalic": "fonts/Roboto/Roboto-LightItalic.ttf",
  "Roboto-MediumItalic": "fonts/Roboto/Roboto-MediumItalic.ttf",
  "Roboto-ThinItalic": "fonts/Roboto/Roboto-ThinItalic.ttf",

  // ===== Specialty Fonts =====
  // Used for specific design elements or accent text
  "Franklin Gothic Book": "fonts/Franklin_Gothic_Book/FRABK.TTF",

  "Gloss And Bloom": "fonts/Gloss_And_Bloom/Gloss_And_Bloom.ttf",
  Impact: "fonts/impact/impact.ttf",
  Lemon: "fonts/Lemon/Lemon-Regular.ttf",
  Resolve: "fonts/Resolve/Resolve-Regular.otf",
  "Slightly Marker": "fonts/Slightly_Marker/Slightly_Marker.otf",
};

// System fonts that don't need to be loaded
const systemFonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Times",
  "Courier New",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Tahoma",
  "Trebuchet MS",
  "Arial Black",
  "Comic Sans MS",
];

// Mapping of common misspellings or case variations
const fontNameVariants: Record<string, string> = {
  druk: "Druk",
  DRUK: "Druk",
  "Druk Medium": "Druk",
  "druk medium": "Druk",
  "DRUK MEDIUM": "Druk",
  heebo: "Heebo",
  HEEBO: "Heebo",
  roboto: "Roboto",
  ROBOTO: "Roboto",
  tungsten: "Tungsten",
  TUNGSTEN: "Tungsten",
  "monument extended": "Monument Extended",
  "MONUMENT EXTENDED": "Monument Extended",
  monumentextended: "Monument Extended",
  MonumentExtended: "Monument Extended",
  impact: "Impact",
  IMPACT: "Impact",
};

// Reverse lookup map for debugging (font string value to fontPathMap key)
const fontReverseMap: Record<string, string> = {};

// Initialize the reverse map
for (const [key] of Object.entries(fontPathMap)) {
  fontReverseMap[key.toLowerCase()] = key;
}

/**
 * Checks if a font is a system font
 *
 * @param fontName - The name of the font to check
 * @returns True if it's a system font
 */
const isSystemFont = (fontName: string): boolean => {
  if (!fontName) return false;

  // Check if it contains any system font name
  return systemFonts.some(
    (systemFont) =>
      fontName.toLowerCase().includes(systemFont.toLowerCase()) ||
      fontName.includes(","), // Font stacks with commas are considered system fonts
  );
};

/**
 * Normalizes a font name by correcting case and common variations
 *
 * @param fontName - The input font name
 * @returns The normalized font name
 */
const normalizeFontName = (fontName: string): string => {
  if (!fontName) return fontName;

  // Check direct mapping first
  const normalized = fontNameVariants[fontName];
  if (normalized) {
    //console.log(`Normalized font name: "${fontName}" -> "${normalized}"`);
    return normalized;
  }

  // Check case-insensitive mapping
  const lowerCaseName = fontName.toLowerCase();
  const normalizedLower = fontNameVariants[lowerCaseName];
  if (normalizedLower) {
    //console.log(`Normalized font name: "${fontName}" -> "${normalizedLower}"`);
    return normalizedLower;
  }

  return fontName;
};

/**
 * Creates a font configuration object from a font name
 *
 * @param fontName - The name of the font as defined in fontPathMap
 * @param weight - Optional font weight
 * @param style - Optional font style
 * @returns FontConfig object or null if font not found
 */
export const createFontConfig = (
  fontName: string,
  weight?: string,
  style?: string,
): FontConfig | null => {
  // Skip system fonts
  if (isSystemFont(fontName)) {
    //console.log(`Skipping system font: "${fontName}"`);
    return null;
  }

  // Debug info
  //console.log(`Creating font config for: "${fontName}"`);

  // Normalize the font name
  const normalizedFontName = normalizeFontName(fontName);

  // Handle different case sensitivity issues
  let resolvedFontName = normalizedFontName;

  // Check direct key match first
  if (!fontPathMap[resolvedFontName]) {
    // Try a case-insensitive match through our reverse lookup
    const lowerCaseName = normalizedFontName.toLowerCase();
    if (fontReverseMap[lowerCaseName]) {
      resolvedFontName = fontReverseMap[lowerCaseName];
      //console.log(
      //  `Case mismatch fixed: "${normalizedFontName}" -> "${resolvedFontName}"`,
      //);
    }

    // Try to find a font with weight suffix (e.g., "Heebo-Bold")
    else if (weight && fontPathMap[`${normalizedFontName}-${weight}`]) {
      resolvedFontName = `${normalizedFontName}-${weight}`;
      //console.log(`Using weight variant: "${resolvedFontName}"`);
    } else {
      // Check if available in wrong case with weight
      if (weight) {
        const lowerCaseNameWithWeight = `${lowerCaseName}-${weight.toLowerCase()}`;
        for (const key of Object.keys(fontPathMap)) {
          if (key.toLowerCase() === lowerCaseNameWithWeight) {
            resolvedFontName = key;
            //console.log(
            //  `Found weight variant with case correction: "${resolvedFontName}"`,
            //);
            break;
          }
        }
      }

      // Still not found
      if (!fontPathMap[resolvedFontName]) {
        //console.warn(`Font not found in fontPathMap: "${fontName}"`);
        //console.log(`Available fonts: ${Object.keys(fontPathMap).join(", ")}`);
        return null;
      }
    }
  }

  return {
    family: resolvedFontName,
    url: staticFile(fontPathMap[resolvedFontName]),
    weight: weight || "400",
    style: style || "normal",
  };
};

/**
 * Loads a font using the provided font configuration
 *
 * @param fontConfig - The font configuration object
 */
export const loadFontFile = async (fontConfig: FontConfig): Promise<void> => {
  if (!fontConfig.url) {
    //console.log(`Skipping font with no URL: ${fontConfig.family}`);
    return;
  }

  try {
    //console.log(
    //  `Loading font: ${fontConfig.family} (${fontConfig.weight} ${fontConfig.style})`,
    //);

    await loadFont({
      family: fontConfig.family,
      url: fontConfig.url,
      weight: fontConfig.weight || "400",
      style: fontConfig.style || "normal",
    });

    //console.log(`Successfully loaded font: ${fontConfig.family}`);
  } catch (error) {
    console.error(`Error loading font ${fontConfig.family}:`, error);
    //console.error(`Font URL was: ${fontConfig.url}`);
    // Don't throw the error - we'll handle the failure gracefully
    // by falling back to system fonts later in the rendering process
  }
};

/**
 * Loads a font by its name
 *
 * @param fontName - The name of the font as defined in fontPathMap
 * @param weight - Optional font weight
 * @param style - Optional font style
 */
export const loadFontByName = async (
  fontName: string,
  weight?: string,
  style?: string,
): Promise<void> => {
  // Skip system fonts
  if (isSystemFont(fontName)) {
    //console.log(`Skipping system font: "${fontName}"`);
    return;
  }

  const fontConfig = createFontConfig(fontName, weight, style);

  if (!fontConfig) {
    //console.warn(`Could not create font configuration for: ${fontName}`);
    //console.log(`Falling back to system fonts`);
    return;
  }

  await loadFontFile(fontConfig);
};

/**
 * Loads fonts specified in a theme configuration
 *
 * @param theme - The theme object containing font configurations
 *
 * The theme can specify fonts in several ways:
 * 1. theme.fonts.title.family - Title font family
 * 2. theme.fonts.copy.family - Copy text font family
 * 3. theme.fonts.additional - Array of additional font names
 * 4. Legacy properties: fontConfig, defaultCopyFontFamily, headingFontFamily, subheadingFontFamily
 */
export const loadFontsFromTheme = async (
  theme: TemplateThemeConfig,
): Promise<void> => {
  console.log("Loading fonts from theme...", theme);
  //console.log("Theme fonts config:", {
  //  fonts: theme.fonts,
  //  fontConfig: theme.fontConfig,
  //  defaultCopyFontFamily: theme.defaultCopyFontFamily,
  //  headingFontFamily: theme.headingFontFamily,
  //  subheadingFontFamily: theme.subheadingFontFamily,
  //});

  const fontsToLoad = new Set<string>();

  // Add fonts from the fonts object
  if (theme.fonts) {
    if (theme.fonts.title && theme.fonts.title.family) {
      fontsToLoad.add(theme.fonts.title.family);
    }
    if (theme.fonts.copy && theme.fonts.copy.family) {
      fontsToLoad.add(theme.fonts.copy.family);
    }
  }

  // Add legacy font configurations
  if (theme.fontConfig) fontsToLoad.add(theme.fontConfig);
  if (theme.defaultCopyFontFamily) fontsToLoad.add(theme.defaultCopyFontFamily);
  if (theme.headingFontFamily) fontsToLoad.add(theme.headingFontFamily);
  if (theme.subheadingFontFamily) fontsToLoad.add(theme.subheadingFontFamily);

  // Font class fonts
  /*   if (theme.fontClasses) {
    Object.values(theme.fontClasses).forEach((fontClass: ThemeFontClasses) => {
      if (fontClass && fontClass.family) {
        fontsToLoad.add(fontClass.family);
      }
    });
  } */

  // Filter out system fonts
  const fontsToLoadFiltered = Array.from(fontsToLoad).filter(
    (font) => !isSystemFont(font),
  );

  if (fontsToLoadFiltered.length === 0) {
    //console.log("No custom fonts to load - using system fonts only");
    return;
  }

  // Create a delay render handle to ensure fonts are loaded before rendering
  const handle = delayRender("Loading theme fonts");

  try {
    //console.log(
    //  `Loading ${fontsToLoadFiltered.length} fonts from theme: ${fontsToLoadFiltered.join(", ")}`,
    //);

    // Load each font
    const loadPromises = fontsToLoadFiltered.map(async (fontName) => {
      if (fontName) {
        try {
          await loadFontByName(fontName);
        } catch (error) {
          console.warn(`Failed to load font ${fontName}: ${error}`);
          // Continue with other fonts
        }
      }
    });

    // Wait for all fonts to load (or fail)
    await Promise.allSettled(loadPromises);

    //console.log("Finished font loading process");
    continueRender(handle);
  } catch (error) {
    console.error("Error in font loading process:", error);
    continueRender(handle);
  }
};

/**
 * Returns a list of all available font names
 *
 * @returns Array of font names defined in fontPathMap
 */
export const getAllFontNames = (): string[] => {
  return Object.keys(fontPathMap);
};
