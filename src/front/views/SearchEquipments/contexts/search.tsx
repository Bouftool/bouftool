import { createContext, type ReactNode, useContext, useLayoutEffect } from "react";
import type { TSearchItemsFilters, TSearchItemsSort } from "src/electron/searchItems/types";
import { ElectronEvents } from "src/electron/types";
import { useElectronEvent } from "src/front/hooks/electron";
import type { WakfuItem } from "src/wakfu/items";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import type { TSearchItemsFiltersForm } from "../filters";
import type { TSearchItemsPreferences } from "../preferences/logics";
import { useSearchItemsFiltersContext } from "./filters";
import { useSearchItemsPreferencesContext } from "./preferences";

// biome-ignore lint/complexity/noStaticOnlyClass: This class is a simple state holder
export class SearchItemsBehavior {
  private static skipNextTimeout = false;

  public static shouldSkipNextTimeout(): boolean {
    return SearchItemsBehavior.skipNextTimeout;
  }

  public static setSkipNextTimeout(value: boolean): void {
    SearchItemsBehavior.skipNextTimeout = value;
  }
}

const formatFilters = (filters: TSearchItemsFiltersForm): TSearchItemsFilters => {
  const stats: TSearchItemsFilters["stats"] = [];
  for (const wakfuStats of Object.values(EnumWakfuStat)) {
    const values = filters.stats[wakfuStats];
    if (values) {
      stats.push({ ...values, stats: wakfuStats });
    }
  }
  return {
    title: filters.title,
    rarities: filters.rarities,
    itemTypes: filters.itemTypes,
    levels: filters.levels,
    stats: stats,
  };
};

const formatPreferences = (preferences: TSearchItemsPreferences): TSearchItemsSort => {
  return {
    mastery: {
      elementsPriority: preferences.mastery.elementsPriority,
      meleeMastery: preferences.mastery.rangeMastery === EnumWakfuStat.MeleeMastery,
      distanceMastery: preferences.mastery.rangeMastery === EnumWakfuStat.DistanceMastery,
      criticalMastery: preferences.mastery.subMasteries.includes(EnumWakfuStat.CriticalMastery),
      rearMastery: preferences.mastery.subMasteries.includes(EnumWakfuStat.RearMastery),
      berserkMastery: preferences.mastery.subMasteries.includes(EnumWakfuStat.BerserkMastery),
      healingMastery: preferences.mastery.subMasteries.includes(EnumWakfuStat.HealingMastery),
    },
    resistance: {
      elementsPriority: preferences.resistance.elementsPriority,
    },
  };
};

export type TSearchItemsContext = ReturnType<WakfuItem["toObject"]>[];

const SearchContext = createContext<TSearchItemsContext | undefined>(undefined);

export const useSearchItemsContext = () => {
  const value = useContext(SearchContext);
  if (!value) {
    throw new Error("useSearchItemsContext must be used within a SearchItemsProvider");
  }
  return value;
};

export type TSearchItemsProviderProps = {
  children: ReactNode;
};

const DefaultValues: TSearchItemsContext = [];

export const SearchItemsProvider = ({ children }: TSearchItemsProviderProps) => {
  const { filters } = useSearchItemsFiltersContext();
  const { preferences } = useSearchItemsPreferencesContext();
  const [searchItems, items] = useElectronEvent(ElectronEvents.SearchItems);

  useLayoutEffect(() => {
    SearchItemsBehavior.setSkipNextTimeout(true);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only depends on filters and preferences
  useLayoutEffect(() => {
    if (SearchItemsBehavior.shouldSkipNextTimeout()) {
      searchItems({ filters: formatFilters(filters), sort: formatPreferences(preferences) });
      SearchItemsBehavior.setSkipNextTimeout(false);
    } else {
      const timeout = setTimeout(() => {
        searchItems({ filters: formatFilters(filters), sort: formatPreferences(preferences) });
      }, 750);
      return () => clearTimeout(timeout);
    }
  }, [filters, preferences]);

  return <SearchContext.Provider value={items ?? DefaultValues}>{children}</SearchContext.Provider>;
};
