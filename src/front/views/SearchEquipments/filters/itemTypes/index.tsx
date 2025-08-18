import { Badge, badgeClasses, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { WakfuItemTypeId } from "src/wakfu/types/itemType";
import { SidePopover } from "../../../../components/Navigation/SidePopover";
import { ItemTypeIcon } from "../../../../components/Wakfu/ItemTypeIcon";
import { ItemTypeLabels } from "./constants";

const ItemTypes = [
  WakfuItemTypeId.Amulet,
  WakfuItemTypeId.Ring,
  WakfuItemTypeId.Boots,
  WakfuItemTypeId.Cloak,
  WakfuItemTypeId.Helmet,
  WakfuItemTypeId.Belt,
  WakfuItemTypeId.Shoulders,
  WakfuItemTypeId.Breastplate,
  WakfuItemTypeId.OneHandedWeapon,
  WakfuItemTypeId.TwoHandedWeapon,
  WakfuItemTypeId.SecondHand,
  WakfuItemTypeId.Emblem,
  WakfuItemTypeId.Pet,
  WakfuItemTypeId.Mount,
];

export type TItemTypeFiltersProps = {
  value: WakfuItemTypeId[];
  onChange: (value: WakfuItemTypeId[]) => void;
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
        label={<ItemTypeIcon width={24}>{WakfuItemTypeId.Helmet}</ItemTypeIcon>}
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
