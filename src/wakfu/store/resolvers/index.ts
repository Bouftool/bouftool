import type { JSONSchema } from "json-schema-to-ts";
import { EnumWakfuGamedataType } from "../types";
import { WakfuActionSchema } from "./action";
import { WakfuBlueprintSchema } from "./blueprint";
import { WakfuCollectibleResourceSchema } from "./collectibleResource";
import { WakfuEquipmentItemTypeSchema } from "./equipmentItemType";
import { WakfuHarvestLootSchema } from "./harvestLoot";
import { WakfuItemSchema } from "./item";
import { WakfuItemPropertySchema } from "./itemProperty";
import { WakfuItemTypeSchema } from "./itemType";
import { WakfuJobItemSchema } from "./jobItem";
import { WakfuRecipeSchema } from "./recipe";
import { WakfuRecipeCategorySchema } from "./recipeCategory";
import { WakfuRecipeIngredientSchema } from "./recipeIngredient";
import { WakfuRecipeResultSchema } from "./recipeResult";
import { WakfuResourceSchema } from "./resource";
import { WakfuResourceTypeSchema } from "./resourceType";
import { WakfuStateSchema } from "./state";

export const WakfuGamedataSchemas = {
  [EnumWakfuGamedataType.Actions]: WakfuActionSchema,
  [EnumWakfuGamedataType.Blueprints]: WakfuBlueprintSchema,
  [EnumWakfuGamedataType.CollectibleResources]: WakfuCollectibleResourceSchema,
  [EnumWakfuGamedataType.EquipmentItemTypes]: WakfuEquipmentItemTypeSchema,
  [EnumWakfuGamedataType.HarvestLoots]: WakfuHarvestLootSchema,
  [EnumWakfuGamedataType.ItemTypes]: WakfuItemTypeSchema,
  [EnumWakfuGamedataType.ItemProperties]: WakfuItemPropertySchema,
  [EnumWakfuGamedataType.Items]: WakfuItemSchema,
  [EnumWakfuGamedataType.JobsItems]: WakfuJobItemSchema,
  [EnumWakfuGamedataType.RecipeCategories]: WakfuRecipeCategorySchema,
  [EnumWakfuGamedataType.RecipeIngredients]: WakfuRecipeIngredientSchema,
  [EnumWakfuGamedataType.RecipeResults]: WakfuRecipeResultSchema,
  [EnumWakfuGamedataType.Recipes]: WakfuRecipeSchema,
  [EnumWakfuGamedataType.ResourceTypes]: WakfuResourceTypeSchema,
  [EnumWakfuGamedataType.Resources]: WakfuResourceSchema,
  [EnumWakfuGamedataType.States]: WakfuStateSchema,
} as const satisfies Record<EnumWakfuGamedataType, JSONSchema>;
