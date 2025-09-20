import type { WakfuItem } from "src/wakfu/items";

export const searchItemsSortLevel = (a: WakfuItem, b: WakfuItem) => {
  return a.getLevel() - b.getLevel();
};
