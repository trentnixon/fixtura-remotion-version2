import { useThemeContext } from "../../../../../core/context/ThemeContext";

/**
 * Get font family from theme context
 * @returns Font family string from theme context
 */
export const useFontFamily = (): string | undefined => {
  const { fontClasses } = useThemeContext();
  return fontClasses.copy?.family;
};
