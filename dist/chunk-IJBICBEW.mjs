import {
  ProgressTimer,
  RouteToComposition,
  getCompositionSectionHeight,
  useThemeContext,
  useVideoDataContext,
} from "./chunk-YUUFNNHG.mjs";

// src/components/layout/screen/OneColumn.tsx
import { AbsoluteFill } from "remotion";
import { jsx, jsxs } from "react/jsx-runtime";
var OneColumn = ({ Header }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const compositionRouteHeight = getCompositionSectionHeight(heights);
  const headerPx = heights.header;
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { FPS_MAIN } = timings;
  return /* @__PURE__ */ jsx(AbsoluteFill, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col h-full w-full ",
      children: [
        /* @__PURE__ */ jsx("div", {
          style: {
            height: `${headerPx}px`,
            minHeight: `${headerPx}px`,
            maxHeight: `${headerPx}px`,
            flexShrink: 0,
          },
          className: "flex min-h-0 w-full flex-col overflow-visible px-2 py-0",
          children: /* @__PURE__ */ jsx("div", {
            className: "flex h-full min-h-0 w-full flex-col",
            children: /* @__PURE__ */ jsx(Header, {}),
          }),
        }),
        /* @__PURE__ */ jsx("div", {
          className: "relative",
          style: {
            height: `${compositionRouteHeight}px`,
          },
          children: RouteToComposition(),
        }),
        /* @__PURE__ */ jsx(ProgressTimer, {
          FRAMES: FPS_MAIN != null ? FPS_MAIN : 0,
        }),
      ],
    }),
  });
};

export { OneColumn };
//# sourceMappingURL=chunk-IJBICBEW.mjs.map
