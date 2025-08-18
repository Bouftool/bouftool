import { WakfuStats } from "src/wakfu/types/action";

export const statsMaxEnchant = {
  [WakfuStats.Mastery]: 30,
  [WakfuStats.MeleeMastery]: 30, // Same for all sub masteries
  [WakfuStats.ResistanceFire]: 25, // Same for all elements
  [WakfuStats.Lock]: 60,
  [WakfuStats.Dodge]: 60,
  [WakfuStats.PV]: 80,
  [WakfuStats.Initiative]: 40,
};
