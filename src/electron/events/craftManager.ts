import { WakfuCraftManager } from "src/wakfu/craftManager/craftManager";
import { ElectronEvents } from "../types";
import type { ElectronEventManager } from "./manager";

export const registerElectronCraftManagerEvents = (manager: ElectronEventManager) => {
  manager.register(ElectronEvents.CraftManagerAddItem, (reply, { itemId }) => {
    WakfuCraftManager.getInstance().addItemToCraft(itemId);
    reply(undefined);
  });

  manager.register(ElectronEvents.CraftManagerGetItems, (reply) => {
    reply(WakfuCraftManager.getInstance().getItemsToCraftRecursivly());
  });
};
