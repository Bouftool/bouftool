import { Badge, badgeClasses, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { ItemTypeLabels } from "src/wakfu/itemTypes/i18n/labels";
import { EnumWakfuItemType } from "src/wakfu/itemTypes/types";
import { SidePopover } from "../../../../components/Navigation/SidePopover";
import { ItemTypeIcon } from "../../../../components/Wakfu/ItemTypeIcon";

const ItemTypes = [
  EnumWakfuItemType.Amulet,
  EnumWakfuItemType.Ring,
  EnumWakfuItemType.Boots,
  EnumWakfuItemType.Cloak,
  EnumWakfuItemType.Helmet,
  EnumWakfuItemType.Belt,
  EnumWakfuItemType.Shoulders,
  EnumWakfuItemType.Breastplate,
  EnumWakfuItemType.OneHandedWeapon,
  EnumWakfuItemType.TwoHandedWeapon,
  EnumWakfuItemType.SecondHand,
  EnumWakfuItemType.Emblem,
  EnumWakfuItemType.Pet,
  EnumWakfuItemType.Mount,
];

export type TItemTypeFiltersProps = {
  value: EnumWakfuItemType[];
  onChange: (value: EnumWakfuItemType[]) => void;
};

export const ItemTypeFilters = ({ value, onChange }: TItemTypeFiltersProps) => {
  const [badgeHidden, setBadgeHidden] = useState(false);

  return (
    <Badge
      badgeContent={!badgeHidden && value.length > 0 ? String(value.length) : undefined}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      color="primary"
      sx={{ [`& .${badgeClasses.badge}`]: { top: 5, right: 3 } }}
    >
      <SidePopover
        label={<ItemTypeIcon width={24}>{EnumWakfuItemType.Helmet}</ItemTypeIcon>}
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
          {ItemTypes.map((itemType) => (
            <ToggleButton key={itemType} value={itemType}>
              <ItemTypeIcon height={24}>{itemType}</ItemTypeIcon>
              <Typography variant="caption">{ItemTypeLabels[itemType].fr}</Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </SidePopover>
    </Badge>
  );
};
