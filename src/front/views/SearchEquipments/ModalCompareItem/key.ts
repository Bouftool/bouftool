import { type EnumWakfuEquipmentPosition, isWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";

type TModalCompareItemSourceIdentity = EnumWakfuEquipmentPosition | { id: number };

export const getModalCompareItemCardKey = (
  position: EnumWakfuEquipmentPosition,
  targetItemId: number,
  sourceItems: readonly TModalCompareItemSourceIdentity[],
) => {
  return [
    `position-${position}`,
    `target-${targetItemId}`,
    ...sourceItems.map((sourceItem) =>
      isWakfuEquipmentPosition(sourceItem) ? `position-${sourceItem}` : `item-${sourceItem.id}`,
    ),
  ].join("|");
};
