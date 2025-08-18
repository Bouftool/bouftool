import { type Dispatch, type SetStateAction, useEffect, useReducer } from "react";
import { type TSearchItemsSort } from "src/wakfu/search/types";
import { WakfuStats } from "src/wakfu/types/action";
import { searchItemsPreferencesReducer } from "./reducer";

export type TSearchItemsPreferences = {
  mastery: {
    elementsPriority: (
      | WakfuStats.MasteryFire
      | WakfuStats.MasteryEarth
      | WakfuStats.MasteryWater
      | WakfuStats.MasteryAir
    )[];
    meleeRangeMastery: WakfuStats.MeleeMastery | WakfuStats.DistanceMastery | null;
    subMasteries: (
      | WakfuStats.CriticalMastery
      | WakfuStats.BackMastery
      | WakfuStats.BerserkMastery
      | WakfuStats.HealingMastery
    )[];
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

const defaultPreferences: TSearchItemsPreferences = {
  mastery: {
    elementsPriority: [],
    meleeRangeMastery: null,
    subMasteries: [],
  },
  resistance: {
    elementsPriority: [],
  },
};

export const useSearchItemsPreferences = (onChange: Dispatch<SetStateAction<TSearchItemsSort>>) => {
  const [preferences, dispatchPreferences] = useReducer(searchItemsPreferencesReducer, defaultPreferences);

  // biome-ignore lint/correctness/useExhaustiveDependencies: No callback in deps
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange({
        mastery: {
          elementsPriority: preferences.mastery.elementsPriority,
          meleeMastery: preferences.mastery.meleeRangeMastery === WakfuStats.MeleeMastery,
          rangeMastery: preferences.mastery.meleeRangeMastery === WakfuStats.DistanceMastery,
          criticalMastery: preferences.mastery.subMasteries.includes(WakfuStats.CriticalMastery),
          backMastery: preferences.mastery.subMasteries.includes(WakfuStats.BackMastery),
          berserkMastery: preferences.mastery.subMasteries.includes(WakfuStats.BerserkMastery),
          healingMastery: preferences.mastery.subMasteries.includes(WakfuStats.HealingMastery),
        },
        resistance: {
          elementsPriority: preferences.resistance.elementsPriority,
        },
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [preferences]);

  return {
    preferences,
    dispatchPreferences,
  };
};
