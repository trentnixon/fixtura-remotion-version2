/**
 * Unit tests for formatGroundLocation — run with:
 * node --test scripts/formatGroundLocation.test.mjs
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const formatGroundLocation = (ground, separator = "-") => {
  if (!ground) return "";

  const slashIndex = ground.indexOf("/");
  if (slashIndex === -1) return ground.trim();

  const before = ground.slice(0, slashIndex).trim();
  const after = ground.slice(slashIndex + 1).trim();

  if (!after) return before;
  if (!before) return after;

  const normalizedBefore = before.toLocaleLowerCase();
  const normalizedAfter = after.toLocaleLowerCase();

  if (normalizedBefore === normalizedAfter) {
    return before;
  }

  return `${before} ${separator} ${after}`;
};

describe("formatGroundLocation", () => {
  it("returns empty string for empty input", () => {
    assert.equal(formatGroundLocation(""), "");
  });

  it("returns trimmed value when no slash is present", () => {
    assert.equal(formatGroundLocation("  Seiffert Oval  "), "Seiffert Oval");
  });

  it("deduplicates when both sides match", () => {
    assert.equal(formatGroundLocation("The Grange / The Grange"), "The Grange");
    assert.equal(
      formatGroundLocation("Seiffert Oval / Seiffert Oval"),
      "Seiffert Oval",
    );
  });

  it("joins different sides with a dash by default", () => {
    assert.equal(
      formatGroundLocation("Trinity College Goulburn / Trinity Wexted Oval"),
      "Trinity College Goulburn - Trinity Wexted Oval",
    );
    assert.equal(
      formatGroundLocation("Carr Confoy / Oval 1"),
      "Carr Confoy - Oval 1",
    );
  });

  it("joins different sides with a colon when requested", () => {
    assert.equal(
      formatGroundLocation(
        "Trinity College Goulburn / Trinity Wexted Oval",
        ":",
      ),
      "Trinity College Goulburn : Trinity Wexted Oval",
    );
  });

  it("does not deduplicate when the second side adds detail", () => {
    assert.equal(
      formatGroundLocation("North Park / North Park - Oval #1"),
      "North Park - North Park - Oval #1",
    );
  });
});
