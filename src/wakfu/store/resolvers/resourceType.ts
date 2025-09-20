import type { JSONSchema } from "json-schema-to-ts";
import { WakfuI18nSchema } from "./i18n";

export const WakfuResourceTypeSchema = {
  type: "object",
  properties: {
    definition: {
      type: "object",
      properties: {
        id: { type: "number" },
        affectWakfu: { type: "boolean" },
      },
      required: ["id", "affectWakfu"],
    },
    title: WakfuI18nSchema,
  },
  required: ["definition"],
} as const satisfies JSONSchema;
