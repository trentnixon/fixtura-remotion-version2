// src/components/layout/titleScreen/variants/VerticalStack.tsx
import { AbsoluteFill } from "remotion";
import { jsx } from "react/jsx-runtime";
var getVerticalContainerAlignment = (alignment = "center") => {
  switch (alignment) {
    case "start":
      return "justify-start";
    case "end":
      return "justify-end";
    case "center":
    default:
      return "justify-center";
  }
};
var createVerticalStack = (order) => {
  return ({ Logo, Title, Name, alignment = "center" }) => {
    const verticalContainerAlignment = getVerticalContainerAlignment(alignment);
    return /* @__PURE__ */ jsx(AbsoluteFill, { children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `flex flex-col items-center ${verticalContainerAlignment} h-full w-full px-12 py-8`,
        children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center", children: order.map((item, index) => {
          switch (item) {
            case "Logo":
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-full flex justify-center pb-0",
                  children: Logo
                },
                `logo-${index}`
              );
            case "Title":
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: "my-1 w-full text-center",
                  children: Title
                },
                `title-${index}`
              );
            case "Name":
              return /* @__PURE__ */ jsx("div", { className: "my-1 self-center", children: Name }, `name-${index}`);
            default:
              return null;
          }
        }) })
      }
    ) });
  };
};
var VerticalStack = createVerticalStack(["Logo", "Title", "Name"]);
var VerticalStackTitleLogoName = createVerticalStack([
  "Title",
  "Logo",
  "Name"
]);
var VerticalStackTitleNameLogo = createVerticalStack([
  "Title",
  "Name",
  "Logo"
]);
var VerticalStackLogoNameTitle = createVerticalStack([
  "Logo",
  "Name",
  "Title"
]);
var VerticalStackLogoTitleName = createVerticalStack([
  "Logo",
  "Title",
  "Name"
]);
var VerticalStackNameLogoTitle = createVerticalStack([
  "Name",
  "Logo",
  "Title"
]);
var VerticalStackNameTitleLogo = createVerticalStack([
  "Name",
  "Title",
  "Logo"
]);

export {
  VerticalStackTitleLogoName,
  VerticalStackLogoTitleName
};
//# sourceMappingURL=chunk-42Q3FJK7.mjs.map