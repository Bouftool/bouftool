import type { WakfuItemType } from "../itemTypes";
import type { WakfuRecipe } from "../recipes/recipe";
import { DefaultWakfuI18n } from "../utils/constants";
import type { EnumWakfuLang, TWakfuI18n } from "../utils/types";
import type { EnumWakfuRarity } from "./rarity";

export class WakfuBaseItem {
  protected id: number;
  protected level: number;
  protected itemType: WakfuItemType;
  protected rarity: EnumWakfuRarity;
  protected gfxId: number;
  protected recipes: WakfuRecipe[];
  protected title: TWakfuI18n;
  protected description: TWakfuI18n;

  constructor(item: {
    id: number;
    level: number;
    itemType: WakfuItemType;
    rarity: EnumWakfuRarity;
    gfxId: number;
    recipes: WakfuRecipe[];
    title?: TWakfuI18n;
    description?: TWakfuI18n;
  }) {
    this.id = item.id;
    this.level = item.level;
    this.itemType = item.itemType;
    this.rarity = item.rarity;
    this.gfxId = item.gfxId;
    this.recipes = item.recipes;
    this.title = item.title ?? DefaultWakfuI18n;
    this.description = item.description ?? DefaultWakfuI18n;
  }

  public getId(): number {
    return this.id;
  }

  public getLevel(): number {
    return this.level;
  }

  public getItemType(): WakfuItemType {
    return this.itemType;
  }

  public getRarity(): EnumWakfuRarity {
    return this.rarity;
  }

  public getGfxId(): number {
    return this.gfxId;
  }

  public getRecipes(): WakfuRecipe[] {
    return this.recipes;
  }

  public getTitle(lang: EnumWakfuLang): string {
    return this.title[lang];
  }

  public getDescription(lang: EnumWakfuLang): string {
    return this.description[lang];
  }

  public addRecipe(recipe: WakfuRecipe) {
    if (!this.recipes.find((r) => r.getId() === recipe.getId())) {
      this.recipes.push(recipe);
    }
  }

  public toObject() {
    return {
      id: this.id,
      level: this.level,
      itemType: this.itemType.toObject(),
      rarity: this.rarity,
      gfxId: this.gfxId,
      recipes: this.recipes.map((recipe) => recipe.getId()),
      title: this.title,
      description: this.description,
    };
  }
}
