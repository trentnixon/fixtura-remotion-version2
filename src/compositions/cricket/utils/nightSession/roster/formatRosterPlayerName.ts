/** Mirrors design/_shared/populate/cricket/roster-rows.js formatRosterPlayerName. */
export const formatRosterPlayerName = (name: string): string => {
  const value = String(name ?? "").trim();
  if (!value) {
    return value;
  }
  const letters = value.replace(/[^a-zA-Z]/g, "");
  if (letters.length > 0 && letters === letters.toUpperCase()) {
    return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
  return value;
};
