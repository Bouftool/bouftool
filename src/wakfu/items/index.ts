import type { WakfuItemType } from "../itemTypes";
import type { WakfuRecipe } from "../recipes/recipe";
import type { EnumWakfuState } from "../states/types";
import type { WakfuStats } from "../stats";
import type { EnumWakfuStat } from "../stats/types";
import type { TWakfuI18n } from "../utils/types";
import { WakfuBaseItem } from "./base";
import type { EnumWakfuRarity } from "./rarity";

export class WakfuItem extends WakfuBaseItem {
  private stats: WakfuStats;

  constructor(item: {
    id: number;
    level: number;
    itemType: WakfuItemType;
    rarity: EnumWakfuRarity;
    gfxId: number;
    stats: WakfuStats;
    recipes: WakfuRecipe[];
    title?: TWakfuI18n;
    description?: TWakfuI18n;
  }) {
    super(item);
    this.stats = item.stats;
  }

  public getStats(): WakfuStats {
    return this.stats;
  }

  public getStat(stat: EnumWakfuStat | EnumWakfuState) {
    return this.stats.get(stat);
  }

  public toObject() {
    return {
      id: this.id,
      level: this.level,
      itemType: this.itemType.toObject(),
      rarity: this.rarity,
      gfxId: this.gfxId,
      stats: this.stats.toObject(),
      recipes: this.recipes.map((recipe) => recipe.getId()),
      title: this.title,
      description: this.description,
    };
  }
}
