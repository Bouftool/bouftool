import { Stack } from "@mui/material";
import { useState } from "react";
import { BuildAbilities } from "../Abilities";
import { BuildEnchantment } from "../Enchantment";
import { BuildDetailsNavbar } from "./Navbar";
import { BuildSearchItems } from "./SearchItems";
import { EnumBuildDetailsTabs, type EnumBuildDetailsTabs as TBuildDetailsTab } from "./types";

export type TBuildDetailsTabsSwitchProps = {
  selectedTab: TBuildDetailsTab;
};

const BuildDetailsTabsSwitch = ({ selectedTab }: TBuildDetailsTabsSwitchProps) => {
  switch (selectedTab) {
    case EnumBuildDetailsTabs.Equipments:
      return <BuildSearchItems />;
    case EnumBuildDetailsTabs.Abilities:
      return <BuildAbilities />;
    case EnumBuildDetailsTabs.Enchantment:
      return <BuildEnchantment />;
    default:
      return null;
  }
};

export const BuildDetailsTabs = () => {
  const [selectedTab, setSelectedTab] = useState<TBuildDetailsTab>(EnumBuildDetailsTabs.Equipments);

  return (
    <Stack sx={{ flex: 1, overflow: "hidden" }}>
      <BuildDetailsNavbar selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <BuildDetailsTabsSwitch selectedTab={selectedTab} />
    </Stack>
  );
};
