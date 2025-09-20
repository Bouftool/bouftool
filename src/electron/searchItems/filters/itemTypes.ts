import type { WakfuItem } from "src/wakfu/items";
import { EnumWakfuItemType } from "src/wakfu/itemTypes/types";

export const searchItemsItemTypesFilter = (item: WakfuItem, itemTypes: number[]) => {
  if (itemTypes.length === 0) {
    itemTypes = [
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
    ];
  }
  return itemTypes.some(
    (itemType) => itemType === item.getItemType().getId() || itemType === item.getItemType().getParentId(),
  );
};
