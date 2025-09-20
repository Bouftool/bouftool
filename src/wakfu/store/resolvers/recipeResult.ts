import type { JSONSchema } from "json-schema-to-ts";

export const WakfuRecipeResultSchema = {
  type: "object",
  properties: {
    recipeId: { type: "number" },
    productedItemId: { type: "number" },
    productOrder: { type: "number" },
    productedItemQuantity: { type: "number" },
  },
  required: ["recipeId", "productedItemId", "productOrder", "productedItemQuantity"],
} as const satisfies JSONSchema;
