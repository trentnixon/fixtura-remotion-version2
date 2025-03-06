import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { continueRender, delayRender } from "remotion";

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
  Tungsten: "fonts/Tungsten/static/Tungsten-Regular.ttf",
  "Tungsten-Bold": "fonts/Tungsten/static/Tungsten-Bold.ttf",
  Druk: "fonts/Druk/Druk_Medium.otf",
  "Monument Extended":
    "fonts/MonumentExtended/static/MonumentExtended-Regular.otf",

  // ===== Text Fonts =====
  // Used for body text and general content

  // Heebo family
  Heebo: "fonts/Heebo/static/Heebo-Regular.ttf",
  "Heebo-Light": "fonts/Heebo/static/Heebo-Light.ttf",
  "Heebo-Medium": "fonts/Heebo/static/Heebo-Medium.ttf",
  "Heebo-SemiBold": "fonts/Heebo/static/Heebo-SemiBold.ttf",
  "Heebo-Bold": "fonts/Heebo/static/Heebo-Bold.ttf",
  "Heebo-Black": "fonts/Heebo/static/Heebo-Black.ttf",

  // Roboto family
  Roboto: "fonts/Roboto/static/Roboto-Regular.ttf",
  "Roboto-Light": "fonts/Roboto/static/Roboto-Light.ttf",
  "Roboto-Medium": "fonts/Roboto/static/Roboto-Medium.ttf",
  "Roboto-Bold": "fonts/Roboto/static/Roboto-Bold.ttf",

  // ===== Specialty Fonts =====
  // Used for specific design elements or accent text
  "Franklin Gothic Book":
    "fonts/Franklin_Gothic_Book/Franklin_Gothic_Book_Regular.ttf",
  "Gloss And Bloom": "fonts/Gloss_And_Bloom/Gloss_And_Bloom.ttf",
  Impact: "fonts/impact/impact.ttf",
  Lemon: "fonts/Lemon/Lemon-Regular.ttf",
  Resolve: "fonts/Resolve/Resolve-Regular.otf",
  "Slightly Marker": "fonts/Slightly_Marker/SlightlyMarker.ttf",
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
  // Check if the font exists in our map
  if (!fontPathMap[fontName]) {
    // Try to find a font with weight suffix (e.g., "Heebo-Bold")
    if (weight && fontPathMap[`${fontName}-${weight}`]) {
      fontName = `${fontName}-${weight}`;
    } else {
      console.error(`Font not found in fontPathMap: ${fontName}`);
      return null;
    }
  }

  return {
    family: fontName,
    url: staticFile(fontPathMap[fontName]),
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
    console.log(`Skipping font with no URL: ${fontConfig.family}`);
    return;
  }

  try {
    console.log(
      `Loading font: ${fontConfig.family} (${fontConfig.weight} ${fontConfig.style})`,
    );

    await loadFont({
      family: fontConfig.family,
      url: fontConfig.url,
      weight: fontConfig.weight || "400",
      style: fontConfig.style || "normal",
    });

    console.log(`Successfully loaded font: ${fontConfig.family}`);
  } catch (error) {
    console.error(`Error loading font ${fontConfig.family}:`, error);
    console.error(`Font URL was: ${fontConfig.url}`);
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
  const fontConfig = createFontConfig(fontName, weight, style);

  if (!fontConfig) {
    console.error(`Could not create font configuration for: ${fontName}`);
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
export const loadFontsFromTheme = async (theme: any): Promise<void> => {
  console.log("Loading fonts from theme...");

  const fontsToLoad = new Set<string>();

  // Add fonts from the fonts object
  if (theme.fonts) {
    if (theme.fonts.title && theme.fonts.title.family) {
      fontsToLoad.add(theme.fonts.title.family);
    }
    if (theme.fonts.copy && theme.fonts.copy.family) {
      fontsToLoad.add(theme.fonts.copy.family);
    }

    // Add additional fonts if specified
    if (theme.fonts.additional && Array.isArray(theme.fonts.additional)) {
      theme.fonts.additional.forEach((font: string) => fontsToLoad.add(font));
    }
  }

  // Add legacy font configurations
  if (theme.fontConfig) fontsToLoad.add(theme.fontConfig);
  if (theme.defaultCopyFontFamily) fontsToLoad.add(theme.defaultCopyFontFamily);
  if (theme.headingFontFamily) fontsToLoad.add(theme.headingFontFamily);
  if (theme.subheadingFontFamily) fontsToLoad.add(theme.subheadingFontFamily);

  // Create a delay render handle to ensure fonts are loaded before rendering
  const handle = delayRender("Loading theme fonts");

  try {
    console.log(
      `Loading ${fontsToLoad.size} fonts from theme: ${Array.from(fontsToLoad).join(", ")}`,
    );

    // Load each font
    for (const fontName of fontsToLoad) {
      await loadFontByName(fontName);
    }

    console.log("Successfully loaded all theme fonts");
    continueRender(handle);
  } catch (error) {
    console.error("Error loading theme fonts:", error);
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
