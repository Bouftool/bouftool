import type { WakfuItem } from "src/wakfu/data/item";
import { WakfuStats } from "src/wakfu/types/action";
import type { TSearchItemsSort } from "../../types";

export const getItemResistanceWeight = (item: WakfuItem, options: TSearchItemsSort["resistance"]) => {
  if (options.elementsPriority.length < 1) {
    return 0;
  }
  let weight = 0;
  for (const element of options.elementsPriority) {
    weight += item.getStats(element);
  }
  weight += item.getStats(WakfuStats.Resistance) * options.elementsPriority.length;
  const resistanceOnX = item.getResistanceXElements();
  if (resistanceOnX) {
    const effectiveCount = Math.min(resistanceOnX.count, options.elementsPriority.length);
    weight += resistanceOnX.value * effectiveCount;
  }
  return weight / options.elementsPriority.length;
};
