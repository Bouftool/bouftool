import { Button } from "@mui/material";
import clsx from "clsx";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import type { SearchItemsSortBy, TSearchItemsSortOptions } from "src/wakfu/search/types";
import { WakfuStats } from "src/wakfu/types/action";

type ElementsPriority = TSearchItemsSortOptions[SearchItemsSortBy.Weight]["mastery"]["elementsPriority"];

export type TSearchEquipmentsSortsOptionsMasteryElementPriorityProps = {
  value: ElementsPriority;
  onChange: (value: ElementsPriority) => void;
};

export const SearchEquipmentsSortsOptionsMasteryElementPriority = ({
  value,
  onChange,
}: TSearchEquipmentsSortsOptionsMasteryElementPriorityProps) => {
  const handleButtonClick = (stats: ElementsPriority[number]) => {
    if (value.includes(stats)) {
      onChange(value.filter((id) => id !== stats));
    } else {
      onChange([...value, stats]);
    }
  };

  const isSelected = (stats: ElementsPriority[number]) => value.includes(stats);

  return (
    <StackGrid columns={2} gap={1}>
      <Button
        onClick={() => handleButtonClick(WakfuStats.MasteryFire)}
        className={clsx({ "Mui-selected": isSelected(WakfuStats.MasteryFire) })}
      >
        <StatsIcon>{WakfuStats.MasteryFire}</StatsIcon>
      </Button>
      <Button
        onClick={() => handleButtonClick(WakfuStats.MasteryWater)}
        className={clsx({ "Mui-selected": isSelected(WakfuStats.MasteryWater) })}
      >
        <StatsIcon>{WakfuStats.MasteryWater}</StatsIcon>
      </Button>
      <Button
        onClick={() => handleButtonClick(WakfuStats.MasteryEarth)}
        className={clsx({ "Mui-selected": isSelected(WakfuStats.MasteryEarth) })}
      >
        <StatsIcon>{WakfuStats.MasteryEarth}</StatsIcon>
      </Button>
      <Button
        onClick={() => handleButtonClick(WakfuStats.MasteryAir)}
        className={clsx({ "Mui-selected": isSelected(WakfuStats.MasteryAir) })}
      >
        <StatsIcon>{WakfuStats.MasteryAir}</StatsIcon>
      </Button>
    </StackGrid>
  );
};
