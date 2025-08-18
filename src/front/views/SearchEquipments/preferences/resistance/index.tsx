import type { Dispatch } from "react";
import { StackRow } from "src/front/components/Layout/StackRow";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { WakfuStats } from "src/wakfu/types/action";
import type { TSearchItemsPreferences } from "../logics";
import type { TSearchItemsPreferencesAction } from "../logics/reducer";
import { SearchItemsResistanceElementsPreferences } from "./elements";

export type TSearchItemsMasteryPreferencesProps = {
  value: TSearchItemsPreferences["resistance"];
  dispatchPreferences: Dispatch<TSearchItemsPreferencesAction>;
};

export const SearchItemsResistancePreferences = ({
  value,
  dispatchPreferences,
}: TSearchItemsMasteryPreferencesProps) => {
  return (
    <StackRow>
      <StatsIcon>{WakfuStats.Resistance}</StatsIcon>
      <SearchItemsResistanceElementsPreferences
        value={value.elementsPriority}
        onChange={(newValue) => dispatchPreferences({ type: "set:resistance:elementsPriority", payload: newValue })}
      />
    </StackRow>
  );
};
