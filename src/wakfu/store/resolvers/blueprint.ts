import type { JSONSchema } from "json-schema-to-ts";

export const WakfuBlueprintSchema = {
  type: "object",
  properties: {
    blueprintId: { type: "number" },
    recipeId: {
      type: "array",
      items: { type: "number" },
    },
  },
  required: ["blueprintId", "recipeId"],
} as const satisfies JSONSchema;
