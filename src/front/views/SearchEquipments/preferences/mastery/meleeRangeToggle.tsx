import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { EnumWakfuStat } from "src/wakfu/stats/types";

export type TSearchItemsMeleeRangeMasteryPreferencesProps = {
  value: EnumWakfuStat.MeleeMastery | EnumWakfuStat.DistanceMastery | null;
  onChange: (value: EnumWakfuStat.MeleeMastery | EnumWakfuStat.DistanceMastery | null) => void;
};

export const SearchItemsMeleeRangeMasteryPreferences = ({
  value,
  onChange,
}: TSearchItemsMeleeRangeMasteryPreferencesProps) => {
  return (
    <ToggleButtonGroup variant="push" value={value} exclusive onChange={(_event, newValue) => onChange(newValue)}>
      <ToggleButton value={EnumWakfuStat.MeleeMastery}>
        <StatsIcon>{EnumWakfuStat.MeleeMastery}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={EnumWakfuStat.DistanceMastery}>
        <StatsIcon>{EnumWakfuStat.DistanceMastery}</StatsIcon>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
