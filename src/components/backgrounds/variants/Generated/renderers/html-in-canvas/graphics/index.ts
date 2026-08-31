import type React from "react";
import type { HtmlInCanvasGraphicId, HtmlInCanvasPalette } from "../types";
import { DomNeonBeamsField } from "./DomNeonBeamsField";
import { DomOrbitRingsField } from "./DomOrbitRingsField";
import { DomScoreboardGridField } from "./DomScoreboardGridField";

export const HTML_IN_CANVAS_GRAPHICS: Record<
  HtmlInCanvasGraphicId,
  React.FC<{ palette: HtmlInCanvasPalette }>
> = {
  "orbit-rings": DomOrbitRingsField,
  "scoreboard-grid": DomScoreboardGridField,
  "neon-beams": DomNeonBeamsField,
};
