import type { WakfuItem } from "src/wakfu/data/item";

export const searchItemsTitleFilter = (item: WakfuItem, title: string) => {
  if (title === "") {
    return true;
  }
  return new RegExp(title, "ig").test(item.getTitle());
};
