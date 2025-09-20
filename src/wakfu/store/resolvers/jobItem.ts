import type { JSONSchema } from "json-schema-to-ts";
import { WakfuI18nSchema } from "./i18n";

export const WakfuJobItemSchema = {
  type: "object",
  properties: {
    definition: {
      type: "object",
      properties: {
        id: { type: "number" },
        level: { type: "number" },
        rarity: { type: "number" },
        itemTypeId: { type: "number" },
        graphicParameters: {
          type: "object",
          properties: {
            gfxId: { type: "number" },
            femaleGfxId: { type: "number" },
          },
          required: ["gfxId", "femaleGfxId"],
        },
      },
      required: ["id", "level", "rarity", "itemTypeId", "graphicParameters"],
    },
    title: WakfuI18nSchema,
    description: WakfuI18nSchema,
  },
  required: ["definition"],
} as const satisfies JSONSchema;
