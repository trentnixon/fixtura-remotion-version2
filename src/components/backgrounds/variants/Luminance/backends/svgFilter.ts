import type { LuminanceLookupTable } from "../types";
import { applyPreMapTone } from "../applyPreMapTone";

const formatTable = (values: readonly number[]): string =>
  values.map((value) => (value / 255).toFixed(6)).join(" ");

export const buildSvgLuminanceFilterDef = (
  filterId: string,
  lut: LuminanceLookupTable,
) => ({
  filterId,
  filterCss: `url(#${filterId})`,
  rTable: formatTable(lut.r),
  gTable: formatTable(lut.g),
  bTable: formatTable(lut.b),
});

export const applyPreMapToLut = (
  lut: LuminanceLookupTable,
  contrast = 1,
  brightness = 0,
): LuminanceLookupTable => {
  const remap = (table: readonly number[]) => {
    const remapped: number[] = new Array(table.length);
    for (let sourceTone = 0; sourceTone < table.length; sourceTone += 1) {
      const mappedTone = applyPreMapTone(sourceTone, { contrast, brightness });
      remapped[sourceTone] = table[mappedTone] ?? table[table.length - 1];
    }
    return remapped;
  };

  return {
    r: remap(lut.r),
    g: remap(lut.g),
    b: remap(lut.b),
  };
};
