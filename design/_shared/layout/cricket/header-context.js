/**
 * Shared competition / round in centred Night Session header lockup.
 *
 * @param {ParentNode} root
 * @param {{ data?: Array<{ gradeName?: string; round?: string }> }} fixture
 */
export function syncUpcomingHeaderContext(root, fixture) {
  syncResultsHeaderContext(root, fixture);
}

/**
 * @param {ParentNode} root
 * @param {{ data?: Array<{ gradeName?: string; round?: string }> }} fixture
 */
export function syncResultsHeaderContext(root, fixture) {
  const gradeEl = root.querySelector(".header-shared-grade");
  const roundEl = root.querySelector(".header-shared-round");
  const eyebrow = root.querySelector(".header-eyebrow");

  if (!(gradeEl instanceof HTMLElement)) {
    return;
  }

  const matches = Array.isArray(fixture?.data) ? fixture.data : [];
  const grades = matches
    .map((match) => String(match?.gradeName ?? "").trim())
    .filter(Boolean);
  const rounds = matches
    .map((match) => String(match?.round ?? "").trim())
    .filter(Boolean);

  const sharedGrade =
    grades.length > 0 && grades.every((grade) => grade === grades[0])
      ? grades[0]
      : "";
  const sharedRound =
    rounds.length > 0 && rounds.every((round) => round === rounds[0])
      ? rounds[0]
      : "";

  gradeEl.textContent = sharedGrade;
  gradeEl.hidden = !sharedGrade;

  if (roundEl instanceof HTMLElement) {
    roundEl.textContent = sharedRound;
    roundEl.hidden = !sharedRound;
  }

  if (eyebrow instanceof HTMLElement) {
    eyebrow.hidden = Boolean(sharedGrade);
  }
}
