import { ButtonGroup } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import type { TSearchItemsSort } from "src/wakfu/search/types";
import { SearchEquipmentsSortsOptions } from "./options";
import { SearchEquipmentsSortsSelect } from "./select";

export type TSearchEquipmentsSortsProps = {
  sort: TSearchItemsSort;
  setSort: Dispatch<SetStateAction<TSearchItemsSort>>;
};

export const SearchEquipmentsSorts = ({ sort, setSort }: TSearchEquipmentsSortsProps) => {
  return (
    <ButtonGroup variant="push">
      <SearchEquipmentsSortsOptions sort={sort} setSort={setSort} />
      <SearchEquipmentsSortsSelect sort={sort} setSort={setSort} />
    </ButtonGroup>
  );
};
