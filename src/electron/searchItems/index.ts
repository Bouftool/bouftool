import type { WakfuItem } from "src/wakfu/items";
import { WakfuStore } from "src/wakfu/store";
import { EnumWakfuLang } from "src/wakfu/utils/types";
import { searchItemsItemTypesFilter } from "./filters/itemTypes";
import { searchItemsLevelsFilter } from "./filters/levels";
import { searchItemsRaritiesFilter } from "./filters/rarities";
import { searchItemsStatsFilter } from "./filters/stats";
import { searchItemsTitleFilter } from "./filters/title";
import { searchItemsSortLevel } from "./sort/level";
import { searchItemsSortWeight } from "./sort/weight";
import type { TSearchItemsFilters, TSearchItemsSort } from "./types";

const isItemFiltered = (item: WakfuItem, filters: TSearchItemsFilters) => {
  return (
    searchItemsTitleFilter(item, filters.title) &&
    searchItemsItemTypesFilter(item, filters.itemTypes) &&
    searchItemsRaritiesFilter(item, filters.rarities, filters) &&
    searchItemsLevelsFilter(item, filters.levels, filters) &&
    searchItemsStatsFilter(item, filters.stats)
  );
};

export const searchItems = (
  filters: TSearchItemsFilters,
  sort: TSearchItemsSort,
  buildLevel: number = 1,
): ReturnType<WakfuItem["toObject"]>[] => {
  const store = WakfuStore.getInstance();
  const itemWeightCache: Record<number, number> = {};
  return store.getItems(
    (item) => isItemFiltered(item, filters),
    (a, b) => {
      let comparison = searchItemsSortWeight(a, b, sort, buildLevel, itemWeightCache);
      if (comparison === 0) {
        comparison = searchItemsSortLevel(a, b);
        if (comparison === 0) {
          comparison = a.getTitle(EnumWakfuLang.French).localeCompare(b.getTitle(EnumWakfuLang.French));
        }
      }
      return comparison;
    },
    (item) => {
      return item.toObject();
    },
  );
};
