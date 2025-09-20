import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { EnumWakfuStat } from "src/wakfu/stats/types";
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
      <ToggleButton value={EnumWakfuStat.CriticalMastery}>
        <StatsIcon>{EnumWakfuStat.CriticalMastery}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={EnumWakfuStat.RearMastery}>
        <StatsIcon>{EnumWakfuStat.RearMastery}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={EnumWakfuStat.BerserkMastery}>
        <StatsIcon>{EnumWakfuStat.BerserkMastery}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={EnumWakfuStat.HealingMastery}>
        <StatsIcon>{EnumWakfuStat.HealingMastery}</StatsIcon>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
