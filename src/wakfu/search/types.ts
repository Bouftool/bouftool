import type { WakfuStats } from "../types/action";
import type { TWakfuItemParsed } from "../types/items";

export enum SearchItemsFilterStatsOperator {
  Equal = "equal",
  GreaterThanOrEqual = "greaterThanOrEqual",
  LessThanOrEqual = "lessThanOrEqual",
}

export type TSearchItemsSort = {
  mastery: {
    elementsPriority: (
      | WakfuStats.MasteryFire
      | WakfuStats.MasteryEarth
      | WakfuStats.MasteryWater
      | WakfuStats.MasteryAir
    )[];
    meleeMastery: boolean;
    rangeMastery: boolean;
    criticalMastery: boolean;
    backMastery: boolean;
    berserkMastery: boolean;
    healingMastery: boolean;
  };
  resistance: {
    elementsPriority: (
      | WakfuStats.ResistanceFire
      | WakfuStats.ResistanceEarth
      | WakfuStats.ResistanceWater
      | WakfuStats.ResistanceAir
    )[];
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
    stats: WakfuStats;
    value: number;
    operator: SearchItemsFilterStatsOperator;
  }[];
};

export type TSearchItemsPayload = {
  filters: TSearchItemsFilters;
  sort: TSearchItemsSort;
};

export type TSearchItemsResult = Pick<
  TWakfuItemParsed,
  "id" | "level" | "itemTypeId" | "rarity" | "gfxId" | "equipEffectsLabels"
> & { title: string };
