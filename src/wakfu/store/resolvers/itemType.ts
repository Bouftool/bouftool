import type { JSONSchema } from "json-schema-to-ts";
import { WakfuI18nSchema } from "./i18n";

export const WakfuItemTypeSchema = {
  type: "object",
  properties: {
    definition: {
      type: "object",
      properties: {
        id: { type: "number" },
        parentId: { type: "number" },
        equipmentPositions: { type: "array", items: { type: "string" } },
        equipmentDisabledPositions: {
          type: "array",
          items: { type: "string" },
        },
        isRecyclable: { type: "boolean" },
        isVisibleInAnimation: { type: "boolean" },
      },
      required: ["id", "equipmentPositions", "equipmentDisabledPositions", "isRecyclable", "isVisibleInAnimation"],
    },
    title: WakfuI18nSchema,
  },
  required: ["definition"],
} as const satisfies JSONSchema;
