// Formatting

/**
 * Calculates letter spacing based on container width, font size, and string length
 */
export const calculateLetterSpacing = (
  containerWidth: number,
  fontSize: number,
  text: string,
): number => {
  const stringWidth = text.length * fontSize;
  return (containerWidth - stringWidth) / (text.length - 1);
};

/**
 * Restricts a string to a maximum length and adds ellipsis if needed
 */
export function restrictString(
  str: string,
  maxLength: number = 20,
): string | null {
  if (typeof str !== "string") {
    console.error("Invalid input: str must be a string");
    return null;
  }
  if (!str.length) {
    return str;
  }
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
}

/**
 * Splits score by runs and overs
 */
export const splitSocreByRunsAndOvers = (
  SCORES: string,
): [string, string | null] => {
  return SCORES.includes("(")
    ? (SCORES.split(" (") as [string, string])
    : [SCORES, null];
};

/**
 * Parses a score string into score and overs
 */
export const parseScore = (
  scoreString: string,
): { score: string; overs: string | undefined } => {
  const parts = scoreString.split("(");
  const score = parts[0];
  const overs = parts[1]?.replace(")", "");

  return { score, overs };
};

/**
 * Restricts a name to a maximum length, preserving bracketed parts
 * and shortening first names to initials if necessary
 */
export const restrictName = (
  name: string,
  maxLength: number,
): string | null => {
  if (typeof name !== "string") {
    console.error("Invalid input: name must be a string");
    return null;
  }

  if (typeof maxLength !== "number") {
    console.error("Invalid input: maxLength must be a number");
    return null;
  }

  // Extract the bracketed part
  const bracketedPart = name.match(/\s\([^)]+\)$/);
  let nameWithoutBrackets = bracketedPart
    ? name.replace(bracketedPart[0], "")
    : name;

  nameWithoutBrackets = nameWithoutBrackets.trim();

  if (nameWithoutBrackets.length <= maxLength) {
    return bracketedPart
      ? nameWithoutBrackets + bracketedPart[0]
      : nameWithoutBrackets;
  }

  const nameParts = nameWithoutBrackets.split(/\s+/);

  if (nameParts.length < 2) {
    console.warn(
      "Name is a single word, returning as is even if it exceeds maxLength",
    );
    return nameWithoutBrackets + (bracketedPart ? bracketedPart[0] : "");
  }

  try {
    const firstNameInitial = nameParts[0].charAt(0);
    const lastName = nameParts[nameParts.length - 1];
    let shortenedName = `${firstNameInitial}. ${lastName}`;

    // Append the bracketed part if it exists
    if (bracketedPart) {
      shortenedName += bracketedPart[0];
    }

    return shortenedName;
  } catch (error) {
    console.error("Error processing the name:", error);
    return "";
  }
};

/**
 * Removes emojis and non-standard characters from a string
 */
export function removeEmojis(str: string): string {
  // Removes most emoji and some symbols
  return str.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");
}

/**
 * Capitalizes the first letter of each word in a name
 */
export const capitalizeFirstLetterOfName = (text: string): string => {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
