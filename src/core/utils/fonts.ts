/**
 * Font configurations for the application
 *
 * This file defines all available fonts that can be used in templates.
 * Fonts are organized by category for easier selection.
 */

// Display fonts (for headings, titles, and large text)
const displayFonts = {
  tungsten: "Tungsten",
  druk: "Druk",
  monumentExtended: "Monument Extended",
  anton: "Anton",
  bebas: "Bebas Neue",
};

// Text fonts (for body text, paragraphs, and general reading)
const textFonts = {
  heebo: "Heebo",
  roboto: "Roboto",
  robotoCondensed: "Roboto Condensed",
  inter: "Inter",
  openSans: "Open Sans",
  lato: "Lato",
};

// Specialty fonts (for specific use cases)
const specialtyFonts = {
  sportScore: "Score Board", // For score displays
  monospace: "JetBrains Mono", // For code or technical data
  handwritten: "Caveat", // For casual, handwritten style
};

// Combined font object with all categories
const fonts = {
  // Display fonts
  ...displayFonts,

  // Text fonts
  ...textFonts,

  // Specialty fonts
  ...specialtyFonts,

  // Font categories for easier reference
  display: displayFonts,
  text: textFonts,
  specialty: specialtyFonts,
};

export default fonts;
