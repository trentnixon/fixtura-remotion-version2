import { describe, expect, it } from "vitest";
import { hasPreviewTemplateLoader } from "./loadPreviewTemplate";

describe("loadPreviewTemplateComponent", () => {
  it("registers a lazy loader for Scoreline", () => {
    expect(hasPreviewTemplateLoader("Scoreline")).toBe(true);
    expect(hasPreviewTemplateLoader("NotARealTemplate")).toBe(false);
  });
});
