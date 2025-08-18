import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { WakfuStats } from "src/wakfu/types/action";
import type { TSearchItemsPreferences } from "../logics";

export type TSearchItemsResistanceElementsPreferencesProps = {
  value: TSearchItemsPreferences["resistance"]["elementsPriority"];
  onChange: (value: TSearchItemsPreferences["resistance"]["elementsPriority"]) => void;
};

export const SearchItemsResistanceElementsPreferences = ({
  value,
  onChange,
}: TSearchItemsResistanceElementsPreferencesProps) => {
  return (
    <ToggleButtonGroup
      variant="push"
      sx={{ bgcolor: "grey.900" }}
      value={value}
      onChange={(_, newValue: TSearchItemsPreferences["resistance"]["elementsPriority"]) => onChange(newValue)}
    >
      <ToggleButton value={WakfuStats.ResistanceFire}>
        <StatsIcon>{WakfuStats.MasteryFire}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={WakfuStats.ResistanceWater}>
        <StatsIcon>{WakfuStats.MasteryWater}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={WakfuStats.ResistanceEarth}>
        <StatsIcon>{WakfuStats.MasteryEarth}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={WakfuStats.ResistanceAir}>
        <StatsIcon>{WakfuStats.MasteryAir}</StatsIcon>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
