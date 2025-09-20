import type { JSONSchema } from "json-schema-to-ts";

export const WakfuRecipeSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    categoryId: { type: "number" },
    level: { type: "number" },
    xpRatio: { type: "number" },
    isUpgrade: { type: "boolean" },
    upgradeItemId: { type: "number" },
  },
  required: ["id", "categoryId", "level", "xpRatio", "isUpgrade", "upgradeItemId"],
} as const satisfies JSONSchema;
