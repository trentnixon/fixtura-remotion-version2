import type { TemplateThemeConfig } from "../../../types/TemplateThemeConfig";

export const nightSessionTokens = {
  fonts: {
    title: {
      family: "Teko",
    },
    subtitle: {
      family: "Heebo",
    },
    copy: {
      family: "Heebo",
    },
  },

  fontClasses: {
    heading: { family: "Teko" },
    subheading: { family: "Heebo" },
    body: { family: "Heebo" },
  },
} satisfies Pick<TemplateThemeConfig, "fonts" | "fontClasses">;
