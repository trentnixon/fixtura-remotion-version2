import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import routes from "../../../design/_shared/routes.json";
import { loadMergedBindMapFromFs } from "../../../design/_shared/lib/load-bind-map.js";
import { metadataCompositionIdFromRemotionPath } from "../utils/compositionRoutingManifest";
import { TEMPLATE_IDS } from "../../templates/templateIds";
import {
  compositionExportHasRegistryRouting,
  runHandoffContractVerify,
  verifyRegistryInTemplateManifest,
} from "./index";

const repoRoot = process.cwd();

/** Align route → export name with design-verify.js */
const ROUTE_TO_EXPORT: Record<string, string> = {
  "cricket/results": "CricketResults",
  "cricket/resultSingle": "CricketResultSingle",
  "cricket/result-single": "CricketResultSingle",
  "cricket/upcoming": "CricketUpcoming",
  "cricket/ladder": "CricketLadder",
  "cricket/top5": "CricketTop5",
  "cricket/performances": "CricketPerformances",
  "cricket/teamRoster": "CricketRoster",
  "cricket/team-roster": "CricketRoster",
  "cricket/teamOfTheWeek": "CricketTeamOfTheWeek",
  "cricket/team-of-the-week": "CricketTeamOfTheWeek",
  "cricket/results-lite": "CricketResultsLite",
};

const cricketIndexSource = readFileSync(
  join(repoRoot, "src/compositions/cricket/index.tsx"),
  "utf8",
);

const registryIds = new Set<string>(TEMPLATE_IDS);

describe("handoff verify module (design routes)", () => {
  for (const [variantSlug, variant] of Object.entries(routes.variants)) {
    const cricket = variant.sports?.cricket;
    if (!cricket?.assets) continue;

    for (const [assetSlug, asset] of Object.entries(cricket.assets)) {
      const compositionId = metadataCompositionIdFromRemotionPath(
        asset.remotion.composition,
        assetSlug,
      );

      it(`registry + routing for ${variantSlug}/cricket/${assetSlug}`, () => {
        expect(
          verifyRegistryInTemplateManifest(registryIds, variant.registryId),
        ).toBeNull();

        const exportName =
          ROUTE_TO_EXPORT[asset.remotion.composition] ??
          COMPOSITION_ROUTE_TO_EXPORT[asset.remotion.composition];
        expect(exportName).toBeTruthy();
        expect(
          compositionExportHasRegistryRouting(
            cricketIndexSource,
            exportName!,
            variant.registryId,
          ),
        ).toBe(true);
      });

      it(`bind + dataset contract for ${variantSlug}/cricket/${assetSlug}`, () => {
        const htmlPath = join(
          repoRoot,
          `design/variants/${variantSlug}/cricket/${assetSlug}.html`,
        );
        const html = readFileSync(htmlPath, "utf8");
        const bindMap = loadMergedBindMapFromFs(
          { variantSlug, sportSlug: "cricket", assetSlug },
          repoRoot,
        );

        const errors = runHandoffContractVerify({
          variantSlug,
          assetSlug,
          compositionId,
          html,
          bindMap,
          verifyBindScalars: variant.bootstrap === "generic",
        });

        expect(errors, errors.join("\n")).toEqual([]);
      });
    }
  }
});
