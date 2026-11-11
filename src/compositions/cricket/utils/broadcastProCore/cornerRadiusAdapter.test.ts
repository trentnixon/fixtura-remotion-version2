import { describe, expect, it } from "vitest";
import { broadcastProLayout } from "../../../../templates/variants/broadcastPro/theme/layout";
import { broadcastProRoundedLayout } from "../../../../templates/variants/broadcastProRounded/theme/layout";
import {
  broadcastProGlassPanelClass,
  resolveBroadcastProContainerRadius,
  resolveBroadcastProImageRadius,
} from "./cornerRadiusAdapter";

describe("broadcastProCore cornerRadiusAdapter", () => {
  it("reads square corners from Broadcast Pro layout", () => {
    expect(resolveBroadcastProContainerRadius(broadcastProLayout)).toBe(
      "rounded-none",
    );
    expect(resolveBroadcastProImageRadius(broadcastProLayout)).toBe(
      "rounded-none",
    );
  });

  it("reads rounded corners from Broadcast Pro Rounded layout", () => {
    expect(resolveBroadcastProContainerRadius(broadcastProRoundedLayout)).toBe(
      "rounded-2xl",
    );
    expect(resolveBroadcastProImageRadius(broadcastProRoundedLayout)).toBe(
      "rounded-2xl",
    );
  });

  it("builds glass panel classes with optional overflow clipping", () => {
    expect(
      broadcastProGlassPanelClass(broadcastProRoundedLayout, {
        overflowHidden: true,
        extraClassName: "p-2",
      }),
    ).toBe("overflow-hidden rounded-2xl p-2");
  });
});
