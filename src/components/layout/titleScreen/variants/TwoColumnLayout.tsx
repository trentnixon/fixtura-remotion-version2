import { AbsoluteFill } from "remotion";
import { TitleScreenProps } from "../types";

// Base TwoColumnLayout Component - accepts right column order as a parameter
const createTwoColumnLayout = (
  rightColumnOrder: Array<"Title" | "Name" | "PrimarySponsor">,
) => {
  return ({
    Logo,
    Title,
    Name,
    PrimarySponsor,
    alignment = "center",
  }: TitleScreenProps) => {
    // Calculate the right alignment classes based on the prop
    const containerAlignment =
      alignment === "start"
        ? "justify-start"
        : alignment === "end"
          ? "justify-end"
          : "justify-center";

    return (
      <AbsoluteFill>
        <div
          className={`flex flex-col ${containerAlignment} h-full w-full px-2 py-8`}
        >
          {/* Main content row that gets positioned by the parent container */}
          <div className="flex w-full">
            {/* Left Column - Logo (1/3 width) */}
            <div className="w-1/3 flex items-end justify-end pr-1">
              <div>{Logo}</div>
            </div>

            {/* Right Column - Title and Name (2/3 width) */}
            <div className="w-2/3 flex flex-col justify-center pl-1">
              {rightColumnOrder.map((item, index) => {
                switch (item) {
                  case "Title":
                    return (
                      <div key={`title-${index}`} className="mb-0 w-full">
                        {Title}
                      </div>
                    );
                  case "Name":
                    return (
                      <div key={`name-${index}`} className="w-full">
                        {Name}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        </div>
        <div className="w-full m-4 flex justify-center items-center">
          {PrimarySponsor}
        </div>
      </AbsoluteFill>
    );
  };
};

// Create the two possible variations of the right column content order
export const TwoColumnLayout = createTwoColumnLayout(["Title", "Name"]);
export const TwoColumnLayoutNameTitle = createTwoColumnLayout([
  "Name",
  "Title",
]);

// Now create variations with the logo on the right side
const createReverseTwoColumnLayout = (
  rightColumnOrder: Array<"Title" | "Name" | "PrimarySponsor">,
) => {
  return ({ Logo, Title, Name, alignment = "center" }: TitleScreenProps) => {
    // Calculate the right alignment classes based on the prop
    const containerAlignment =
      alignment === "start"
        ? "justify-start"
        : alignment === "end"
          ? "justify-end"
          : "justify-center";

    return (
      <AbsoluteFill>
        <div
          className={`flex flex-col ${containerAlignment} h-full w-full px-2 py-8`}
        >
          {/* Main content row that gets positioned by the parent container */}
          <div className="flex w-full">
            {/* Left Column - Title and Name (2/3 width) */}
            <div className="w-2/3 flex flex-col justify-center pr-1">
              {rightColumnOrder.map((item, index) => {
                switch (item) {
                  case "Title":
                    return (
                      <div key={`title-${index}`} className="mb-0 w-full">
                        {Title}
                      </div>
                    );
                  case "Name":
                    return (
                      <div key={`name-${index}`} className="w-full">
                        {Name}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
            {/* Right Column - Logo (1/3 width) */}
            <div className="w-1/3 flex items-start justify-start pl-1">
              <div>{Logo}</div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    );
  };
};

// Create the reversed variations
export const ReverseTwoColumnLayout = createReverseTwoColumnLayout([
  "Title",
  "Name",
  "PrimarySponsor",
]);
export const ReverseTwoColumnLayoutNameTitle = createReverseTwoColumnLayout([
  "Name",
  "Title",
  "PrimarySponsor",
]);
