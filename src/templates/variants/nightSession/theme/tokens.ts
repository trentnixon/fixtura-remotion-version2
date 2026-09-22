import type { TemplateThemeConfig } from "../../../types/TemplateThemeConfig";

export const nightSessionTokens = {
  fonts: {
    title: {
      family: "Teko",
    },
    subtitle: {
      family: "Source Sans 3",
    },
    copy: {
      family: "Source Sans 3",
    },
  },

  fontClasses: {
    heading: { family: "Teko" },
    subheading: { family: "Source Sans 3" },
    body: { family: "Source Sans 3" },
  },
} satisfies Pick<TemplateThemeConfig, "fonts" | "fontClasses">;
