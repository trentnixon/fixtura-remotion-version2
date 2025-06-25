import { AbsoluteFill } from "remotion";
import { TitleScreenProps } from "../types";

// Common function to get vertical alignment
const getVerticalContainerAlignment = (alignment: string = "center") => {
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
  return ({ Logo, Title, Name, alignment = "center" }: TitleScreenProps) => {
    const verticalContainerAlignment = getVerticalContainerAlignment(alignment);

    return (
      <AbsoluteFill>
        <div
          className={`flex flex-col items-center ${verticalContainerAlignment} h-full w-full px-12 py-8`}
        >
          {/* Content group - all elements centered horizontally */}
          <div className="flex flex-col items-center">
            {order.map((item, index) => {
              switch (item) {
                case "Logo":
                  return (
                    <div
                      key={`logo-${index}`}
                      className="w-full flex justify-center pb-0"
                    >
                      {Logo}
                    </div>
                  );
                case "Title":
                  return (
                    <div
                      key={`title-${index}`}
                      className="my-1 w-full text-center"
                    >
                      {Title}
                    </div>
                  );
                case "Name":
                  return (
                    <div key={`name-${index}`} className="my-1 self-center">
                      {Name}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </AbsoluteFill>
    );
  };
};

// Create specific layouts with different element orders
export const VerticalStack = createVerticalStack(["Logo", "Title", "Name"]);
export const VerticalStackTitleLogoName = createVerticalStack([
  "Title",
  "Logo",
  "Name",
]);
export const VerticalStackTitleNameLogo = createVerticalStack([
  "Title",
  "Name",
  "Logo",
]);
export const VerticalStackLogoNameTitle = createVerticalStack([
  "Logo",
  "Name",
  "Title",
]);
export const VerticalStackLogoTitleName = createVerticalStack([
  "Logo",

  "Title",
  "Name",
]);
export const VerticalStackNameLogoTitle = createVerticalStack([
  "Name",
  "Logo",
  "Title",
]);
export const VerticalStackNameTitleLogo = createVerticalStack([
  "Name",
  "Title",
  "Logo",
]);
