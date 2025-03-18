// src/components/backgrounds/variants/Image/overlays/themeIntegration.ts
import {
  OverlayStyle,
  BlendMode,
  createSolidOverlay,
  createGradientOverlay,
  createVignetteOverlay,
  createDuotoneOverlay,
  createColorFilterOverlay,
} from "./index";

import {
  getPaletteColor,
  getColorWithOpacity,
} from "../../../../../core/utils/themeColorUtils";

/**
 * Creates theme-based overlay presets using the current palette
 * This function generates overlay presets dynamically based on the current theme palette
 */
export const createThemeOverlayPresets = (palette: any) => {
  // Ensure palette exists, otherwise provide default values
  if (!palette) {
    console.warn(
      "No palette provided for createThemeOverlayPresets, using fallbacks",
    );
    return createDefaultOverlayPresets();
  }

  // Extract key colors from palette with fallbacks using our utility functions
  const primaryColor = getPaletteColor(palette, "main", "#043666");
  const primaryLight = getPaletteColor(palette, "light", "#065097");
  const primaryDark = getPaletteColor(palette, "dark", "#021c35");
  const accentColor = getPaletteColor(palette, "accent", "white");

  // Create theme-based overlay presets
  return {
    // Solid overlays based on theme colors
    primarySolid: createSolidOverlay(primaryColor, 0.5, BlendMode.Normal),

    primaryLight: createSolidOverlay(primaryLight, 0.4, BlendMode.Multiply),

    primaryDark: createSolidOverlay(primaryDark, 0.6, BlendMode.Normal),

    accentSolid: createSolidOverlay(accentColor, 0.3, BlendMode.Overlay),

    // Gradient overlays using theme colors and utility functions
    primaryGradient: createGradientOverlay(
      primaryColor,
      primaryLight,
      "135deg",
      0.5,
      BlendMode.Normal,
    ),

    primaryToAccent: createGradientOverlay(
      primaryColor,
      accentColor,
      "135deg",
      0.5,
      BlendMode.Overlay,
    ),

    accentToPrimary: createGradientOverlay(
      accentColor,
      primaryColor,
      "135deg",
      0.5,
      BlendMode.Overlay,
    ),

    // Themed vignette effects
    primaryVignette: createVignetteOverlay(primaryDark, 150, 0.7),

    accentVignette: createVignetteOverlay(accentColor, 150, 0.5),

    // Themed duotone effects
    primaryDuotone: createDuotoneOverlay(primaryDark, accentColor, 0.7, 0.85),

    accentDuotone: createDuotoneOverlay(accentColor, primaryLight, 0.6, 0.75),

    // Generic color filters that work well with any theme
    warmFilter: createColorFilterOverlay(
      15, // slight orange hue
      110, // slightly more saturated
      105, // slightly brighter
      105, // slightly more contrast
      10, // slight sepia tone
    ),

    coolFilter: createColorFilterOverlay(
      210, // blue-ish hue
      90, // slightly less saturated
      95, // slightly darker
      100, // normal contrast
      0, // no sepia
    ),

    // Add gradients directly from theme if available
    ...createGradientsFromTheme(palette),

    // Add team-specific presets if they exist in the palette
    ...(palette.team ? createTeamOverlays(palette.team) : {}),

    // Create some additional useful variations
    primaryFaint: createSolidOverlay(primaryColor, 0.25, BlendMode.Normal),

    primaryStrong: createSolidOverlay(primaryColor, 0.75, BlendMode.Normal),

    darkVignette: createVignetteOverlay("#000000", 160, 0.8),

    softGlow: {
      style: OverlayStyle.Gradient,
      primaryColor: getColorWithOpacity(primaryLight, 0.4),
      secondaryColor: getColorWithOpacity(primaryColor, 0),
      gradientType: "radial",
      opacity: 0.7,
      blendMode: BlendMode.Screen,
    },
  };
};

/**
 * Creates team-specific overlay presets if team colors are available
 */
function createTeamOverlays(teamData: any) {
  if (!teamData || !teamData.colors) {
    return {};
  }

  const result: Record<string, any> = {};
  const colors = teamData.colors;

  // Use primary team color as overlay
  if (colors.primary) {
    result["teamPrimary"] = createSolidOverlay(
      colors.primary,
      0.5,
      BlendMode.Multiply,
    );

    // Create a gradient if secondary color exists
    if (colors.secondary) {
      result["teamGradient"] = createGradientOverlay(
        colors.primary,
        colors.secondary,
        "135deg",
        0.5,
        BlendMode.Overlay,
      );
    }
  }

  // Add special gradient types from your theme
  /*   if (gradients.primaryAdvanced) {
    result["primaryAdvancedGradient"] = {
      style: OverlayStyle.Gradient,
      primaryColor: gradients.primaryAdvanced.stops[0],
      secondaryColor: gradients.primaryAdvanced.stops[1],
      gradientType: "linear",
      gradientAngle: gradients.primaryAdvanced.direction || "to right",
      opacity: 0.5,
      blendMode: BlendMode.Normal,
    };
  } */

  // Add mesh gradients if available
  /*  if (gradients.meshGradient) {
    result["meshGradient"] = {
      style: OverlayStyle.Gradient,
      primaryColor: gradients.meshGradient.stops[0],
      secondaryColor: gradients.meshGradient.stops[1],
      // Use the CSS directly for mesh gradients
      customGradient: gradients.meshGradient.css.DEFAULT,
      opacity: 0.6,
      blendMode: BlendMode.Overlay,
    };
  } */

  // Add hard stop gradients if available
  /*   if (gradients.hardStopGradient) {
    result["hardStopGradient"] = {
      style: OverlayStyle.Gradient,
      primaryColor: gradients.hardStopGradient.stops[0],
      secondaryColor: gradients.hardStopGradient.stops[1],
      customGradient: gradients.hardStopGradient.css.DEFAULT,
      opacity: 0.5,
      blendMode: BlendMode.Normal,
    };
  } */

  return result;
}

/**
 * Creates overlay presets from gradient definitions
 */
function createGradientsFromTheme(palette: any) {
  const gradients = palette?.background?.gradient;

  if (!gradients || Object.keys(gradients).length === 0) {
    return {};
  }

  const result: Record<string, any> = {};

  // Process each gradient definition in the theme
  Object.entries(gradients).forEach(([key, gradient]: [string, any]) => {
    if (!gradient || !gradient.stops || gradient.stops.length < 2) {
      return;
    }

    // Create a preset name without 'Gradient' if it already contains it
    const presetName = key.includes("Gradient") ? key : `${key}Gradient`;

    // Create gradient overlay from theme definition
    if (gradient.type === "linear") {
      result[presetName] = createGradientOverlay(
        gradient.stops[0],
        gradient.stops[1],
        gradient.direction || "to right",
        0.5,
        BlendMode.Normal,
      );
    }
    // Handle radial gradients
    else if (gradient.type === "radial") {
      result[presetName] = {
        style: OverlayStyle.Gradient,
        primaryColor: gradient.stops[0],
        secondaryColor: gradient.stops[1],
        gradientType: "radial",
        opacity: 0.5,
        blendMode: BlendMode.Normal,
      };
    }
    // Handle conic gradients
    else if (gradient.type === "conic") {
      result[presetName] = {
        style: OverlayStyle.Gradient,
        primaryColor: gradient.stops[0],
        secondaryColor: gradient.stops[1],
        gradientType: "conic",
        opacity: 0.5,
        blendMode: BlendMode.Normal,
      };
    }
  });

  return result;
}

/**
 * Provides fallback overlay presets when no palette is available
 */
function createDefaultOverlayPresets() {
  return {
    // Basic solid overlays
    primarySolid: createSolidOverlay("#043666", 0.5, BlendMode.Normal),

    secondarySolid: createSolidOverlay("#FFFFFF", 0.3, BlendMode.Overlay),

    // Basic gradients
    primaryGradient: createGradientOverlay(
      "#043666",
      "#086ac8",
      "135deg",
      0.5,
      BlendMode.Normal,
    ),

    blueToWhiteGradient: createGradientOverlay(
      "#043666",
      "#FFFFFF",
      "135deg",
      0.5,
      BlendMode.Overlay,
    ),

    // Basic dark/light overlays
    darkOverlay: createSolidOverlay("#000000", 0.5, BlendMode.Normal),

    lightOverlay: createSolidOverlay("#FFFFFF", 0.3, BlendMode.Overlay),

    // Basic vignette
    darkVignette: createVignetteOverlay("#000000", 150, 0.7),

    // Basic duotone
    blueDuotone: createDuotoneOverlay("#043666", "#FFFFFF", 0.7, 0.85),

    // Basic filters
    warmFilter: createColorFilterOverlay(15, 110, 105, 105, 10),

    coolFilter: createColorFilterOverlay(210, 90, 95, 100, 0),
  };
}

export default createThemeOverlayPresets;
