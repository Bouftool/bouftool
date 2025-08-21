import { Stack } from "@mui/material";
import { useState } from "react";
import type { TSearchItemsFiltersForm } from "src/front/views/SearchEquipments/filters";
import { SearchEquipments } from "../../../SearchEquipments";
import { BuildAbilities } from "../Abilities";
import { BuildDetailsNavbar } from "./Navbar";

export enum EnumBuildDetailsTabs {
  Equipments = "equipments",
  Abilities = "abilities",
}

export type TBuildDetailsTabsSwitchProps = {
  selectedTab: EnumBuildDetailsTabs;
  defaultFilters: Partial<TSearchItemsFiltersForm>;
  onEquipItem: (itemId: number) => void;
};

const BuildDetailsTabsSwitch = ({ selectedTab, defaultFilters, onEquipItem }: TBuildDetailsTabsSwitchProps) => {
  switch (selectedTab) {
    case EnumBuildDetailsTabs.Equipments:
      return <SearchEquipments defaultFilters={defaultFilters} onEquipItem={onEquipItem} />;
    case EnumBuildDetailsTabs.Abilities:
      return <BuildAbilities />;
    default:
      return null;
  }
};

export type TBuildDetailsTabsProps = {
  defaultFilters: Partial<TSearchItemsFiltersForm>;
  onEquipItem: (itemId: number) => void;
};

export const BuildDetailsTabs = ({ defaultFilters, onEquipItem }: TBuildDetailsTabsProps) => {
  const [selectedTab, setSelectedTab] = useState<EnumBuildDetailsTabs>(EnumBuildDetailsTabs.Equipments);

  return (
    <Stack sx={{ flex: 1, overflow: "hidden" }}>
      <BuildDetailsNavbar selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <BuildDetailsTabsSwitch selectedTab={selectedTab} defaultFilters={defaultFilters} onEquipItem={onEquipItem} />
    </Stack>
  );
};
