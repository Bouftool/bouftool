import type { WakfuItem } from "src/wakfu/items";
import { SearchItemsFilterStatsOperator, type TSearchItemsFilters } from "../types";

export const searchItemsStatsFilter = (item: WakfuItem, stats: TSearchItemsFilters["stats"]) => {
  if (stats.length === 0) {
    return true;
  }
  return stats.every((stat) => {
    const value = item.getStat(stat.stats);
    switch (stat.operator) {
      case SearchItemsFilterStatsOperator.Equal:
        return value === stat.value;
      case SearchItemsFilterStatsOperator.GreaterThanOrEqual:
        return value >= stat.value;
      case SearchItemsFilterStatsOperator.LessThanOrEqual:
        return value <= stat.value;
      default:
        return false;
    }
  });
};
