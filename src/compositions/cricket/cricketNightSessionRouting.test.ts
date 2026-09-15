import { describe, expect, it } from "vitest";
import { CricketTop5 } from "./index";
import { PlaceholderComposition } from "./placeholders";
import { nightSession as top5NightSessionModule } from "./top5/nightSession";

describe("CricketTop5 Night Session routing", () => {
  it("maps nightsession to the Top 5 Night Session composition", () => {
    expect(CricketTop5.nightsession).toBeDefined();
    expect(CricketTop5.nightsession).toBe(top5NightSessionModule);
    expect(CricketTop5.nightsession).not.toBe(PlaceholderComposition);
  });
});
