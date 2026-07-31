import type { WakfuItem } from "src/wakfu/items";
import { EnumWakfuItemType } from "src/wakfu/itemTypes/types";
import type { TSearchItemsFilters } from "../types";

const Exceptions = new Set<number>([EnumWakfuItemType.Pet, EnumWakfuItemType.Mount]);

export const searchItemsLevelsFilter = (
  item: WakfuItem,
  levels: { min: number; max: number },
  filters: TSearchItemsFilters,
) => {
  if (filters.itemTypes.some((type) => Exceptions.has(type)) && Exceptions.has(item.getItemType().getId())) {
    return true;
  }
  return item.getLevel() >= levels.min && item.getLevel() <= levels.max;
};
