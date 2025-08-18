import { Button, Stack, Typography } from "@mui/material";
import clsx from "clsx";
import { type Dispatch, type SetStateAction, useState } from "react";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { Popover } from "src/front/components/Navigation/Popover";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { SearchItemsSortBy, type TSearchItemsSort, type TSearchItemsSortOptions } from "src/wakfu/search/types";
import { WakfuStats } from "src/wakfu/types/action";
import { SearchItemsSortOptionsPopoverWidth } from "../../constants";
import { SearchEquipmentsSortsOptionsMasteryElementCount } from "./elementCount";
import { SearchEquipmentsSortsOptionsMasteryElementPriority } from "./elementPriority";
import { SearchEquipmentsSortsOptionsMasteryToggleMeleeRange } from "./toggleMeleeDistance";

export type TSearchEquipmentsSortsOptionsMasteryProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  options: TSearchItemsSortOptions[SearchItemsSortBy.Weight];
  setSort: Dispatch<SetStateAction<TSearchItemsSort>>;
};

export const SearchEquipmentsSortsOptionsMastery = ({
  open,
  anchorEl,
  onClose,
  options,
  setSort,
}: TSearchEquipmentsSortsOptionsMasteryProps) => {
  const [localOptions, setLocalOptions] = useState<TSearchItemsSortOptions[SearchItemsSortBy.Weight]>(options);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      onClose={() => {
        setSort({
          sortBy: SearchItemsSortBy.Weight,
          options: localOptions,
        });
        onClose();
      }}
      slotProps={{ paper: { sx: (theme) => ({ border: `1px solid ${theme.palette.border.main}` }) } }}
    >
      <Stack
        sx={{
          width: SearchItemsSortOptionsPopoverWidth,
          p: 1.5,
          gap: 1,
        }}
      >
        <Stack>
          <Typography variant="subtitle2">Nombre d'éléments</Typography>
          <SearchEquipmentsSortsOptionsMasteryElementCount
            value={localOptions.mastery.elementsCount}
            onChange={(value) =>
              setLocalOptions((prev) => ({ ...prev, mastery: { ...prev.mastery, elementsCount: value } }))
            }
          />
        </Stack>
        <Stack>
          <Typography variant="subtitle2">Éléments à prioriser</Typography>
          <SearchEquipmentsSortsOptionsMasteryElementPriority
            value={localOptions.mastery.elementsPriority}
            onChange={(value) =>
              setLocalOptions((prev) => ({ ...prev, mastery: { ...prev.mastery, elementsPriority: value } }))
            }
          />
        </Stack>
        <Stack>
          <Typography variant="subtitle2">Autres maîtrises</Typography>
          <SearchEquipmentsSortsOptionsMasteryToggleMeleeRange value={localOptions} onChange={setLocalOptions} />
          <StackGrid columns={2} gap={1} sx={{ mt: 1 }}>
            <Button
              variant="push"
              className={clsx({ "Mui-selected": localOptions.mastery.criticalMastery })}
              onClick={() =>
                setLocalOptions((prev) => ({
                  ...prev,
                  mastery: { ...prev.mastery, criticalMastery: !prev.mastery.criticalMastery },
                }))
              }
            >
              <StatsIcon>{WakfuStats.CriticalMastery}</StatsIcon>
            </Button>
            <Button
              variant="push"
              className={clsx({ "Mui-selected": localOptions.mastery.backMastery })}
              onClick={() =>
                setLocalOptions((prev) => ({
                  ...prev,
                  mastery: { ...prev.mastery, backMastery: !prev.mastery.backMastery },
                }))
              }
            >
              <StatsIcon>{WakfuStats.BackMastery}</StatsIcon>
            </Button>
            <Button
              variant="push"
              className={clsx({ "Mui-selected": localOptions.mastery.berserkMastery })}
              onClick={() =>
                setLocalOptions((prev) => ({
                  ...prev,
                  mastery: { ...prev.mastery, berserkMastery: !prev.mastery.berserkMastery },
                }))
              }
            >
              <StatsIcon>{WakfuStats.BerserkMastery}</StatsIcon>
            </Button>
            <Button
              variant="push"
              className={clsx({ "Mui-selected": localOptions.mastery.healingMastery })}
              onClick={() =>
                setLocalOptions((prev) => ({
                  ...prev,
                  mastery: { ...prev.mastery, healingMastery: !prev.mastery.healingMastery },
                }))
              }
            >
              <StatsIcon>{WakfuStats.HealingMastery}</StatsIcon>
            </Button>
          </StackGrid>
        </Stack>
      </Stack>
    </Popover>
  );
};
