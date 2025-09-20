import type { FromSchema } from "json-schema-to-ts";
import type { WakfuActionSchema } from "./resolvers/action";
import type { WakfuBlueprintSchema } from "./resolvers/blueprint";
import type { WakfuCollectibleResourceSchema } from "./resolvers/collectibleResource";
import type { WakfuEquipmentItemTypeSchema } from "./resolvers/equipmentItemType";
import type { WakfuHarvestLootSchema } from "./resolvers/harvestLoot";
import type { WakfuItemSchema } from "./resolvers/item";
import type { WakfuItemPropertySchema } from "./resolvers/itemProperty";
import type { WakfuItemTypeSchema } from "./resolvers/itemType";
import type { WakfuJobItemSchema } from "./resolvers/jobItem";
import type { WakfuRecipeSchema } from "./resolvers/recipe";
import type { WakfuRecipeCategorySchema } from "./resolvers/recipeCategory";
import type { WakfuRecipeIngredientSchema } from "./resolvers/recipeIngredient";
import type { WakfuRecipeResultSchema } from "./resolvers/recipeResult";
import type { WakfuResourceSchema } from "./resolvers/resource";
import type { WakfuResourceTypeSchema } from "./resolvers/resourceType";
import type { WakfuStateSchema } from "./resolvers/state";

export enum EnumWakfuGamedataType {
  Actions = "actions",
  Blueprints = "blueprints",
  CollectibleResources = "collectibleResources",
  EquipmentItemTypes = "equipmentItemTypes",
  HarvestLoots = "harvestLoots",
  ItemTypes = "itemTypes",
  ItemProperties = "itemProperties",
  Items = "items",
  JobsItems = "jobsItems",
  RecipeCategories = "recipeCategories",
  RecipeIngredients = "recipeIngredients",
  RecipeResults = "recipeResults",
  Recipes = "recipes",
  ResourceTypes = "resourceTypes",
  Resources = "resources",
  States = "states",
}

export type TWakfuGamedataTypes = {
  [EnumWakfuGamedataType.Actions]: FromSchema<typeof WakfuActionSchema>;
  [EnumWakfuGamedataType.Blueprints]: FromSchema<typeof WakfuBlueprintSchema>;
  [EnumWakfuGamedataType.CollectibleResources]: FromSchema<typeof WakfuCollectibleResourceSchema>;
  [EnumWakfuGamedataType.EquipmentItemTypes]: FromSchema<typeof WakfuEquipmentItemTypeSchema>;
  [EnumWakfuGamedataType.HarvestLoots]: FromSchema<typeof WakfuHarvestLootSchema>;
  [EnumWakfuGamedataType.ItemTypes]: FromSchema<typeof WakfuItemTypeSchema>;
  [EnumWakfuGamedataType.ItemProperties]: FromSchema<typeof WakfuItemPropertySchema>;
  [EnumWakfuGamedataType.Items]: FromSchema<typeof WakfuItemSchema>;
  [EnumWakfuGamedataType.JobsItems]: FromSchema<typeof WakfuJobItemSchema>;
  [EnumWakfuGamedataType.RecipeCategories]: FromSchema<typeof WakfuRecipeCategorySchema>;
  [EnumWakfuGamedataType.RecipeIngredients]: FromSchema<typeof WakfuRecipeIngredientSchema>;
  [EnumWakfuGamedataType.RecipeResults]: FromSchema<typeof WakfuRecipeResultSchema>;
  [EnumWakfuGamedataType.Recipes]: FromSchema<typeof WakfuRecipeSchema>;
  [EnumWakfuGamedataType.ResourceTypes]: FromSchema<typeof WakfuResourceTypeSchema>;
  [EnumWakfuGamedataType.Resources]: FromSchema<typeof WakfuResourceSchema>;
  [EnumWakfuGamedataType.States]: FromSchema<typeof WakfuStateSchema>;
};

export type TPickWakfuGamedata<GamedataTypes extends EnumWakfuGamedataType[] | readonly EnumWakfuGamedataType[]> = {
  [Key in GamedataTypes[number]]: TWakfuGamedataTypes[Key][];
};
