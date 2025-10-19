import type { WakfuBaseItem } from "../items/base";
import type { WakfuRecipe } from "../recipes/recipe";

export type TCraftedIngredientNode = {
  itemId: number;
  isCrafted: boolean;
  children: Map<number, TCraftedIngredientNode>;
};

export type TCraftedIngredientNodeRaw = {
  itemId: number;
  isCrafted: boolean;
  children: Record<number, TCraftedIngredientNodeRaw>;
};

export type TWakfuCraftManagerRaw = {
  itemsToCraft: {
    id: number;
    quantity: number;
    craftedIngredients: Record<number, TCraftedIngredientNodeRaw>;
  }[];
};

export type TCraftItem = {
  item: Omit<ReturnType<WakfuBaseItem["toObject"]>, "recipes"> & {
    recipes: {
      id: number;
      recipeCategory: ReturnType<ReturnType<WakfuRecipe["getRecipeCategory"]>["toObject"]>;
      level: number;
      ingredients: TCraftItem[];
      result: {
        item: ReturnType<WakfuBaseItem["toObject"]>;
        quantity: number;
      };
    }[];
    isCrafted: boolean;
  };
  quantity: number;
  craftedIngredients: Record<number, TCraftedIngredientNodeRaw>;
};
