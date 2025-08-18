import type { WakfuItem } from "src/wakfu/data/item";
import { WakfuStats } from "src/wakfu/types/action";
import type { TSearchItemsSort } from "../../types";

const getElementalMasteryWeightOld = (
  item: WakfuItem,
  elementsCount: number,
  elementsPriority?: (
    | WakfuStats.MasteryFire
    | WakfuStats.MasteryEarth
    | WakfuStats.MasteryWater
    | WakfuStats.MasteryAir
  )[],
) => {
  if (elementsCount < 1 || elementsCount > 4) {
    throw new Error("Element count must be between 1 and 4.");
  }
  if (elementsPriority && elementsPriority.length > elementsCount) {
    throw new Error("Elements priority length must not exceed element count.");
  }
  const masteries = {
    [WakfuStats.Mastery]: item.getStats(WakfuStats.Mastery) * elementsCount,
    [WakfuStats.MasteryFire]: item.getStats(WakfuStats.MasteryFire),
    [WakfuStats.MasteryEarth]: item.getStats(WakfuStats.MasteryEarth),
    [WakfuStats.MasteryWater]: item.getStats(WakfuStats.MasteryWater),
    [WakfuStats.MasteryAir]: item.getStats(WakfuStats.MasteryAir),
  };
  const masteryXElemEffect = item.getMasteryXElements();
  if (masteryXElemEffect) {
    const effectiveCount = Math.min(masteryXElemEffect.count, elementsCount);
    masteries[WakfuStats.Mastery] += masteryXElemEffect.value * effectiveCount;
  }
  let totalMastery = masteries[WakfuStats.Mastery];
  let remainingCount = elementsCount;
  if (elementsPriority) {
    for (const element of elementsPriority) {
      totalMastery += masteries[element];
      remainingCount -= 1;
    }
  }
  const sortedMasteries = [
    masteries[WakfuStats.MasteryFire],
    masteries[WakfuStats.MasteryEarth],
    masteries[WakfuStats.MasteryWater],
    masteries[WakfuStats.MasteryAir],
  ].sort((a, b) => b - a);
  for (let i = 0; i < sortedMasteries.length && remainingCount > 0; i++) {
    const mastery = sortedMasteries[i];
    if (elementsPriority?.includes(WakfuStats.MasteryFire)) {
      continue;
    }
    totalMastery += mastery;
    remainingCount -= 1;
  }
  return totalMastery / elementsCount;
};

const getElementalMasteryWeight = (
  item: WakfuItem,
  elementsPriority: TSearchItemsSort["mastery"]["elementsPriority"],
) => {
  if (elementsPriority.length < 1) {
    return 0;
  }
  let weight = 0;
  for (const element of elementsPriority) {
    weight += item.getStats(element);
  }
  weight += item.getStats(WakfuStats.Mastery) * elementsPriority.length;
  const elementOnX = item.getMasteryXElements();
  if (elementOnX) {
    const effectiveCount = Math.min(elementOnX.count, elementsPriority.length);
    weight += elementOnX.value * effectiveCount;
  }
  return weight / elementsPriority.length;
};

export const getItemMasteryWeight = (item: WakfuItem, options: TSearchItemsSort["mastery"]): number => {
  let weight = getElementalMasteryWeight(item, options.elementsPriority);
  if (options.meleeMastery) {
    weight += item.getStats(WakfuStats.MeleeMastery);
  } else if (options.rangeMastery) {
    weight += item.getStats(WakfuStats.DistanceMastery);
  }
  if (options.backMastery) {
    weight += item.getStats(WakfuStats.BackMastery);
  }
  if (options.berserkMastery) {
    weight += item.getStats(WakfuStats.BerserkMastery);
  }
  if (options.criticalMastery) {
    weight += item.getStats(WakfuStats.CriticalMastery);
  }
  if (options.healingMastery) {
    weight += item.getStats(WakfuStats.HealingMastery);
  }
  return weight;
};
