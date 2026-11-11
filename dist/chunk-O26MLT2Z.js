"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var _chunkTQMZUA5Ijs = require("./chunk-TQMZUA5I.js");

// src/components/layout/screen/OneColumn.tsx
var _remotion = require("remotion");
var _jsxruntime = require("react/jsx-runtime");
var OneColumn = ({ Header }) => {
  const { layout } = _chunkTQMZUA5Ijs.useThemeContext.call(void 0);
  const { heights } = layout;
  const compositionRouteHeight =
    _chunkTQMZUA5Ijs.getCompositionSectionHeight.call(void 0, heights);
  const headerPx = heights.header;
  const { data } = _chunkTQMZUA5Ijs.useVideoDataContext.call(void 0);
  const { timings } = data;
  const { FPS_MAIN } = timings;
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _remotion.AbsoluteFill, {
    children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", {
      className: "flex flex-col h-full w-full ",
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
          style: {
            height: `${headerPx}px`,
            minHeight: `${headerPx}px`,
            maxHeight: `${headerPx}px`,
            flexShrink: 0,
          },
          className: "flex min-h-0 w-full flex-col overflow-visible px-2 py-0",
          children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
            className: "flex h-full min-h-0 w-full flex-col",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Header, {}),
          }),
        }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
          className: "relative",
          style: {
            height: `${compositionRouteHeight}px`,
          },
          children: _chunkTQMZUA5Ijs.RouteToComposition.call(void 0),
        }),
        /* @__PURE__ */ _jsxruntime.jsx.call(
          void 0,
          _chunkTQMZUA5Ijs.ProgressTimer,
          { FRAMES: FPS_MAIN != null ? FPS_MAIN : 0 },
        ),
      ],
    }),
  });
};

exports.OneColumn = OneColumn;
//# sourceMappingURL=chunk-O26MLT2Z.js.map
