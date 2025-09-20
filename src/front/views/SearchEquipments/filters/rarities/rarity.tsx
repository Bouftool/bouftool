import { Badge, badgeClasses, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { EnumWakfuRarity } from "src/wakfu/items/rarity";
import { SidePopover } from "../../../../components/Navigation/SidePopover";
import { RarityIcon } from "../../../../components/Wakfu/RarityIcon";
import { RarityLabels } from "./constants";

const Rarities = Object.values(EnumWakfuRarity).filter((value): value is EnumWakfuRarity => typeof value === "number");

export type TRarityFiltersProps = {
  value: number[];
  onChange: (value: number[]) => void;
};

export const RarityFilters = ({ value, onChange }: TRarityFiltersProps) => {
  const [badgeHidden, setBadgeHidden] = useState(false);

  return (
    <Badge
      badgeContent={!badgeHidden && value.length > 0 ? String(value.length) : undefined}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      color="primary"
      sx={{ [`& .${badgeClasses.badge}`]: { top: 5, right: 3 } }}
    >
      <SidePopover
        label={<RarityIcon height={24}>{EnumWakfuRarity.Relic}</RarityIcon>}
        onToggle={setBadgeHidden}
        slotProps={{ button: { sx: { height: "41px" } } }}
      >
        <ToggleButtonGroup
          orientation="vertical"
          size="small"
          variant="push"
          value={value}
          onChange={(_, newValue) => onChange(newValue)}
        >
          {Rarities.map((rarity) => (
            <ToggleButton key={rarity} value={rarity}>
              <RarityIcon height={24}>{rarity}</RarityIcon>
              <Typography variant="caption">{RarityLabels[rarity].fr}</Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </SidePopover>
    </Badge>
  );
};
