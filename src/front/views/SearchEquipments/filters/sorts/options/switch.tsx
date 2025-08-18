import type { Dispatch, SetStateAction } from "react";
import { SearchItemsSortBy, type TSearchItemsSort } from "src/wakfu/search/types";
import { SearchEquipmentsSortsOptionsMastery } from "./mastery";

export const haveSortOption = (sort: TSearchItemsSort) => {
  return [SearchItemsSortBy.Weight].includes(sort.sortBy);
};

export type TSearchEquipmentsSortsOptionsProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  sort: TSearchItemsSort;
  setSort: Dispatch<SetStateAction<TSearchItemsSort>>;
};

export const SearchEquipmentsSortsOptionsSwitch = ({
  open,
  anchorEl,
  onClose,
  sort,
  setSort,
}: TSearchEquipmentsSortsOptionsProps) => {
  switch (sort.sortBy) {
    case SearchItemsSortBy.Level:
      return null;
    case SearchItemsSortBy.Weight:
      return (
        <SearchEquipmentsSortsOptionsMastery
          open={open}
          anchorEl={anchorEl}
          onClose={onClose}
          options={sort.options}
          setSort={setSort}
        />
      );
    default:
      return null;
  }
};
