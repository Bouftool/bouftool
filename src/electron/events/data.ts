import { EnumWakfuEquipmentPosition, EnumWakfuItemType } from "src/wakfu/itemTypes/types";
import { WakfuStore } from "src/wakfu/store";
import { ElectronEvents } from "../types";
import type { ElectronEventManager } from "./manager";

export const registerElectronDataEvents = (manager: ElectronEventManager) => {
  manager.register(ElectronEvents.GetItemById, (reply, { id }) => {
    const item = WakfuStore.getInstance().getItemById(id);
    if (!item) {
      throw new Error(`Item with ID ${id} not found`);
    }
    reply(item.toObject());
  });

  manager.register(ElectronEvents.GetItemTypesByEquipmentPosition, (reply, { position }) => {
    switch (position) {
      case EnumWakfuEquipmentPosition.FirstWeapon: {
        reply([EnumWakfuItemType.OneHandedWeapon, EnumWakfuItemType.TwoHandedWeapon]);
        break;
      }
      case EnumWakfuEquipmentPosition.SecondWeapon: {
        reply([EnumWakfuItemType.SecondHand]);
        break;
      }
      default: {
        console.log("Position", position);
        const wakfuData = WakfuStore.getInstance();
        const itemTypes = wakfuData.getItemTypes(
          (itemType) => itemType.isPositionEnabled(position),
          null,
          (itemType) => itemType.getId(),
        );
        console.log("ItemTypes", itemTypes);
        reply(itemTypes);
      }
    }
  });

  manager.register(ElectronEvents.GetItemRecipes, (reply, { itemId }) => {
    const store = WakfuStore.getInstance();
    const item = store.getItemById(itemId);
    if (!item) {
      throw new Error(`Item with ID ${itemId} not found`);
    }
    reply(item.getRecipes().map((recipe) => recipe.toObject()));
  });
};
