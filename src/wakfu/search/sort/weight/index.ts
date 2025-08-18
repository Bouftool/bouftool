import type { WakfuItem } from "src/wakfu/data/item";
import { WakfuStats } from "src/wakfu/types/action";
import type { TSearchItemsSort } from "../../types";
import { getItemMasteryWeight } from "./mastery";
import { getItemResistanceWeight } from "./resistance";

const weightCoeff = {
  [WakfuStats.Mastery]: 1,
  [WakfuStats.Resistance]: 4.8,
};

const getItemWeight = (item: WakfuItem, options: TSearchItemsSort) => {
  let weight = 0;
  weight += getItemMasteryWeight(item, options.mastery) * weightCoeff[WakfuStats.Mastery];
  weight += getItemResistanceWeight(item, options.resistance) * weightCoeff[WakfuStats.Resistance];
  return weight;
};

export const searchItemsSortWeight = (
  a: WakfuItem,
  b: WakfuItem,
  options: TSearchItemsSort,
  itemWeightCache: Record<number, number>,
) => {
  const aWeight = itemWeightCache[a.getId()] ?? getItemWeight(a, options);
  const bWeight = itemWeightCache[b.getId()] ?? getItemWeight(b, options);
  itemWeightCache[a.getId()] = aWeight;
  itemWeightCache[b.getId()] = bWeight;
  return bWeight - aWeight;
};
