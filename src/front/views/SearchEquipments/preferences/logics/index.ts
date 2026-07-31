import { useReducer } from "react";
import type {
  TWakfuStatElementalMastery,
  TWakfuStatElementalResistance,
  TWakfuStatRangeMastery,
  TWakfuStatSubMastery,
} from "src/wakfu/stats/types";
import { searchItemsPreferencesReducer } from "./reducer";

export type TSearchItemsPreferences = {
  mastery: {
    elementsPriority: TWakfuStatElementalMastery[];
    rangeMastery: TWakfuStatRangeMastery | null;
    subMasteries: TWakfuStatSubMastery[];
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
