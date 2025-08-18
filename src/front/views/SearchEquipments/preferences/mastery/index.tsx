import type { Dispatch } from "react";
import { StackRow } from "src/front/components/Layout/StackRow";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { WakfuStats } from "src/wakfu/types/action";
import type { TSearchItemsPreferences } from "../logics";
import type { TSearchItemsPreferencesAction } from "../logics/reducer";
import { SearchItemsMasteryElementsPreferences } from "./elements";
import { SearchItemsMeleeRangeMasteryPreferences } from "./meleeRangeToggle";
import { SearchItemsSubMasteriesPreferences } from "./subMasteries";

export type TSearchItemsMasteryPreferencesProps = {
  value: TSearchItemsPreferences["mastery"];
  dispatchPreferences: Dispatch<TSearchItemsPreferencesAction>;
};

export const SearchItemsMasteryPreferences = ({ value, dispatchPreferences }: TSearchItemsMasteryPreferencesProps) => {
  return (
    <StackRow>
      <StatsIcon>{WakfuStats.Mastery}</StatsIcon>
      <SearchItemsMasteryElementsPreferences
        value={value.elementsPriority}
        onChange={(elementsPriority) =>
          dispatchPreferences({ type: "set:mastery:elementsPriority", payload: elementsPriority })
        }
      />
      <SearchItemsMeleeRangeMasteryPreferences
        value={value.meleeRangeMastery}
        onChange={(value) => {
          dispatchPreferences({ type: "set:mastery:meleeRangeMastery", payload: value });
        }}
      />
      <SearchItemsSubMasteriesPreferences
        value={value.subMasteries}
        onChange={(subMasteries) => dispatchPreferences({ type: "set:mastery:subMasteries", payload: subMasteries })}
      />
    </StackRow>
  );
};
