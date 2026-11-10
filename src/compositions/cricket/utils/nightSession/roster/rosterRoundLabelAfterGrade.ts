/** Round line for roster meta — drops grade prefix when round repeats gradeName. */
export function rosterRoundLabelAfterGrade(
  gradeName: string,
  round: string,
): string {
  const grade = gradeName.trim();
  const full = round.trim();
  if (!full) {
    return "";
  }
  if (!grade) {
    return full;
  }
  if (full === grade) {
    return "";
  }
  if (full.startsWith(grade)) {
    const rest = full
      .slice(grade.length)
      .replace(/^[\s—–\-:]+/, "")
      .trim();
    return rest;
  }
  return full;
}
