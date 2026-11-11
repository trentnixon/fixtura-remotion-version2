/** @param {number} count */
export function resolveRosterDensity(count) {
  if (count <= 11) {
    return "normal";
  }
  if (count <= 14) {
    return "compact";
  }
  return "tight";
}
