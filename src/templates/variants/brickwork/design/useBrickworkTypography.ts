import { useThemeContext } from "../../../../core/context/ThemeContext";
import {
  BRICKWORK_TABULAR_NUMS_STYLE,
  getBrickworkCopyFontFamily,
  getBrickworkDisplayFontFamily,
} from "./typography";

export const useBrickworkTypography = () => {
  const { fontClasses, fonts } = useThemeContext();

  return {
    displayFont: getBrickworkDisplayFontFamily(fontClasses, fonts),
    copyFont: getBrickworkCopyFontFamily(fontClasses, fonts),
    tabularNumsStyle: BRICKWORK_TABULAR_NUMS_STYLE,
  };
};
