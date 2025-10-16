import type { WakfuItem } from "../../items";
import { WakfuStats } from "../../stats";
import type { EnumWakfuStat, TElementalPreferences } from "../../stats/types";

export type TItemScorerConfig = Partial<Record<EnumWakfuStat, number>>;

export class ItemScorer {
  private config: TItemScorerConfig;
  private elementalPreferences: TElementalPreferences;

  constructor(config: TItemScorerConfig, elementalPreferences: TElementalPreferences) {
    this.config = config;
    this.elementalPreferences = elementalPreferences;
  }

  public scoreItem(item: WakfuItem): number {
    const stats = WakfuStats.copy(item.getStats());

    stats.applyElementalPreferences(this.elementalPreferences);
    stats.applyEffects();

    return this.calculateScore(stats);
  }

  private calculateScore(stats: WakfuStats): number {
    let score = 0;

    for (const [statKey, weight] of Object.entries(this.config)) {
      if (weight === undefined || weight === 0) {
        continue;
      }

      const statValue = stats.get(statKey as EnumWakfuStat);

      score += statValue * weight;
    }

    return score;
  }

  public scoreItems(items: WakfuItem[]): Array<{ item: WakfuItem; score: number }> {
    const results = items.map((item) => ({
      item,
      score: this.scoreItem(item),
    }));

    return results.sort((a, b) => b.score - a.score);
  }

  public getBestItem(items: WakfuItem[]): WakfuItem | null {
    if (items.length === 0) {
      return null;
    }

    const scored = this.scoreItems(items);
    return scored[0].item;
  }

  public filterByMinScore(items: WakfuItem[], minScore: number): WakfuItem[] {
    return this.scoreItems(items)
      .filter((result) => result.score >= minScore)
      .map((result) => result.item);
  }

  public getConfig(): TItemScorerConfig {
    return { ...this.config };
  }
}
