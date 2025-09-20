import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { EnumWakfuStat } from "src/wakfu/stats/types";
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
      <ToggleButton value={EnumWakfuStat.FireResistance}>
        <StatsIcon>{EnumWakfuStat.FireResistance}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={EnumWakfuStat.WaterResistance}>
        <StatsIcon>{EnumWakfuStat.WaterResistance}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={EnumWakfuStat.EarthResistance}>
        <StatsIcon>{EnumWakfuStat.EarthResistance}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={EnumWakfuStat.AirResistance}>
        <StatsIcon>{EnumWakfuStat.AirResistance}</StatsIcon>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
