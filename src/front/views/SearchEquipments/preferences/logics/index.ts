import { useReducer } from "react";
import type { EnumWakfuStat, TWakfuStatElementalMastery, TWakfuStatElementalResistance } from "src/wakfu/stats/types";
import { searchItemsPreferencesReducer } from "./reducer";

export type TSearchItemsPreferences = {
  mastery: {
    elementsPriority: TWakfuStatElementalMastery[];
    rangeMastery: EnumWakfuStat.MeleeMastery | EnumWakfuStat.DistanceMastery | null;
    subMasteries: (
      | EnumWakfuStat.CriticalMastery
      | EnumWakfuStat.RearMastery
      | EnumWakfuStat.BerserkMastery
      | EnumWakfuStat.HealingMastery
    )[];
  };
  resistance: {
    elementsPriority: TWakfuStatElementalResistance[];
  };
};

const defaultPreferences: TSearchItemsPreferences = {
  mastery: {
    elementsPriority: [],
    rangeMastery: null,
    subMasteries: [],
  },
  resistance: {
    elementsPriority: [],
  },
};

export const useSearchItemsPreferences = () => {
  const [preferences, dispatchPreferences] = useReducer(searchItemsPreferencesReducer, defaultPreferences);

  return {
    preferences,
    dispatchPreferences,
  };
};
