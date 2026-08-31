import { describe, expect, test } from "vitest";
import { createBroadcastMotifLottie } from "./broadcastMotifLottie";

describe("createBroadcastMotifLottie", () => {
  test("builds a twelve-second loop with palette-driven layers", () => {
    const animation = createBroadcastMotifLottie({
      accent: "#004DE2",
      line: "#FFFFFF",
    });

    expect(animation.op).toBe(360);
    expect(animation.layers).toHaveLength(7);
    expect(animation.nm).toBe("BroadcastMotifLoop");
  });
});
