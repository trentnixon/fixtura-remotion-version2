/**
 * @param {Element | null | undefined} img
 */
export const logoHasCrest = (img) => {
  if (!(img instanceof HTMLImageElement)) {
    return false;
  }

  const src = img.getAttribute("src")?.trim();
  return Boolean(src && !img.hidden);
};

/**
 * @param {ParentNode} root
 */
export function syncScorelineOrganisationCrest(root = document) {
  const orgLogo = root.querySelector('[data-hydrate="club-logo"]');
  const orgMark = orgLogo?.closest(".organisation-mark");
  if (orgMark instanceof HTMLElement) {
    orgMark.dataset.hasCrest = logoHasCrest(orgLogo) ? "true" : "false";
  }
}
