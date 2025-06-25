// src/DevelopmentRoot.tsx
import React from "react";
import { Folder } from "remotion";
import { templateRegistry } from "./templates/registry";
import { datasetsByCategory } from "../testData";
import { CompositionEntry } from "./core/components/dev/CompositionEntry";

// Define the dataset info interface
interface DatasetInfo {
  id: string;
  name: string;
}

/**
 * Development environment for browsing templates
 */
export const DevelopmentRoot: React.FC = () => {
  console.log("[DevelopmentRoot]");
  return (
    <>
      {/* Template Registry */}
      {Object.entries(templateRegistry).map(([templateId, template]) => (
        <Folder key={templateId} name={templateId}>
          {template.variants?.map((variant) => (
            <Folder key={variant} name={variant}>
              {Object.entries(datasetsByCategory).map(
                ([sportName, datasets]) => (
                  <Folder key={sportName} name={sportName}>
                    {(datasets as DatasetInfo[]).map((dataset: DatasetInfo) => (
                      <CompositionEntry
                        key={dataset.id}
                        templateId={templateId}
                        variant={variant}
                        sportName={sportName}
                        datasetID={dataset.id}
                        templateComponent={template.component}
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
