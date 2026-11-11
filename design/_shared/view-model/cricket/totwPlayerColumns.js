/**
 * @template T
 * @param {T[]} players
 * @returns {[T[], T[]]}
 */
export function splitTotwPlayerColumns(players) {
  const splitAt = Math.ceil(players.length / 2);
  return [players.slice(0, splitAt), players.slice(splitAt)];
}
