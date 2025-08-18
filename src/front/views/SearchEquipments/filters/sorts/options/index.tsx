import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import type { TSearchItemsSort } from "src/wakfu/search/types";
import { SearchItemsSortOptionsButtonWidth } from "../constants";
import { haveSortOption, SearchEquipmentsSortsOptionsSwitch } from "./switch";

export type TSearchEquipmentsSortsOptionsProps = {
  sort: TSearchItemsSort;
  setSort: Dispatch<SetStateAction<TSearchItemsSort>>;
};

export const SearchEquipmentsSortsOptions = ({ sort, setSort }: TSearchEquipmentsSortsOptionsProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        disabled={!haveSortOption(sort)}
        onClick={() => setOpen(!open)}
        ref={anchorRef}
        sx={{ width: SearchItemsSortOptionsButtonWidth }}
      >
        <SettingsIcon />
      </Button>
      <SearchEquipmentsSortsOptionsSwitch
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        sort={sort}
        setSort={setSort}
      />
    </>
  );
};
