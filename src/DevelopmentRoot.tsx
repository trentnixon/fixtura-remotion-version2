// src/DevelopmentRoot.tsx
import React from "react";
import { Composition, Folder } from "remotion";
import {
  generatedCatalogue,
  getCanonicalEgress,
} from "./components/backgrounds/variants/Generated/catalogue";
import { CompositionEntry } from "./core/components/dev/CompositionEntry";
import { passthroughDevBackgrounds } from "./core/utils/passthroughDevBackgrounds";
import { templateRegistry } from "./templates/registry";
import { datasetsByCategory } from "../testData";
import { EffectsSolidTestComposition } from "./components/backgrounds/variants/Generated/renderers/effects-solid/test/EffectsSolidTestComposition";

interface DatasetInfo {
  id: string;
  name: string;
}

const VideoRatio = {
  width: 1080,
  height: 1350,
  fps: 30,
};

export const DevelopmentRoot: React.FC = () => {
  return (
    <>
      <Folder name="EffectsSolid-Test">
        <Composition
          id="EffectsSolid-Background-Test"
          component={EffectsSolidTestComposition}
          durationInFrames={360}
          fps={VideoRatio.fps}
          width={VideoRatio.width}
          height={VideoRatio.height}
          defaultProps={{
            presetId: "light-leak",
            primary: "#FF0000",
            secondary: "#004DE2",
            compositionId: "CricketResults",
          }}
        />
      </Folder>

      {Object.entries(templateRegistry).map(([templateId, template]) => (
        <Folder key={templateId} name={templateId}>
          <Folder name="Animated">
            {generatedCatalogue.map((preset) => (
              <Folder key={preset.id} name={preset.id}>
                {Object.entries(datasetsByCategory).map(
                  ([sportName, datasets]) => (
                    <Folder key={sportName} name={sportName}>
                      {(datasets as DatasetInfo[]).map((dataset) => (
                        <CompositionEntry
                          key={`${preset.id}-${dataset.id}`}
                          templateId={templateId}
                          sportName={sportName}
                          datasetID={dataset.id}
                          templateComponent={template.component}
                          presetId={preset.id}
                          legacyEgress={getCanonicalEgress(preset.id)}
                        />
                      ))}
                    </Folder>
                  ),
                )}
              </Folder>
            ))}
          </Folder>

          {passthroughDevBackgrounds.map(({ label, wire }) => (
            <Folder key={label} name={label}>
              {Object.entries(datasetsByCategory).map(
                ([sportName, datasets]) => (
                  <Folder key={sportName} name={sportName}>
                    {(datasets as DatasetInfo[]).map((dataset) => (
                      <CompositionEntry
                        key={`${label}-${dataset.id}`}
                        templateId={templateId}
                        sportName={sportName}
                        datasetID={dataset.id}
                        templateComponent={template.component}
                        legacyEgress={wire}
                        devLabel={label}
                      />
                    ))}
                  </Folder>
                ),
              )}
            </Folder>
          ))}
        </Folder>
      ))}
    </>
  );
};
