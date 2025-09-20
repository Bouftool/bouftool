import type { JSONSchema } from "json-schema-to-ts";

export const WakfuRecipeIngredientSchema = {
  type: "object",
  properties: {
    recipeId: { type: "number" },
    itemId: { type: "number" },
    quantity: { type: "number" },
    ingredientOrder: { type: "number" },
  },
  required: ["recipeId", "itemId", "quantity", "ingredientOrder"],
} as const satisfies JSONSchema;
