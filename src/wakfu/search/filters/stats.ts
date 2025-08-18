import type { WakfuItem } from "src/wakfu/data/item";
import { WakfuActionId, WakfuStats } from "src/wakfu/types/action";
import { SearchItemsFilterStatsOperator, type TSearchItemsFilters } from "../types";

export const searchItemsStatsFilter = (item: WakfuItem, stats: TSearchItemsFilters["stats"]) => {
  if (stats.length === 0) {
    return true;
  }
  let masteriesMatched = 0;
  let resistancesMatched = 0;
  return stats.every((stat) => {
    let value = 0;
    switch (stat.stats) {
      case WakfuStats.MasteryFire:
      case WakfuStats.MasteryEarth:
      case WakfuStats.MasteryWater:
      case WakfuStats.MasteryAir: {
        value = item.getStats(stat.stats);
        if (value === 0) {
          value = item.getStats(WakfuStats.Mastery);
          if (value === 0) {
            const masteryXElem = item.findEquipEffect(WakfuActionId.MasteryOnXElements);
            if (masteryXElem && masteryXElem.params[2] > masteriesMatched) {
              value = masteryXElem.params[0];
              ++masteriesMatched;
            }
          }
        }
        break;
      }
      case WakfuStats.ResistanceFire:
      case WakfuStats.ResistanceEarth:
      case WakfuStats.ResistanceWater:
      case WakfuStats.ResistanceAir: {
        value = item.getStats(stat.stats);
        if (value === 0) {
          value = item.getStats(WakfuStats.Resistance);
          if (value === 0) {
            const masteryXElem = item.findEquipEffect(WakfuActionId.ResistanceOnXElements);
            if (masteryXElem && masteryXElem.params[2] > resistancesMatched) {
              value = masteryXElem.params[0];
              ++resistancesMatched;
            }
          }
        }
        break;
      }
      default: {
        value = item.getStats(stat.stats);
        break;
      }
    }
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
