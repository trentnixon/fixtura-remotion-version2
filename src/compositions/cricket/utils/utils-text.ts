// Helper function to truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

/**
 * Truncates player name to first initial + full last name (e.g. "J. Smith").
 * Preserves role suffixes: C, VC, (C), (VC), (WK).
 * Returns as-is if empty or already within maxLength.
 */
export const truncatePlayerName = (
  text: string,
  maxLength: number = 20,
): string => {
  if (!text || text.length <= maxLength) return text || "";

  const trimmedText = text.trim();

  if (isRoleIndicator(trimmedText)) {
    return trimmedText;
  }

  const { cleanedName, roleSuffixes } = extractAllRoleSuffixes(trimmedText);

  const nameParts = cleanedName.split(/\s+/).filter(Boolean);
  if (nameParts.length < 2) {
    const truncated = cleanedName.substring(0, maxLength - 3) + "...";
    return roleSuffixes.length > 0
      ? `${truncated} ${roleSuffixes.join(" ")}`
      : truncated;
  }

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const truncatedName = `${firstName.charAt(0)}. ${lastName}`;

  if (truncatedName.length > maxLength) {
    const truncated = cleanedName.substring(0, maxLength - 3) + "...";
    return roleSuffixes.length > 0
      ? `${truncated} ${roleSuffixes.join(" ")}`
      : truncated;
  }

  return roleSuffixes.length > 0
    ? `${truncatedName} ${roleSuffixes.join(" ")}`
    : truncatedName;
};

function isRoleIndicator(text: string): boolean {
  const rolePatterns = [
    /^[A-Z]\.\s*\([^)]+\)$/, // e.g. "B. (WK)"
    /^[A-Z]\.\s*[A-Z]+$/, // e.g. "B. WK"
    /^\([^)]+\)$/, // e.g. "(WK)"
  ];
  return rolePatterns.some((pattern) => pattern.test(text));
}

/** Role suffixes to strip from names; matched case-insensitively so " (c)" and " (C)" both strip */
const ROLE_SUFFIXES = [
  " (WK)",
  " VC",
  " C",
  " (VC)",
  " (C)",
];

function extractAllRoleSuffixes(
  text: string,
): { cleanedName: string; roleSuffixes: string[] } {
  let cleaned = text;
  const extractedSuffixes: string[] = [];

  for (const suffix of ROLE_SUFFIXES) {
    const re = new RegExp(
      suffix.replace(/[()]/g, "\\$&").replace(/\s+/g, "\\s+"),
      "gi",
    );
    const match = cleaned.match(re);
    if (match) {
      extractedSuffixes.push(match[0].trim());
      cleaned = cleaned.replace(re, " ").trim();
    }
  }

  return {
    cleanedName: cleaned.trim(),
    roleSuffixes: extractedSuffixes,
  };
}

// format Date to DD/MM/YYYY  eg 06 Sep 25
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const stripGradeNumberFromTeamName = (teamName: string) => {
  console.log("teamName", teamName);
  const GradeLookUp = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "W1",
    "W2",
    "W3",
    "Brewer",
    "Brewer Shield",
    "AWG",
    "L/O",
  ];

  // Find grade number (case insensitive)
  const gradeNumber = GradeLookUp.find((grade) =>
    teamName.toUpperCase().includes(grade.toUpperCase()),
  );

  if (gradeNumber) {
    // Remove the grade number and return cleaned team name
    return teamName.toUpperCase().replace(gradeNumber.toUpperCase(), "").trim();
  }

  return teamName.toUpperCase();
};
