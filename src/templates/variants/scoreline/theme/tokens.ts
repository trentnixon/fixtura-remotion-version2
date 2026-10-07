import type { TemplateThemeConfig } from "../../../types/TemplateThemeConfig";

export const scorelineTokens = {
  fonts: {
    title: {
      family: "Geist",
    },
    subtitle: {
      family: "Geist",
    },
    copy: {
      family: "Geist",
    },
  },

  fontClasses: {
    heading: { family: "Geist" },
    subheading: { family: "Geist" },
    body: { family: "Geist" },
  },
} satisfies Pick<TemplateThemeConfig, "fonts" | "fontClasses">;
