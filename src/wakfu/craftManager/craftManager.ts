import type { WakfuBaseItem } from "../items/base";
import { WakfuStore } from "../store";
import { FileHandler } from "../utils/FileHandler";
import type { TCraftedIngredientNode, TCraftedIngredientNodeRaw, TCraftItem, TWakfuCraftManagerRaw } from "./types";

const DefaultCraftManagerData: TWakfuCraftManagerRaw = {
  itemsToCraft: [],
};

export class WakfuCraftManager {
  private static instance: WakfuCraftManager | null = null;
  private fileHandler: FileHandler<TWakfuCraftManagerRaw>;
  private itemsToCraft: {
    item: WakfuBaseItem;
    quantity: number;
    craftedIngredients: Map<number, TCraftedIngredientNode>;
  }[] = [];

  private constructor() {
    this.fileHandler = new FileHandler<TWakfuCraftManagerRaw>("craftManager.json");
  }

  private serializeCraftedIngredientsMap(
    map: Map<number, TCraftedIngredientNode>,
  ): Record<number, TCraftedIngredientNodeRaw> {
    const result: Record<number, TCraftedIngredientNodeRaw> = {};
    for (const [key, value] of map.entries()) {
      result[key] = {
        itemId: value.itemId,
        isCrafted: value.isCrafted,
        children: this.serializeCraftedIngredientsMap(value.children),
      };
    }
    return result;
  }

  private deserializeCraftedIngredientsMap(
    record: Record<number, TCraftedIngredientNodeRaw>,
  ): Map<number, TCraftedIngredientNode> {
    const map = new Map<number, TCraftedIngredientNode>();
    for (const [key, value] of Object.entries(record)) {
      map.set(Number(key), {
        itemId: value.itemId,
        isCrafted: value.isCrafted,
        children: this.deserializeCraftedIngredientsMap(value.children),
      });
    }
    return map;
  }

  private findNodeByPath(
    rootMap: Map<number, TCraftedIngredientNode>,
    path: number[],
  ): Map<number, TCraftedIngredientNode> | null {
    let currentMap = rootMap;
    for (const id of path) {
      const node = currentMap.get(id);
      if (!node) {
        return null;
      }
      currentMap = node.children;
    }
    return currentMap;
  }

  private ensurePathExists(
    rootMap: Map<number, TCraftedIngredientNode>,
    path: number[],
  ): Map<number, TCraftedIngredientNode> {
    let currentMap = rootMap;
    for (const id of path) {
      let node = currentMap.get(id);
      if (!node) {
        node = {
          itemId: id,
          isCrafted: false,
          children: new Map(),
        };
        currentMap.set(id, node);
      }
      currentMap = node.children;
    }
    return currentMap;
  }

  public static async initialize() {
    if (!WakfuCraftManager.instance) {
      WakfuCraftManager.instance = new WakfuCraftManager();
      await WakfuCraftManager.instance.load();
    }
    return WakfuCraftManager.instance;
  }

  public static getInstance() {
    if (!WakfuCraftManager.instance) {
      throw new Error("WakfuCraftManager not initialized");
    }
    return WakfuCraftManager.instance;
  }

  private async load() {
    if (!(await this.fileHandler.exists())) {
      await this.fileHandler.write(DefaultCraftManagerData, true);
    }
    try {
      const result = await this.fileHandler.read();

      for (const itemData of result.itemsToCraft) {
        const item = WakfuStore.getInstance().getItemById(itemData.id);
        if (item) {
          this.itemsToCraft.push({
            item,
            quantity: itemData.quantity,
            craftedIngredients: itemData.craftedIngredients
              ? this.deserializeCraftedIngredientsMap(itemData.craftedIngredients)
              : new Map(),
          });
        }
      }
    } catch {
      this.itemsToCraft = [];
      await this.fileHandler.write(DefaultCraftManagerData, true);
    }
  }

  private save(skipTimeout: boolean = false) {
    return this.fileHandler.write(
      {
        itemsToCraft: this.itemsToCraft.map((item) => ({
          id: item.item.getId(),
          quantity: item.quantity,
          craftedIngredients: this.serializeCraftedIngredientsMap(item.craftedIngredients),
        })),
      },
      skipTimeout,
    );
  }

  public addItemToCraft(itemId: number) {
    const item = WakfuStore.getInstance().getItemById(itemId);
    if (!item) {
      throw new Error(`Item with ID ${itemId} not found`);
    }
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === itemId);
    if (itemToCraft) {
      itemToCraft.quantity += 1;
    } else {
      this.itemsToCraft.push({ item, quantity: 1, craftedIngredients: new Map() });
    }
    this.save();
  }

  public setItemQuantity(itemId: number, quantity: number) {
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === itemId);
    if (itemToCraft) {
      itemToCraft.quantity = quantity;
      this.save();
    }
  }

  public removeItemToCraft(itemId: number) {
    const index = this.itemsToCraft.findIndex((i) => i.item.getId() === itemId);
    if (index !== -1) {
      this.itemsToCraft.splice(index, 1);
      this.save();
    }
  }

  public getItemsToCraft() {
    return this.itemsToCraft;
  }

  public markIngredientAsCrafted(path: number[], ingredientId: number): void {
    if (path.length === 0) {
      throw new Error("Path cannot be empty");
    }

    const rootItemId = path[0];
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === rootItemId);
    if (!itemToCraft) {
      throw new Error(`Item with ID ${rootItemId} not found in craft list`);
    }

    const targetMap = this.ensurePathExists(itemToCraft.craftedIngredients, path.slice(1));

    let node = targetMap.get(ingredientId);
    if (!node) {
      node = {
        itemId: ingredientId,
        isCrafted: true,
        children: new Map(),
      };
      targetMap.set(ingredientId, node);
    } else {
      node.isCrafted = true;
    }

    this.save();
  }

  public unmarkIngredientAsCrafted(path: number[], ingredientId: number): void {
    if (path.length === 0) {
      throw new Error("Path cannot be empty");
    }

    const rootItemId = path[0];
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === rootItemId);
    if (!itemToCraft) {
      throw new Error(`Item with ID ${rootItemId} not found in craft list`);
    }

    const targetMap = this.findNodeByPath(itemToCraft.craftedIngredients, path.slice(1));
    if (!targetMap) {
      return;
    }

    const node = targetMap.get(ingredientId);
    if (node) {
      node.isCrafted = false;
    }

    this.save();
  }

  public isIngredientCrafted(path: number[], ingredientId: number): boolean {
    if (path.length === 0) {
      return false;
    }

    const rootItemId = path[0];
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === rootItemId);
    if (!itemToCraft) {
      return false;
    }

    const targetMap = this.findNodeByPath(itemToCraft.craftedIngredients, path.slice(1));
    if (!targetMap) {
      return false;
    }

    const node = targetMap.get(ingredientId);
    return node ? node.isCrafted : false;
  }

  public getCraftedIngredients(path: number[]): number[] {
    if (path.length === 0) {
      return [];
    }

    const rootItemId = path[0];
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === rootItemId);
    if (!itemToCraft) {
      return [];
    }

    const targetMap = this.findNodeByPath(itemToCraft.craftedIngredients, path.slice(1));
    if (!targetMap) {
      return [];
    }

    const craftedIds: number[] = [];
    for (const [id, node] of targetMap.entries()) {
      if (node.isCrafted) {
        craftedIds.push(id);
      }
    }

    return craftedIds;
  }

  public getItemsToCraftRecursivly(): TCraftItem[] {
    const processItem = (
      item: WakfuBaseItem,
      quantity: number,
      craftedIngredientsMap: Map<number, TCraftedIngredientNode>,
    ): TCraftItem => {
      const itemId = item.getId();
      const recipes = item.getRecipes();
      const recipesData = recipes.map((recipe) => {
        const recipeObj = {
          id: recipe.getId(),
          recipeCategory: recipe.getRecipeCategory().toObject(),
          level: recipe.getLevel(),
          ingredients: recipe.getIngredients().map((ingredient) => {
            const ingredientItem = ingredient.item;
            const ingredientId = ingredientItem.getId();
            const ingredientRecipes = ingredientItem.getRecipes();

            const ingredientNode = craftedIngredientsMap.get(ingredientId);
            const ingredientChildren = ingredientNode?.children || new Map<number, TCraftedIngredientNode>();

            if (ingredientRecipes.length > 0) {
              return processItem(ingredientItem, ingredient.quantity, ingredientChildren);
            }

            return {
              item: {
                ...ingredientItem.toObject(),
                recipes: [],
                isCrafted: ingredientNode?.isCrafted || false,
              },
              quantity: ingredient.quantity,
              craftedIngredients: this.serializeCraftedIngredientsMap(ingredientChildren),
            };
          }),
          result: {
            item: recipe.getResult().item.toObject(),
            quantity: recipe.getResult().quantity,
          },
        };

        return recipeObj;
      });

      const itemNode = craftedIngredientsMap.get(itemId);

      return {
        item: {
          ...item.toObject(),
          recipes: recipesData,
          isCrafted: itemNode?.isCrafted || false,
        },
        quantity,
        craftedIngredients: this.serializeCraftedIngredientsMap(craftedIngredientsMap),
      };
    };

    return this.itemsToCraft.map((itemToCraft) =>
      processItem(itemToCraft.item, itemToCraft.quantity, itemToCraft.craftedIngredients),
    );
  }
}
