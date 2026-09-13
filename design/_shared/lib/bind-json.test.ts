import { describe, expect, it } from "vitest";
import { assertNoDuplicateJsonKeys } from "./bind-json.js";

describe("bind-json duplicate detection", () => {
  it("allows distinct keys", () => {
    expect(() =>
      assertNoDuplicateJsonKeys(
        '{"[data-hydrate=a]":"p.a","[data-hydrate=b]":"p.b"}',
      ),
    ).not.toThrow();
  });
});
