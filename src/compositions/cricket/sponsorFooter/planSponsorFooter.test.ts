import { describe, expect, it } from "vitest";
import type { Sponsor } from "../../../core/types/data/sponsors";
import { planSponsorFooter } from "./planSponsorFooter";

const sponsorWithLogo = (id: number): Sponsor => ({
  id,
  name: `Sponsor ${id}`,
  logo: { id, url: `https://example.com/${id}.png` },
});

describe("planSponsorFooter", () => {
  const runtime = {
    timings: { FPS_MAIN: 360 },
    footerHeight: 150,
    accountSponsors: { primary: [], general: [], sponsorNum: 0 },
    logoAnimations: { introIn: "fadeIn", introOut: "fadeOut" },
  };

  it("hides when neither sponsors nor assignSponsors is provided", () => {
    expect(planSponsorFooter({ ...runtime })).toEqual({
      kind: "hidden",
      reason: "missing-input",
    });
  });

  it("hides when runtime context is incomplete", () => {
    expect(
      planSponsorFooter({
        sponsors: [sponsorWithLogo(1)],
        footerHeight: 150,
      }),
    ).toEqual({ kind: "hidden", reason: "invalid-runtime" });
  });

  it("returns a visible plan with exit frame and logo box", () => {
    const plan = planSponsorFooter({
      ...runtime,
      sponsors: [sponsorWithLogo(1), sponsorWithLogo(2)],
    });

    expect(plan.kind).toBe("visible");
    if (plan.kind === "visible") {
      expect(plan.visibleSponsors).toHaveLength(2);
      expect(plan.exitFrame).toBe(345);
      expect(plan.logoBox.height).toBe(150);
      expect(plan.logoAnimations.introIn).toBe("fadeIn");
    }
  });

  it("filters sponsors without logo URLs", () => {
    const plan = planSponsorFooter({
      ...runtime,
      sponsors: [
        sponsorWithLogo(1),
        { ...sponsorWithLogo(2), logo: { id: 2, url: "" } },
      ],
    });

    expect(plan.kind).toBe("visible");
    if (plan.kind === "visible") {
      expect(plan.visibleSponsors).toHaveLength(1);
    }
  });
});
