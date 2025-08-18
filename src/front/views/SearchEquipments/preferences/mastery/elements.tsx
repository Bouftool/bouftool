import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { type TWakfuStatsElementalMastery, WakfuStats } from "src/wakfu/types/action";

export type SearchItemsMasteryElementsPreferencesProps = {
  value: TWakfuStatsElementalMastery[];
  onChange: (value: TWakfuStatsElementalMastery[]) => void;
};

export const SearchItemsMasteryElementsPreferences = ({
  value,
  onChange,
}: SearchItemsMasteryElementsPreferencesProps) => {
  return (
    <ToggleButtonGroup
      variant="push"
      value={value}
      onChange={(_, newValue: TWakfuStatsElementalMastery[]) => onChange(newValue)}
    >
      <ToggleButton value={WakfuStats.MasteryFire}>
        <StatsIcon>{WakfuStats.MasteryFire}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={WakfuStats.MasteryWater}>
        <StatsIcon>{WakfuStats.MasteryWater}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={WakfuStats.MasteryEarth}>
        <StatsIcon>{WakfuStats.MasteryEarth}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={WakfuStats.MasteryAir}>
        <StatsIcon>{WakfuStats.MasteryAir}</StatsIcon>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
