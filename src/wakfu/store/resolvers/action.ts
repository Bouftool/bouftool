import type { JSONSchema } from "json-schema-to-ts";
import { WakfuI18nSchema } from "./i18n";

export const WakfuActionSchema = {
  type: "object",
  properties: {
    definition: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        effect: {
          type: "string",
        },
      },
      required: ["id", "effect"],
    },
    description: WakfuI18nSchema,
  },
  required: ["definition"],
} as const satisfies JSONSchema;
