import type { ThemeModes } from "../../../types/global/theme-shared";

export const broadcastProMode: ThemeModes = {
  light: {
    container: {
      background: "#fff",
      backgroundAlt: "#f0f0f0",
      backgroundTransparent: "rgba(255, 255, 255, 0.5)",
    },
    text: {
      title: "#000",
      copy: "#000",
    },
  },
  lightAlt: {
    container: {
      background: "#fff",
      backgroundAlt: "#f0f0f0",
      backgroundTransparent: "rgba(255, 255, 255, 0.5)",
    },
    text: {
      title: "#fff",
      copy: "#000",
    },
  },
  dark: {
    container: {
      background: "#000",
      backgroundAlt: "#1a1a1a",
      backgroundTransparent: "rgba(0, 0, 0, 0.5)",
    },
    text: {
      title: "#fff",
      copy: "#fff",
    },
  },
  darkAlt: {
    container: {
      background: "#000",
      backgroundAlt: "#1a1a1a",
      backgroundTransparent: "rgba(0, 0, 0, 0.5)",
    },
    text: {
      title: "#000",
      copy: "#fff",
    },
  },
};
