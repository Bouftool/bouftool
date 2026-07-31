import Ajv from "ajv";
import { isArray } from "src/types/utils";
import { WakfuGamedataSchemas } from "../resolvers";
import { EnumWakfuGamedataType, type TWakfuGamedataTypes, type TWakfuStoreGamedata } from "../types";

export class WakfuAPI {
  private static readonly VersionUrl = "https://wakfu.cdn.ankama.com/gamedata/config.json";
  private static readonly GamedataUrl = "https://wakfu.cdn.ankama.com/gamedata/{version}/{type}.json";
  private readonly ajv = new Ajv();

  private static async fetchData(url: string) {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  public static async fetchVersion(): Promise<string> {
    const data = await WakfuAPI.fetchData(WakfuAPI.VersionUrl);
    if (data && typeof data === "object" && "version" in data && typeof data.version === "string") {
      return data.version;
    } else {
      throw new Error("Invalid version data");
    }
  }

  private async fetchGamedataByType<Type extends EnumWakfuGamedataType>(
    type: Type,
    version: string,
  ): Promise<TWakfuGamedataTypes[Type][]> {
    const url = WakfuAPI.GamedataUrl.replace("{version}", version).replace("{type}", type);
    const data = await WakfuAPI.fetchData(url);
    const validator = this.ajv.compile<TWakfuGamedataTypes[Type]>(WakfuGamedataSchemas[type]);
    if (!isArray(data)) {
      throw new Error(`Invalid data for ${type}`);
    }
    const result: TWakfuGamedataTypes[Type][] = [];
    for (const item of data) {
      if (!validator(item)) {
        console.error("Validation errors for item:", item, validator.errors);
        throw new Error(`Invalid data for ${type}`);
      }
      result.push(item);
    }
    return result;
  }

  public async getGamedata(): Promise<{
    version: string;
    gamedata: TWakfuStoreGamedata;
  }> {
    const version = await WakfuAPI.fetchVersion();
    const gamedata: TWakfuStoreGamedata = {
      itemTypes: await this.fetchGamedataByType(EnumWakfuGamedataType.ItemTypes, version),
      equipmentItemTypes: await this.fetchGamedataByType(EnumWakfuGamedataType.EquipmentItemTypes, version),
      items: await this.fetchGamedataByType(EnumWakfuGamedataType.Items, version),
      jobsItems: await this.fetchGamedataByType(EnumWakfuGamedataType.JobsItems, version),
      recipeCategories: await this.fetchGamedataByType(EnumWakfuGamedataType.RecipeCategories, version),
      recipes: await this.fetchGamedataByType(EnumWakfuGamedataType.Recipes, version),
      recipeIngredients: await this.fetchGamedataByType(EnumWakfuGamedataType.RecipeIngredients, version),
      recipeResults: await this.fetchGamedataByType(EnumWakfuGamedataType.RecipeResults, version),
    };
    return {
      version,
      gamedata,
    };
  }
}
