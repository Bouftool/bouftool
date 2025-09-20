import type { JSONSchema } from "json-schema-to-ts";
import { WakfuI18nSchema } from "./i18n";

export const WakfuRecipeCategorySchema = {
  type: "object",
  properties: {
    definition: {
      type: "object",
      properties: {
        id: { type: "number" },
        isArchive: { type: "boolean" },
        isNoCraft: { type: "boolean" },
        isHidden: { type: "boolean" },
        xpFactor: { type: "number" },
        isInnate: { type: "boolean" },
      },
      required: ["id", "isArchive", "isNoCraft", "isHidden", "xpFactor", "isInnate"],
    },
    title: WakfuI18nSchema,
  },
  required: ["definition"],
} as const satisfies JSONSchema;
