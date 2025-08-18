import FilterIcon from "@mui/icons-material/FilterAlt";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import type { TSearchItemsFilters } from "src/wakfu/search/types";
import { isWakfuStats, WakfuStats } from "src/wakfu/types/action";
import { RangeFields } from "../../../components/Input/RangeFields";
import { ItemTypeFilters } from "./itemTypes";
import { RarityFilters } from "./rarities/rarity";
import { StatsFilters, StatsFiltersCards } from "./stats";

const defaultFilters = {
  title: "",
  rarities: [],
  itemTypes: [],
  levels: { min: 1, max: 245 },
  stats: {},
};

export type TSearchItemsFiltersForm = {
  title: string;
  rarities: number[];
  itemTypes: number[];
  levels: { min: number; max: number };
  stats: Partial<Record<WakfuStats, Omit<TSearchItemsFilters["stats"][number], "stats">>>;
};

export type TSearchItemsFiltersProps = {
  onChange: (value: TSearchItemsFilters) => void;
};

export const SearchItemsFilters = ({ onChange }: TSearchItemsFiltersProps) => {
  const [filters, setFilters] = useState<TSearchItemsFiltersForm>(defaultFilters);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Don't listen on callbacks
  useEffect(() => {
    const timeout = setTimeout(() => {
      const stats: TSearchItemsFilters["stats"] = [];
      for (const wakfuStats of Object.values(WakfuStats)) {
        if (isWakfuStats(wakfuStats)) {
          const values = filters.stats[wakfuStats];
          if (values) {
            stats.push({ ...values, stats: wakfuStats });
          }
        }
      }
      onChange({
        title: filters.title,
        rarities: filters.rarities,
        itemTypes: filters.itemTypes,
        levels: filters.levels,
        stats: stats,
      });
    }, 750);
    return () => clearTimeout(timeout);
  }, [filters]);

  return (
    <Stack sx={{ flexDirection: "row", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
      <FilterIcon />
      <TextField
        placeholder="Rechercher..."
        size="small"
        value={filters.title}
        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
      />
      <RangeFields
        label="Niv."
        min={0}
        max={245}
        value={[filters.levels.min, filters.levels.max]}
        onChange={(range) => setFilters({ ...filters, levels: { min: range[0], max: range[1] } })}
        slotProps={{ box: { sx: { width: 160 } } }}
      />
      <RarityFilters value={filters.rarities} onChange={(rarities) => setFilters({ ...filters, rarities })} />
      <ItemTypeFilters value={filters.itemTypes} onChange={(itemTypes) => setFilters({ ...filters, itemTypes })} />
      <StatsFilters value={filters.stats} onChange={(stats) => setFilters({ ...filters, stats })} />
      <StatsFiltersCards value={filters.stats} onChange={(stats) => setFilters({ ...filters, stats })} />
      <Button variant="push" onClick={() => setFilters(defaultFilters)} sx={{ minWidth: 0 }}>
        <ReplayIcon />
      </Button>
    </Stack>
  );
};
