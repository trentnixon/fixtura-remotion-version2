import type { ThemeLayout } from "../../../types/global/theme-shared";

/** Scoreline zones: header 140 + asset 1088 + footer 112 = 1350 */
export const scorelineLayout: ThemeLayout = {
  heights: {
    asset: 1088,
    header: 140,
    footer: 112,
  },
  spacing: {
    section: "space-y-0",
    item: "space-y-0",
  },
  padding: {
    container: "p-0",
    section: "py-0",
    item: "py-0",
  },
  borderRadius: {
    container: "rounded-none",
  },
};
