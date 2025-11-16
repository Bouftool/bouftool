import type { WakfuItem } from "src/wakfu/items";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import type { TSearchItemsSort } from "../../types";

const getElementalMasteryWeight = (
  item: WakfuItem,
  elementsPriority: TSearchItemsSort["mastery"]["elementsPriority"],
  buildLevel: number,
) => {
  if (elementsPriority.length < 1) {
    return 0;
  }
  let weight = 0;
  for (const element of elementsPriority) {
    weight += item.getStat(element);
  }
  weight +=
    (item.getStat(EnumWakfuStat.ElementalMastery) +
      Math.floor((item.getStat(EnumWakfuStat.ElementalMasteryByLevel) / 100) * buildLevel)) *
    elementsPriority.length;
  weight += item.getStat(EnumWakfuStat.MasteryOneElement) * Math.min(1, elementsPriority.length);
  weight += item.getStat(EnumWakfuStat.MasteryTwoElements) * Math.min(2, elementsPriority.length);
  weight += item.getStat(EnumWakfuStat.MasteryThreeElements) * Math.min(3, elementsPriority.length);
  return weight / elementsPriority.length;
};

export const getItemMasteryWeight = (
  item: WakfuItem,
  options: TSearchItemsSort["mastery"],
  buildLevel: number,
): number => {
  let weight = getElementalMasteryWeight(item, options.elementsPriority, buildLevel);
  if (options.meleeMastery) {
    weight += item.getStat(EnumWakfuStat.MeleeMastery);
  } else if (options.distanceMastery) {
    weight += item.getStat(EnumWakfuStat.DistanceMastery);
  }
  if (options.rearMastery) {
    weight += item.getStat(EnumWakfuStat.RearMastery);
  }
  if (options.berserkMastery) {
    weight += item.getStat(EnumWakfuStat.BerserkMastery);
  }
  if (options.criticalMastery) {
    weight += item.getStat(EnumWakfuStat.CriticalMastery);
  }
  if (options.healingMastery) {
    weight += item.getStat(EnumWakfuStat.HealingMastery);
  }
  return weight;
};
