import type { WakfuBaseItem } from "../items/base";
import type { WakfuRecipeCategory } from "./recipeCategory";

export type TWakfuRecipeIngredient = {
  item: WakfuBaseItem;
  quantity: number;
};

export type TWakfuRecipeResult = {
  item: WakfuBaseItem;
  quantity: number;
};

export class WakfuRecipe {
  private id: number;
  private recipeCategory: WakfuRecipeCategory;
  private level: number;
  private ingredients: TWakfuRecipeIngredient[];
  private result: TWakfuRecipeResult;

  constructor(data: {
    id: number;
    recipeCategory: WakfuRecipeCategory;
    level: number;
    ingredients: TWakfuRecipeIngredient[];
    result: TWakfuRecipeResult;
  }) {
    this.id = data.id;
    this.recipeCategory = data.recipeCategory;
    this.level = data.level;
    this.ingredients = data.ingredients;
    this.result = data.result;
  }

  public getId(): number {
    return this.id;
  }

  public getRecipeCategory(): WakfuRecipeCategory {
    return this.recipeCategory;
  }

  public getLevel(): number {
    return this.level;
  }

  public getIngredients(): TWakfuRecipeIngredient[] {
    return this.ingredients;
  }

  public getResult(): TWakfuRecipeResult {
    return this.result;
  }

  public toObject() {
    return {
      id: this.id,
      recipeCategory: this.recipeCategory.toObject(),
      level: this.level,
      ingredients: this.ingredients.map((ingredient) => ({
        item: ingredient.item.toObject(),
        quantity: ingredient.quantity,
      })),
      result: {
        item: this.result.item.toObject(),
        quantity: this.result.quantity,
      },
    };
  }
}
