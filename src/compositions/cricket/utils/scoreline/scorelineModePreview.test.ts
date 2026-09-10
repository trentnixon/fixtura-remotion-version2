import { describe, expect, it } from "vitest";
import scorelineModes from "../../../../../design/_shared/scoreline-modes.json";
import { scorelineMode } from "../../../../templates/variants/scoreline/theme/mode";

describe("scoreline preview modes", () => {
  it("matches Remotion scorelineMode definitions", () => {
    expect(scorelineModes).toEqual(scorelineMode);
  });
});
