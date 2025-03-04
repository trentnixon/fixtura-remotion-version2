// src/templates/variants/basic/config.ts
import fonts from "../../../core/utils/fonts";
import _ from "lodash";

// Base template settings
export const basicSettings = {
  fontConfig: fonts.heebo,
  defaultCopyFontFamily: fonts.heebo,
  gradientDegree: "0deg",
  heights: {
    AssetHeight: 1350,
    Header: 190,
    Footer: 110,
  },
  SponsorPositionAndAnimations: {
    animationType: "FromTop",
    alignSponsors: "center",
  },
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
};

// Common options across all variants
const commonOptions = {
  Video: {
    Theme: {
      dark: "#111",
      white: "#FFF",
      primary: "#12a54a",
      secondary: "#ed2024",
    },
    HeroImage: {
      url: "https://fixtura.s3.ap-southeast-2.amazonaws.com/8ffe9be9_0ac3_4325_851b_5e15672aad9c_061fe22535.jpeg",
      ratio: "landscape",
      width: 3680,
      height: 2453,
    },
    TemplateVariation: {
      useBackground:
        "https://fixtura.s3.ap-southeast-2.amazonaws.com/default-background.png",
      useVideo:
        "https://fixtura.s3.ap-southeast-2.amazonaws.com/Fixtura_graphic_BG_Test003_8d811f41ca_1_67822a2468.mp4",
    },
  },
};

// Variant-specific configurations
const gradientVariant = {
  Video: {
    TemplateVariation: {
      Background: "Gradient",
    },
  },
};

const videoVariant = {
  Video: {
    TemplateVariation: {
      Background: "Video",
    },
  },
};

const graphicsVariant = {
  Video: {
    TemplateVariation: {
      Background: "Graphics",
    },
  },
};

const imageVariant = {
  Video: {
    TemplateVariation: {
      Background: "Image",
    },
  },
};

const solidVariant = {
  Video: {
    TemplateVariation: {
      Background: false,
    },
  },
};

// Export variant types
export const basicVariantTypes = [
  "Graphics",
  "Solid",
  "Image",
  "Gradient",
  "Video",
];

// Merge common options with variant-specific options
export const basicVariants = {
  Graphics: _.merge({}, _.cloneDeep(commonOptions), graphicsVariant),
  Solid: _.merge({}, _.cloneDeep(commonOptions), solidVariant),
  Image: _.merge({}, _.cloneDeep(commonOptions), imageVariant),
  Video: _.merge({}, _.cloneDeep(commonOptions), videoVariant),
  Gradient: _.merge({}, _.cloneDeep(commonOptions), gradientVariant),
};
