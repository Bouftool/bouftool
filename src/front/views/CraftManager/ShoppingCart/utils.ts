import type { TCraftItem } from "src/wakfu/craftManager/types";
import type { ShoppingCartItem } from "./types";

export const extractItemsWithoutRecipe = (craftItems: TCraftItem[]): ShoppingCartItem[] => {
  const itemsMap = new Map<number, ShoppingCartItem>();

  const processItem = (craftItem: TCraftItem) => {
    const { item, quantity } = craftItem;

    if (item.isCrafted) {
      return;
    }

    if (item.recipes.length === 0) {
      const existingItem = itemsMap.get(item.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        itemsMap.set(item.id, { item, quantity });
      }
    } else {
      for (const ingredient of item.recipes[craftItem.selectedRecipeIndex].ingredients) {
        processItem(ingredient);
      }
    }
  };

  for (const craftItem of craftItems) {
    processItem(craftItem);
  }

  //TODO: voir en fonction de la langue i18n
  return Array.from(itemsMap.values()).sort((a, b) => a.item.title.fr.localeCompare(b.item.title.fr));
};
