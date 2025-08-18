import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { WakfuStats } from "src/wakfu/types/action";
import type { TSearchItemsPreferences } from "../logics";

export type TSearchItemsSubMasteriesPreferencesProps = {
  value: TSearchItemsPreferences["mastery"]["subMasteries"];
  onChange: (value: TSearchItemsPreferences["mastery"]["subMasteries"]) => void;
};

export const SearchItemsSubMasteriesPreferences = ({ value, onChange }: TSearchItemsSubMasteriesPreferencesProps) => {
  return (
    <ToggleButtonGroup
      variant="push"
      value={value}
      onChange={(_, newValue: TSearchItemsPreferences["mastery"]["subMasteries"]) => onChange(newValue)}
    >
      <ToggleButton value={WakfuStats.CriticalMastery}>
        <StatsIcon>{WakfuStats.CriticalMastery}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={WakfuStats.BackMastery}>
        <StatsIcon>{WakfuStats.BackMastery}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={WakfuStats.BerserkMastery}>
        <StatsIcon>{WakfuStats.BerserkMastery}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={WakfuStats.HealingMastery}>
        <StatsIcon>{WakfuStats.HealingMastery}</StatsIcon>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
