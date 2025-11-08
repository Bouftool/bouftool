import type { TCraftItem } from "src/wakfu/craftManager/types";

export type ShoppingCartItem = {
  item: TCraftItem["item"];
  quantity: number;
};
