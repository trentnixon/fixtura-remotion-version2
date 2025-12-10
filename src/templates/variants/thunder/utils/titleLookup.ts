/**
 * Title lookup for simplified/alternative terms
 * Maps full titles to shorter alternatives for better display
 */
export interface TitleLookup {
  term: string;
  use: string;
}

export const titleLookup: TitleLookup[] = [
  {
    term: "Batting Performances",
    use: "Batting",
  },
  {
    term: "Bowling Performances",
    use: "Bowling",
  },
  // Add more mappings as needed
];

/**
 * Get the alternative/simplified term for a given title
 * @param title - The full title text
 * @returns The simplified term if found, otherwise returns the original title
 */
export const getSimplifiedTitle = (title: string): string => {
  if (!title) return title;
  // Trim whitespace, normalize multiple spaces to single space, and compare
  const normalizedTitle = title.trim().replace(/\s+/g, " ");
  const lookup = titleLookup.find(
    (item) => item.term.toLowerCase() === normalizedTitle.toLowerCase(),
  );
  return lookup ? lookup.use : title;
};
