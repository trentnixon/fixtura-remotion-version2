import React from "react";
import { NIGHT_SESSION_BUNDLED_CSS } from "./generated/nightSessionBundledCss";

const STYLE_ELEMENT_ID = "fixtura-night-session-styles";

/**
 * Injects Night Session layout CSS for package preview hosts that do not import
 * @fixtura/remotion-assets/styles.css. Used from FixturaTemplateScene only.
 */
export const NightSessionBundledStyles: React.FC = () => (
  <style
    id={STYLE_ELEMENT_ID}
    dangerouslySetInnerHTML={{ __html: NIGHT_SESSION_BUNDLED_CSS }}
  />
);
