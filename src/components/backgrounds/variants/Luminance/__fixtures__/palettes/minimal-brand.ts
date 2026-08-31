import type { DesignPalette } from "../../../../../../core/utils/designPalettes/types";

export const minimalBrandPalette: DesignPalette = {
  name: "primary",
  background: {
    main: "#112233",
    light: "#ddeeff",
    dark: "#020408",
    primary: "#224466",
    secondary: "#8899aa",
    userPrimary: "#224466",
    userSecondary: "#8899aa",
    contrast: "#ffffff",
    accent: "#ffcc00",
    gradient: {} as DesignPalette["background"]["gradient"],
  },
  container: {} as DesignPalette["container"],
  text: {} as DesignPalette["text"],
  shadow: {} as DesignPalette["shadow"],
};

export const problematicLightPalette: DesignPalette = {
  ...minimalBrandPalette,
  background: {
    ...minimalBrandPalette.background,
    dark: "#f5f5f5",
    primary: "#fafafa",
    accent: "#ffffff",
    light: "#ffffff",
  },
};
