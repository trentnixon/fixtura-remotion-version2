import type { TemplateThemeConfig } from "../../../types/TemplateThemeConfig";

export const scorelineTokens = {
  fonts: {
    title: {
      family: "Barlow Condensed",
    },
    subtitle: {
      family: "Source Sans 3",
    },
    copy: {
      family: "Source Sans 3",
    },
  },

  fontClasses: {
    heading: { family: "Barlow Condensed" },
    subheading: { family: "Source Sans 3" },
    body: { family: "Source Sans 3" },
  },
} satisfies Pick<TemplateThemeConfig, "fonts" | "fontClasses">;
