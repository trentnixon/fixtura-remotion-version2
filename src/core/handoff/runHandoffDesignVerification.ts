import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import routes from "../../../design/_shared/routes.json";
import { loadMergedBindMapFromFs } from "../../../design/_shared/lib/load-bind-map.js";
import { metadataCompositionIdFromRemotionPath } from "../utils/compositionRoutingManifest";
import { TEMPLATE_IDS } from "../../templates/templateIds";
import { compositionExportBlockNameFromRoute } from "./compositionRouteToExportBlock";
import {
  compositionExportHasRegistryRouting,
  verifyRegistryInTemplateManifest,
} from "./handoffRoutingVerify";
import { runHandoffContractVerify } from "./runHandoffContractVerify";

export type HandoffDesignVerifyOptions = {
  variant?: string;
  asset?: string;
};

export type HandoffDesignVerifyResult = {
  ok: boolean;
  errors: string[];
};

/**
 * Design-site handoff contract: registry manifest, cricket routing, theme files,
 * bind-map scalars, and canvas data-* dataset parity with Remotion.
 */
export const runHandoffDesignVerification = (
  repoRoot: string,
  options: HandoffDesignVerifyOptions = {},
): HandoffDesignVerifyResult => {
  const errors: string[] = [];
  const cricketIndexPath = join(repoRoot, "src/compositions/cricket/index.tsx");
  const cricketIndex = readFileSync(cricketIndexPath, "utf8");
  const registryIds = new Set<string>(TEMPLATE_IDS);

  for (const [variantSlug, variant] of Object.entries(routes.variants)) {
    if (options.variant && options.variant !== variantSlug) {
      continue;
    }

    const cricket = variant.sports?.cricket;
    if (!cricket?.assets) {
      continue;
    }

    for (const [assetSlug, asset] of Object.entries(cricket.assets)) {
      if (options.asset && options.asset !== assetSlug) {
        continue;
      }

      const label = `${variantSlug}/${assetSlug}`;
      const registryId = variant.registryId;

      if (!registryId) {
        errors.push(
          `${label}: Handoff: variant ${variantSlug} missing registryId`,
        );
      } else {
        const registryError = verifyRegistryInTemplateManifest(
          registryIds,
          registryId,
        );
        if (registryError) {
          errors.push(`${label}: ${registryError}`);
        }
      }

      const compositionRoute = asset.remotion?.composition;
      const exportName = compositionRoute
        ? compositionExportBlockNameFromRoute(compositionRoute)
        : undefined;

      if (!compositionRoute) {
        errors.push(`${label}: Handoff: missing remotion.composition on asset`);
      } else if (!exportName) {
        errors.push(
          `${label}: Handoff: unknown composition route "${compositionRoute}"`,
        );
      } else if (
        registryId &&
        !compositionExportHasRegistryRouting(
          cricketIndex,
          exportName,
          registryId,
        )
      ) {
        errors.push(
          `${label}: Handoff: ${exportName} missing composition routing for Registry ${registryId}`,
        );
      }

      const themeRel = asset.remotion?.theme;
      if (themeRel) {
        const themePath = join(repoRoot, themeRel);
        if (!existsSync(themePath)) {
          errors.push(`${label}: Handoff: missing theme file ${themeRel}`);
        }
      }

      const htmlPath = join(
        repoRoot,
        `design/variants/${variantSlug}/cricket/${assetSlug}.html`,
      );
      if (!existsSync(htmlPath)) {
        errors.push(
          `${label}: Missing HTML for registered asset: design/variants/${variantSlug}/cricket/${assetSlug}.html`,
        );
        continue;
      }

      const html = readFileSync(htmlPath, "utf8");
      let bindMap;
      try {
        bindMap = loadMergedBindMapFromFs(
          { variantSlug, sportSlug: "cricket", assetSlug },
          repoRoot,
        );
      } catch (error) {
        errors.push(
          `${label}: Bind map load failed: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
        continue;
      }

      const compositionId = metadataCompositionIdFromRemotionPath(
        asset.remotion.composition,
        assetSlug,
      );

      errors.push(
        ...runHandoffContractVerify({
          variantSlug,
          assetSlug,
          compositionId,
          html,
          bindMap,
          verifyBindScalars: variant.bootstrap === "generic",
        }),
      );
    }
  }

  return { ok: errors.length === 0, errors };
};
