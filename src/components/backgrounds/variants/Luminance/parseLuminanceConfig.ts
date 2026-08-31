import { z } from "zod";
import tinycolor from "tinycolor2";
import type { LuminanceMapConfig, LuminanceSegment } from "./types";

const colorString = z.string().refine((value) => tinycolor(value).isValid(), {
  message: "Invalid color",
});

const luminanceStopSchema = z.object({
  position: z.number().finite().min(0).max(1),
  color: colorString,
});

const validateStopOrdering = (
  stops: Array<z.infer<typeof luminanceStopSchema>>,
) => {
  for (let index = 1; index < stops.length; index += 1) {
    if (stops[index].position < stops[index - 1].position) {
      throw new Error("Luminance stops must be sorted by position");
    }
    if (stops[index].position === stops[index - 1].position) {
      throw new Error("Luminance stops must not contain duplicate positions");
    }
  }
};

const solidSegmentSchema = z.object({
  kind: z.literal("solid"),
  from: z.number().finite().min(0).max(1),
  to: z.number().finite().min(0).max(1),
  color: colorString,
});

const gradientSegmentSchema = z.object({
  kind: z.literal("gradient"),
  from: z.number().finite().min(0).max(1),
  to: z.number().finite().min(0).max(1),
  fromColor: colorString,
  toColor: colorString,
});

const luminanceSegmentSchema = z.discriminatedUnion("kind", [
  solidSegmentSchema,
  gradientSegmentSchema,
]);

export const validateSegmentsCoverage = (
  segments: readonly LuminanceSegment[],
) => {
  if (segments.length === 0) {
    throw new Error("Luminance segments require at least one segment");
  }

  if (segments[0].from !== 0) {
    throw new Error("Luminance segments must start at 0");
  }

  const last = segments[segments.length - 1];
  if (last.to !== 1) {
    throw new Error("Luminance segments must end at 1");
  }

  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    if (segment.to <= segment.from) {
      throw new Error("Luminance segments must have positive width");
    }

    if (index > 0) {
      const previous = segments[index - 1];
      if (segment.from < previous.to) {
        throw new Error("Luminance segments must not overlap");
      }
      if (segment.from > previous.to) {
        throw new Error("Luminance segments must not leave gaps");
      }
      if (segment.from < previous.from) {
        throw new Error("Luminance segments must be ordered");
      }
    }
  }
};

const themeMapSchema = z
  .object({
    kind: z.literal("theme"),
    preset: z.enum([
      "brand",
      "brand-with-accent",
      "tonal-brand",
      "protected-brand",
    ]),
    reverse: z.boolean().optional(),
    protectedEndpointCore: z.number().finite().gt(0).lt(0.2).optional(),
    endpointTransitionWidth: z.number().finite().gt(0).lt(0.3).optional(),
    brandSolidWidth: z.number().finite().gt(0).lt(0.3).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.preset !== "protected-brand") return;

    const core = value.protectedEndpointCore ?? 0.02;
    const transition = value.endpointTransitionWidth ?? 0.06;
    const brandSolid = value.brandSolidWidth ?? 0.07;
    if (core + transition + brandSolid >= 0.5) {
      ctx.addIssue({
        code: "custom",
        message:
          "Protected-brand core, transition, and brand solid widths must leave room for the midtone gradient",
      });
    }
  });

const stopsMapSchema = z
  .object({
    kind: z.literal("stops"),
    stops: z.array(luminanceStopSchema).min(2),
    reverse: z.boolean().optional(),
  })
  .superRefine((value, ctx) => {
    try {
      validateStopOrdering(value.stops);
    } catch (error) {
      ctx.addIssue({
        code: "custom",
        message: error instanceof Error ? error.message : "Invalid stops",
      });
    }
  });

const segmentsMapSchema = z
  .object({
    kind: z.literal("segments"),
    segments: z.array(luminanceSegmentSchema).min(1),
  })
  .superRefine((value, ctx) => {
    try {
      validateSegmentsCoverage(value.segments);
    } catch (error) {
      ctx.addIssue({
        code: "custom",
        message: error instanceof Error ? error.message : "Invalid segments",
      });
    }
  });

const luminanceMapSchema = z.discriminatedUnion("kind", [
  themeMapSchema,
  stopsMapSchema,
  segmentsMapSchema,
]);

export const parseLuminanceMapConfig = (input: unknown): LuminanceMapConfig => {
  const parsed = luminanceMapSchema.parse(input);

  if (parsed.kind === "stops") {
    return {
      kind: "stops",
      stops: parsed.stops as unknown as Extract<
        LuminanceMapConfig,
        { kind: "stops" }
      >["stops"],
      reverse: parsed.reverse,
    };
  }

  if (parsed.kind === "segments") {
    return {
      kind: "segments",
      segments: parsed.segments as unknown as Extract<
        LuminanceMapConfig,
        { kind: "segments" }
      >["segments"],
    };
  }

  return parsed;
};

export const parseLuminanceBackgroundConfig = (input: unknown) => {
  const nullableString = z
    .union([z.string().min(1), z.null()])
    .optional()
    .transform((value) => value ?? undefined);

  return z
    .object({
      name: nullableString,
      asset: nullableString,
      url: nullableString,
      map: luminanceMapSchema.optional().default({
        kind: "theme",
        preset: "brand",
      }),
      contrast: z.number().finite().min(0).max(4).optional(),
      brightness: z.number().finite().min(-1).max(1).optional(),
      protection: z
        .enum(["none", "bottom-weighted", "center-vignette", "uniform"])
        .optional(),
      opacity: z.number().finite().min(0).max(1).optional(),
      position: z
        .string()
        .nullable()
        .optional()
        .transform((v) => v ?? undefined),
      size: z
        .string()
        .nullable()
        .optional()
        .transform((v) => v ?? undefined),
      supersampleScale: z
        .union([z.literal(1), z.literal(2), z.literal(4)])
        .optional(),
    })
    .parse(input);
};

export { luminanceMapSchema };
