import type { WakfuStats } from "src/wakfu/types/action";
import type { TSearchItemsPreferences } from "./index";

export type TSearchItemsPreferencesAction =
  | { type: "set:mastery"; payload: TSearchItemsPreferences["mastery"] }
  | { type: "set:mastery:elementsPriority"; payload: TSearchItemsPreferences["mastery"]["elementsPriority"] }
  | { type: "set:mastery:meleeRangeMastery"; payload: WakfuStats.MeleeMastery | WakfuStats.DistanceMastery | null }
  | { type: "set:mastery:subMasteries"; payload: TSearchItemsPreferences["mastery"]["subMasteries"] }
  | { type: "set:resistance"; payload: TSearchItemsPreferences["resistance"] }
  | { type: "set:resistance:elementsPriority"; payload: TSearchItemsPreferences["resistance"]["elementsPriority"] };

export const searchItemsPreferencesReducer = (
  preferences: TSearchItemsPreferences,
  action: TSearchItemsPreferencesAction,
): TSearchItemsPreferences => {
  switch (action.type) {
    case "set:mastery":
      return { ...preferences, mastery: action.payload };
    case "set:mastery:elementsPriority":
      return { ...preferences, mastery: { ...preferences.mastery, elementsPriority: action.payload } };
    case "set:mastery:meleeRangeMastery":
      return { ...preferences, mastery: { ...preferences.mastery, meleeRangeMastery: action.payload } };
    case "set:mastery:subMasteries":
      return { ...preferences, mastery: { ...preferences.mastery, subMasteries: action.payload } };
    case "set:resistance":
      return { ...preferences, resistance: action.payload };
    case "set:resistance:elementsPriority":
      return { ...preferences, resistance: { ...preferences.resistance, elementsPriority: action.payload } };
    default:
      return preferences;
  }
};
