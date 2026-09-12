import React from "react";
import { SCORELINE_BUNDLED_CSS } from "./generated/scorelineBundledCss";

const STYLE_ELEMENT_ID = "fixtura-scoreline-styles";

/**
 * Injects Scoreline layout CSS for package preview hosts that do not import
 * @fixtura/remotion-assets/styles.css. Used from FixturaTemplateScene only.
 */
export const ScorelineBundledStyles: React.FC = () => (
  <style
    id={STYLE_ELEMENT_ID}
    dangerouslySetInnerHTML={{ __html: SCORELINE_BUNDLED_CSS }}
  />
);
