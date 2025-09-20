import type { WakfuItem } from "src/wakfu/items";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import type { TSearchItemsSort } from "../../types";

export const getItemResistanceWeight = (item: WakfuItem, options: TSearchItemsSort["resistance"]) => {
  if (options.elementsPriority.length < 1) {
    return 0;
  }
  let weight = 0;
  for (const element of options.elementsPriority) {
    weight += item.getStat(element);
  }
  weight += item.getStat(EnumWakfuStat.ElementalResistance) * options.elementsPriority.length;
  weight += item.getStat(EnumWakfuStat.ResistanceOneElement) * Math.min(1, options.elementsPriority.length);
  weight += item.getStat(EnumWakfuStat.ResistanceTwoElements) * Math.min(1, options.elementsPriority.length);
  weight += item.getStat(EnumWakfuStat.ResistanceThreeElements) * Math.min(1, options.elementsPriority.length);
  return weight / options.elementsPriority.length;
};
