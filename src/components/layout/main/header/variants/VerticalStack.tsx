import React from "react";
import { TitleScreenProps } from "../types";

// Cross-axis (horizontal) when flex-col
const getHorizontalHeaderAlignment = (alignment: string = "center") => {
  switch (alignment) {
    case "start":
      return "items-start";
    case "end":
      return "items-end";
    case "center":
    default:
      return "items-center";
  }
};

// Main-axis (vertical) when flex-col — avoids content hugging the top of fixed-height headers
const getVerticalHeaderJustify = (alignment: string = "center") => {
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

// Base VerticalStack Component - accepts order as a parameter
const createVerticalStack = (order: Array<"Logo" | "Title" | "Name">) => {
  return ({
    Logo,
    Title,
    Name,
    alignment = "center",
    height = 100,
  }: TitleScreenProps) => {
    const horizontalHeaderAlignment = getHorizontalHeaderAlignment(alignment);
    const verticalJustify = getVerticalHeaderJustify(alignment);

    return (
      <div
        className={`flex flex-col ${verticalJustify} ${horizontalHeaderAlignment} w-full px-1 py-0 min-h-0 overflow-visible`}
        style={{ height: `${height}px` }}
      >
        <div className={`flex flex-col w-full ${horizontalHeaderAlignment}`}>
          {order.map((item, index) => {
            switch (item) {
              case "Logo":
                return (
                  <React.Fragment key={`logo-${index}`}>{Logo}</React.Fragment>
                );
              case "Title":
                return (
                  <div key={`title-${index}`} className="my-0">
                    {Title}
                  </div>
                );
              case "Name":
                return (
                  <div key={`name-${index}`} className="my-0">
                    {Name}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    );
  };
};

// Helper function to create all possible 1-element, 2-element and 3-element permutations
const createPermutations = () => {
  const elements = ["Logo", "Title", "Name"] as const;
  const oneElementPerms: Record<
    string,
    ReturnType<typeof createVerticalStack>
  > = {};
  const twoElementPerms: Record<
    string,
    ReturnType<typeof createVerticalStack>
  > = {};
  const threeElementPerms: Record<
    string,
    ReturnType<typeof createVerticalStack>
  > = {};

  // Generate 1-element permutations
  for (const element of elements) {
    const key = `VerticalHeader${element}Only`;
    oneElementPerms[key] = createVerticalStack([element]);
  }

  // Generate 3-element permutations
  for (const first of elements) {
    for (const second of elements) {
      if (second === first) continue;
      for (const third of elements) {
        if (third === first || third === second) continue;
        const key = `VerticalHeader${first}${second}${third}`;
        threeElementPerms[key] = createVerticalStack([first, second, third]);
      }
    }
  }

  // Generate 2-element permutations
  for (const first of elements) {
    for (const second of elements) {
      if (second === first) continue;
      const key = `VerticalHeader${first}${second}`;
      twoElementPerms[key] = createVerticalStack([first, second]);
    }
  }

  return { ...oneElementPerms, ...twoElementPerms, ...threeElementPerms };
};

// Standard 3-element layout
export const VerticalHeader = createVerticalStack(["Logo", "Title", "Name"]);

// Generate all permutations automatically
export const {
  VerticalHeaderLogoTitleName,
  VerticalHeaderLogoNameTitle,
  VerticalHeaderTitleLogoName,
  VerticalHeaderTitleNameLogo,
  VerticalHeaderNameLogoTitle,
  VerticalHeaderNameTitleLogo,
  VerticalHeaderLogoTitle,
  VerticalHeaderLogoName,
  VerticalHeaderTitleLogo,
  VerticalHeaderTitleName,
  VerticalHeaderNameLogo,
  VerticalHeaderNameTitle,
  VerticalHeaderLogoOnly,
  VerticalHeaderTitleOnly,
  VerticalHeaderNameOnly,
} = createPermutations();
