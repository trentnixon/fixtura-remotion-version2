/** @param {string} name */
export function formatRosterPlayerName(name) {
  const value = String(name ?? "").trim();
  if (!value) {
    return value;
  }
  const letters = value.replace(/[^a-zA-Z]/g, "");
  if (letters.length > 0 && letters === letters.toUpperCase()) {
    return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
  return value;
}
