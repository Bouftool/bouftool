import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { WakfuStats } from "src/wakfu/types/action";

export type TSearchItemsMeleeRangeMasteryPreferencesProps = {
  value: WakfuStats.MeleeMastery | WakfuStats.DistanceMastery | null;
  onChange: (value: WakfuStats.MeleeMastery | WakfuStats.DistanceMastery | null) => void;
};

export const SearchItemsMeleeRangeMasteryPreferences = ({
  value,
  onChange,
}: TSearchItemsMeleeRangeMasteryPreferencesProps) => {
  return (
    <ToggleButtonGroup variant="push" value={value} exclusive onChange={(_event, newValue) => onChange(newValue)}>
      <ToggleButton value={WakfuStats.MeleeMastery}>
        <StatsIcon>{WakfuStats.MeleeMastery}</StatsIcon>
      </ToggleButton>
      <ToggleButton value={WakfuStats.DistanceMastery}>
        <StatsIcon>{WakfuStats.DistanceMastery}</StatsIcon>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
