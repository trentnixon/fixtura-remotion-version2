import fonts from "../../core/utils/fonts";

export const baseTheme = {
  // Font configuration
  fontConfig: fonts.heebo,
  defaultCopyFontFamily: fonts.heebo,

  // Layout configuration
  heights: {
    AssetHeight: 1350,
    Header: 190,
    Footer: 110,
  },

  // Typography configuration
  fontSizing: {
    Title: {
      L: "7em",
      M: "5em",
      S: "3em",
    },
    TitleAlt: {
      XL: "6em",
      L: "2em",
      M: "1.5em",
      S: "1em",
    },
    Copy: {
      XL: "4.8em",
      L: "3em",
      M: "2em",
      S: "1.5em",
      XS: "1em",
    },
  },
  letterSpacing: {
    Title: "-2px",
    TitleAlt: "-3px",
    Copy: "-2px",
  },
  lineHeight: {
    Title: "0.8em",
    Copy: "1em",
    TitleAlt: "1em",
  },
  fontWeight: {
    Title: {
      Bold: "900",
      Semi: "600",
      Normal: "400",
      Thin: "200",
    },
    Copy: {
      Bold: "900",
      Semi: "600",
      Normal: "400",
      Thin: "200",
    },
  },

  // Sponsors configuration
  SponsorPositionAndAnimations: {
    animationType: "FromTop",
    alignSponsors: "center",
  },
};
