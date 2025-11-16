import type { WakfuItem } from "src/wakfu/items";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import type { TSearchItemsSort } from "../../types";
import { getItemMasteryWeight } from "./mastery";
import { getItemResistanceWeight } from "./resistance";

const weightCoeff = {
  [EnumWakfuStat.ElementalMastery]: 1,
  [EnumWakfuStat.ElementalResistance]: 4.8,
};

const getItemWeight = (item: WakfuItem, options: TSearchItemsSort, buildLevel: number) => {
  let weight = 0;
  weight += getItemMasteryWeight(item, options.mastery, buildLevel) * weightCoeff[EnumWakfuStat.ElementalMastery];
  weight += getItemResistanceWeight(item, options.resistance) * weightCoeff[EnumWakfuStat.ElementalResistance];
  return weight;
};

export const searchItemsSortWeight = (
  a: WakfuItem,
  b: WakfuItem,
  options: TSearchItemsSort,
  buildLevel: number,
  itemWeightCache: Record<number, number>,
) => {
  const aWeight = itemWeightCache[a.getId()] ?? getItemWeight(a, options, buildLevel);
  const bWeight = itemWeightCache[b.getId()] ?? getItemWeight(b, options, buildLevel);
  itemWeightCache[a.getId()] = aWeight;
  itemWeightCache[b.getId()] = bWeight;
  return bWeight - aWeight;
};
