import type { JSONSchema } from "json-schema-to-ts";

export const WakfuI18nSchema = {
  type: "object",
  properties: {
    fr: { type: "string" },
    en: { type: "string" },
    es: { type: "string" },
    pt: { type: "string" },
  },
  required: ["fr", "en", "es", "pt"],
} as const satisfies JSONSchema;
