import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { EnumWakfuStat, type TWakfuStatElementalMastery } from "src/wakfu/stats/types";

export type SearchItemsMasteryElementsPreferencesProps = {
  value: TWakfuStatElementalMastery[];
  onChange: (value: TWakfuStatElementalMastery[]) => void;
};

export const SearchItemsMasteryElementsPreferences = ({
  value,
  onChange,
}: SearchItemsMasteryElementsPreferencesProps) => {
  return (
    <ToggleButtonGroup
      variant="push"
      value={value}
      onChange={(_, newValue: TWakfuStatElementalMastery[]) => onChange(newValue)}
    >
      <ToggleButton value={EnumWakfuStat.FireMastery}>
        <StatsIcon>{EnumWakfuStat.FireMastery}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={EnumWakfuStat.WaterMastery}>
        <StatsIcon>{EnumWakfuStat.WaterMastery}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={EnumWakfuStat.EarthMastery}>
        <StatsIcon>{EnumWakfuStat.EarthMastery}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={EnumWakfuStat.AirMastery}>
        <StatsIcon>{EnumWakfuStat.AirMastery}</StatsIcon>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
