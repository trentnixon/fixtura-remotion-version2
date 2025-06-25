import { TitleScreenProps } from "../types";

// Common function to get horizontal alignment
const getHorizontalHeaderAlignment = (alignment: string = "center") => {
  switch (alignment) {
    case "start":
      return "justify-start"; // Left alignment
    case "end":
      return "justify-end"; // Right alignment
    case "center":
    default:
      return "justify-center"; // Center alignment
  }
};

// Base TwoColumnLayout Component - accepts right column elements as a parameter
const createTwoColumnHeader = (
  rightColumnElements: Array<"Title" | "Name">,
) => {
  return ({
    Logo,
    Title,
    Name,
    alignment = "center",
    height = 100,
  }: TitleScreenProps) => {
    const horizontalAlignment = getHorizontalHeaderAlignment(alignment);

    return (
      <div
        className="w-full p-0 justify-center flex items-center"
        style={{ height: `${height}px` }}
      >
        <div className={`flex ${horizontalAlignment} w-full p-2`}>
          {/* Main content row */}

          {/* Left Column - Logo (1/3 width) */}
          <div className="flex justify-center items-center">{Logo}</div>

          {/* Right Column - Title and Name (2/3 width) */}
          <div className="flex flex-col justify-center items-center">
            {rightColumnElements.map((item, index) => {
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
    );
  };
};

// Base ReverseTwoColumnLayout Component - with logo on right side
const createReverseTwoColumnHeader = (
  leftColumnElements: Array<"Title" | "Name">,
) => {
  return ({
    Logo,
    Title,
    Name,
    alignment = "center",
    height = 100,
  }: TitleScreenProps) => {
    const horizontalAlignment = getHorizontalHeaderAlignment(alignment);

    return (
      <div
        className="w-full p-0 justify-center flex items-center"
        style={{ height: `${height}px` }}
      >
        {/* Main content row */}
        <div className={`flex ${horizontalAlignment} w-full p-2`}>
          {/* Left Column - Title and Name (2/3 width) */}
          <div className="w-2/3 flex flex-col justify-center pr-1">
            {leftColumnElements.map((item, index) => {
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
          <div className="flex justify-center items-center ">{Logo}</div>
        </div>
      </div>
    );
  };
};

// Helper function to create all column permutations
const createAllPermutations = () => {
  const elements = ["Title", "Name"] as const;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const permutations: Record<string, any> = {};

  // Generate all permutations for standard layout (Logo on left)
  // Two element permutations
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const key = `TwoColumnHeader${element}`;
    permutations[key] = createTwoColumnHeader([element]);
  }

  // Full permutations (both elements)
  for (const first of elements) {
    for (const second of elements) {
      if (second === first) continue;
      const key = `TwoColumnHeader${first}${second}`;
      permutations[key] = createTwoColumnHeader([first, second]);
    }
  }

  // Generate all permutations for reversed layout (Logo on right)
  // Single element permutations
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const key = `ReverseTwoColumnHeader${element}`;
    permutations[key] = createReverseTwoColumnHeader([element]);
  }

  // Full permutations (both elements)
  for (const first of elements) {
    for (const second of elements) {
      if (second === first) continue;
      const key = `ReverseTwoColumnHeader${first}${second}`;
      permutations[key] = createReverseTwoColumnHeader([first, second]);
    }
  }

  return permutations;
};

// Standard layouts
export const TwoColumnHeader = createTwoColumnHeader(["Title", "Name"]);
export const ReverseTwoColumnHeader = createReverseTwoColumnHeader([
  "Title",
  "Name",
]);

// Generate all permutations automatically
export const {
  // Two-element standard permutations
  TwoColumnHeaderTitleName,
  TwoColumnHeaderNameTitle,

  // Single-element standard permutations
  TwoColumnHeaderTitle,
  TwoColumnHeaderName,

  // Two-element reversed permutations
  ReverseTwoColumnHeaderTitleName,
  ReverseTwoColumnHeaderNameTitle,

  // Single-element reversed permutations
  ReverseTwoColumnHeaderTitle,
  ReverseTwoColumnHeaderName,
} = createAllPermutations();
