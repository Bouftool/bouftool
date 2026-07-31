import type { WakfuItem } from "src/wakfu/items";
import { EnumWakfuItemType } from "src/wakfu/itemTypes/types";
import type { TSearchItemsFilters } from "../types";

const Exceptions = new Set<number>([EnumWakfuItemType.Pet, EnumWakfuItemType.Mount]);

export const searchItemsRaritiesFilter = (item: WakfuItem, rarities: number[], filters: TSearchItemsFilters) => {
  if (
    rarities.length === 0 ||
    (filters.itemTypes.some((type) => Exceptions.has(type)) && Exceptions.has(item.getItemType().getId()))
  ) {
    return true;
  }
  return rarities.includes(item.getRarity());
};
