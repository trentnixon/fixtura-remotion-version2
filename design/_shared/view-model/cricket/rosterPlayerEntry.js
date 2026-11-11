/**
 * @param {string} raw
 * @returns {{ emptyRoster: boolean, name: string, badges: { label: string, captain: boolean }[] }}
 */
export function parseRosterPlayerEntry(raw) {
  const value = String(raw ?? "").trim();
  if (!value || /no players allocated/i.test(value)) {
    return {
      emptyRoster: true,
      name: value || "No players allocated",
      badges: [],
    };
  }

  const lines = value.split("\n");
  let name = lines[0]?.trim() ?? "";
  const badges = [];

  const role = lines[1]?.trim().toLowerCase() ?? "";
  if (role === "c") {
    badges.push({ label: "C", captain: true });
  } else if (role === "vc") {
    badges.push({ label: "VC", captain: false });
  }

  if (/\(WK\)/i.test(name)) {
    badges.push({ label: "WK", captain: false });
    name = name.replace(/\(WK\)/gi, "").trim();
  }

  return { emptyRoster: false, name, badges };
}
