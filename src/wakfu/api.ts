import { isArray, isObject, isString } from "src/types/utils";

const VersionUrl = "https://wakfu.cdn.ankama.com/gamedata/config.json";
const GamedataUrl = "https://wakfu.cdn.ankama.com/gamedata/{version}/{type}.json";

export enum WakfuGamedataTypes {
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

export const fetchWakfuGamedataVersion = async (): Promise<string> => {
  const response = await fetch(VersionUrl);
  const data = await response.json();
  if (isObject(data) && "version" in data && isString(data.version)) {
    return data.version;
  }
  throw new Error("WakfuAPI: Invalid version response");
};

export const fetchWakfuGamedata = async <T>(
  version: string,
  type: string,
  transform: (item: unknown) => T,
): Promise<T[]> => {
  const response = await fetch(GamedataUrl.replace("{version}", version).replace("{type}", type));
  const data = await response.json();
  if (isArray(data)) {
    return data.map(transform);
  }
  throw new Error("WakfuAPI: Invalid gamedata response");
};
