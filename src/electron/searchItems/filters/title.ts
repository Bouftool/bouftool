import type { WakfuItem } from "src/wakfu/items";
import { EnumWakfuLang } from "src/wakfu/utils/types";

export const searchItemsTitleFilter = (item: WakfuItem, title: string) => {
  if (title === "") {
    return true;
  }
  return new RegExp(title, "ig").test(item.getTitle(EnumWakfuLang.French));
};
