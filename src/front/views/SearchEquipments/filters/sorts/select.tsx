import SwapVert from "@mui/icons-material/SwapVert";
import { Button, ToggleButton, ToggleButtonGroup, Typography, toggleButtonClasses } from "@mui/material";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import { Popover } from "src/front/components/Navigation/Popover";
import { SearchItemsSortBy, type TSearchItemsSort } from "src/wakfu/search/types";
import { defaultSortOptions } from "../logics/sort";
import { SearchItemsSortSelectButtonWidth } from "./constants";

const SortByLabels: Record<SearchItemsSortBy, string> = {
  [SearchItemsSortBy.Level]: "Niveau",
  [SearchItemsSortBy.Weight]: "Poids",
};

export type TSearchEquipmentsSortsSelectProps = {
  sort: TSearchItemsSort;
  setSort: Dispatch<SetStateAction<TSearchItemsSort>>;
};

export const SearchEquipmentsSortsSelect = ({ sort, setSort }: TSearchEquipmentsSortsSelectProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          width: SearchItemsSortSelectButtonWidth,
        }}
        ref={anchorRef}
        onClick={() => setOpen(true)}
      >
        <SwapVert />
        <Typography sx={{ textTransform: "none", fontWeight: 500, pr: 0.5 }}>{SortByLabels[sort.sortBy]}</Typography>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setOpen(false)}
      >
        <ToggleButtonGroup
          variant="push"
          orientation="vertical"
          sx={{
            width: SearchItemsSortSelectButtonWidth,
            [`& .${toggleButtonClasses.root}`]: { justifyContent: "end" },
          }}
          value={sort.sortBy}
          exclusive
          onChange={(_event, newValue: SearchItemsSortBy) => {
            console.log(newValue);
            if (newValue !== null) {
              setSort(defaultSortOptions[newValue]);
            }
          }}
        >
          {Object.values(SearchItemsSortBy).map((sortBy) => (
            <ToggleButton key={sortBy} value={sortBy}>
              {SortByLabels[sortBy]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Popover>
    </>
  );
};
