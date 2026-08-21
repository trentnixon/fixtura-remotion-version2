import { Sponsor } from "../../types/data/sponsors";

/** Coerce sponsor buckets to arrays; legacy metadata objects become []. */
export const asSponsorArray = (value: unknown): Sponsor[] =>
  Array.isArray(value) ? value : [];
