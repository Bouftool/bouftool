import type { JSONSchema } from "json-schema-to-ts";
import { WakfuI18nSchema } from "./i18n";

export const WakfuStateSchema = {
  type: "object",
  properties: {
    definition: {
      type: "object",
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
    title: WakfuI18nSchema,
  },
  required: ["definition"],
} as const satisfies JSONSchema;
