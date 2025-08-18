import { ToggleButton, ToggleButtonGroup, toggleButtonClasses } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import type { SearchItemsSortBy, TSearchItemsSortOptions } from "src/wakfu/search/types";
import { WakfuStats } from "src/wakfu/types/action";

export type TSearchEquipmentsSortsOptionsMasteryToggleMeleeRangeProps = {
  value: TSearchItemsSortOptions[SearchItemsSortBy.Weight];
  onChange: Dispatch<SetStateAction<TSearchItemsSortOptions[SearchItemsSortBy.Weight]>>;
};

export const SearchEquipmentsSortsOptionsMasteryToggleMeleeRange = ({
  value,
  onChange,
}: TSearchEquipmentsSortsOptionsMasteryToggleMeleeRangeProps) => {
  return (
    <ToggleButtonGroup
      variant="push"
      exclusive
      fullWidth
      sx={{ [`& .${toggleButtonClasses.root}`]: { justifyContent: "center !important" } }}
    >
      <ToggleButton
        value="melee"
        onClick={() =>
          onChange((prev) => ({
            ...prev,
            mastery: { ...prev.mastery, distanceMastery: false, meleeMastery: !prev.mastery.meleeMastery },
          }))
        }
        selected={value.mastery.meleeMastery}
      >
        <StatsIcon>{WakfuStats.MeleeMastery}</StatsIcon>
      </ToggleButton>
      <ToggleButton
        value="distance"
        onClick={() =>
          onChange((prev) => ({
            ...prev,
            mastery: { ...prev.mastery, meleeMastery: false, distanceMastery: !prev.mastery.distanceMastery },
          }))
        }
        selected={value.mastery.distanceMastery}
      >
        <StatsIcon>{WakfuStats.DistanceMastery}</StatsIcon>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
