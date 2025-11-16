import type { WakfuItem } from "src/wakfu/items";
import type { EnumWakfuStat, TWakfuStatElementalMastery, TWakfuStatElementalResistance } from "src/wakfu/stats/types";

export enum SearchItemsFilterStatsOperator {
  Equal = "equal",
  GreaterThanOrEqual = "greaterThanOrEqual",
  LessThanOrEqual = "lessThanOrEqual",
}

export type TSearchItemsSort = {
  mastery: {
    elementsPriority: TWakfuStatElementalMastery[];
    meleeMastery: boolean;
    distanceMastery: boolean;
    criticalMastery: boolean;
    rearMastery: boolean;
    berserkMastery: boolean;
    healingMastery: boolean;
  };
  resistance: {
    elementsPriority: TWakfuStatElementalResistance[];
  };
};

export type TSearchItemsFilters = {
  title: string;
  itemTypes: number[];
  rarities: number[];
  levels: {
    min: number;
    max: number;
  };
  stats: {
    stats: EnumWakfuStat;
    value: number;
    operator: SearchItemsFilterStatsOperator;
  }[];
};

export type TSearchItemsPayload = {
  filters: TSearchItemsFilters;
  sort: TSearchItemsSort;
  buildLevel?: number;
};

export type TSearchItemsResult = ReturnType<WakfuItem["toObject"]>;
