import type { WakfuItem } from "src/wakfu/data/item";

export const searchItemsSortLevel = (a: WakfuItem, b: WakfuItem) => {
  return a.getLevel() - b.getLevel();
};
