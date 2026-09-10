import type { ThemeModes } from "../../../types/global/theme-shared";

export const scorelineMode: ThemeModes = {
  light: {
    container: {
      background: "#ffffff",
      backgroundAlt: "#f3f0ea",
      backgroundTransparent: "rgba(255, 255, 255, 0.5)",
    },
    text: {
      title: "#080b0d",
      copy: "#080b0d",
    },
  },
  lightAlt: {
    container: {
      background: "#ffffff",
      backgroundAlt: "#f3f0ea",
      backgroundTransparent: "rgba(255, 255, 255, 0.5)",
    },
    text: {
      title: "#080b0d",
      copy: "#080b0d",
    },
  },
  dark: {
    container: {
      background: "#080b0d",
      backgroundAlt: "#1a1a1a",
      backgroundTransparent: "rgba(0, 0, 0, 0.5)",
    },
    text: {
      title: "#ffffff",
      copy: "#ffffff",
    },
  },
  darkAlt: {
    container: {
      background: "#080b0d",
      backgroundAlt: "#1a1a1a",
      backgroundTransparent: "rgba(0, 0, 0, 0.5)",
    },
    text: {
      title: "#ffffff",
      copy: "#ffffff",
    },
  },
};
