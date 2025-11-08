import { WakfuCraftManager } from "src/wakfu/craftManager/craftManager";
import { OverlayWindow } from "../overlay";
import { ElectronEvents } from "../types";
import { ElectronEventManager } from "./manager";

const sendUpdatedItems = () => {
  const titles = ["Bouftool"];

  if (OverlayWindow.hasInstance() && OverlayWindow.getInstance().getWindow()) {
    titles.push(OverlayWindow.title);
  }

  ElectronEventManager.sendToMany(
    ElectronEvents.CraftManagerGetItems,
    WakfuCraftManager.getInstance().getItemsToCraftRecursivly(),
    titles,
  );
};

export const registerElectronCraftManagerEvents = (manager: ElectronEventManager) => {
  manager.register(ElectronEvents.CraftManagerAddItem, (reply, { itemId }) => {
    WakfuCraftManager.getInstance().addItemToCraft(itemId);
    reply(undefined);
    sendUpdatedItems();
  });

  manager.register(ElectronEvents.CraftManagerAddBuildItems, (reply, { buildId }) => {
    WakfuCraftManager.getInstance().addBuildItemsToCraft(buildId);
    reply(undefined);
    sendUpdatedItems();
  });

  manager.register(ElectronEvents.CraftManagerRemoveItem, (reply, { itemId }) => {
    WakfuCraftManager.getInstance().removeItemToCraft(itemId);
    reply(undefined);
    sendUpdatedItems();
  });

  manager.register(ElectronEvents.CraftManagerSetItemQuantity, (reply, { itemId, quantity }) => {
    WakfuCraftManager.getInstance().setItemQuantity(itemId, quantity);
    reply(undefined);
    sendUpdatedItems();
  });

  manager.register(ElectronEvents.CraftManagerGetItems, (reply) => {
    reply(WakfuCraftManager.getInstance().getItemsToCraftRecursivly());
  });

  manager.register(ElectronEvents.CraftManagerMarkIngredientAsCrafted, (reply, { itemId, path }) => {
    WakfuCraftManager.getInstance().markIngredientAsCrafted(path, itemId);
    reply(undefined);
    sendUpdatedItems();
  });

  manager.register(ElectronEvents.CraftManagerUnmarkIngredientAsCrafted, (reply, { itemId, path }) => {
    WakfuCraftManager.getInstance().unmarkIngredientAsCrafted(path, itemId);
    reply(undefined);
    sendUpdatedItems();
  });

  manager.register(ElectronEvents.CraftManagerMarkAllIngredientsById, (reply, { ingredientId }) => {
    WakfuCraftManager.getInstance().markAllIngredientsById(ingredientId);
    reply(undefined);
    sendUpdatedItems();
  });

  manager.register(ElectronEvents.CraftManagerSetIngredientRecipe, (reply, { itemId, path, recipeIndex }) => {
    WakfuCraftManager.getInstance().setIngredientSelectedRecipe(path, itemId, recipeIndex);
    reply(undefined);
    sendUpdatedItems();
  });

  manager.register(ElectronEvents.CraftManagerOpenOverlay, (reply) => {
    OverlayWindow.getInstance().open();
    reply(undefined);
  });

  manager.register(ElectronEvents.CraftManagerCloseOverlay, (reply) => {
    OverlayWindow.getInstance().close();
    reply(undefined);
  });

  manager.register(ElectronEvents.CraftManagerSetOverlayOpacity, (reply, { opacity }) => {
    OverlayWindow.getInstance().setOpacity(opacity);
    reply(undefined);
  });

  manager.register(ElectronEvents.CraftManagerGetOverlayMode, (reply) => {
    reply(OverlayWindow.getInstance().getIsOverlayOn());
  });

  manager.register(ElectronEvents.CraftManagerSetOverlayMode, (reply, isOverlayOn) => {
    OverlayWindow.getInstance().setIsOverlayOn(isOverlayOn);
    reply(undefined);
  });
};
