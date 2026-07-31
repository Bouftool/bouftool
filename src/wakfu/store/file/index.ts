import fs from "node:fs/promises";
import path from "node:path";
import Ajv from "ajv";
import { isArray } from "src/types/utils";
import { resolvePath } from "src/wakfu/utils/PathManager";
import { WakfuGamedataSchemas } from "../resolvers";
import { EnumWakfuGamedataType, type TWakfuGamedataTypes, type TWakfuStoreGamedata } from "../types";

export class WakfuFile {
  private static readonly FolderPath = "gamedata";
  private readonly ajv = new Ajv();

  private async readData(filePath: string) {
    try {
      const data = await fs.readFile(resolvePath(filePath), "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading data:", error);
    }
  }

  private async readVersion(): Promise<string> {
    const data = await this.readData(path.join(WakfuFile.FolderPath, "version.json"));
    if (data && typeof data === "object" && "version" in data && typeof data.version === "string") {
      return data.version;
    } else {
      throw new Error("Invalid version data");
    }
  }

  private async readGamedataByType<Type extends EnumWakfuGamedataType>(
    type: Type,
  ): Promise<TWakfuGamedataTypes[Type][]> {
    const filePath = path.join(WakfuFile.FolderPath, `${type}.json`);
    const data = await this.readData(filePath);
    const validator = this.ajv.compile<TWakfuGamedataTypes[Type]>(WakfuGamedataSchemas[type]);
    if (!isArray(data)) {
      throw new Error(`Invalid data for ${type}`);
    }
    const result: TWakfuGamedataTypes[Type][] = [];
    for (const item of data) {
      if (!validator(item)) {
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
    const version = await this.readVersion();
    const gamedata: TWakfuStoreGamedata = {
      itemTypes: await this.readGamedataByType(EnumWakfuGamedataType.ItemTypes),
      equipmentItemTypes: await this.readGamedataByType(EnumWakfuGamedataType.EquipmentItemTypes),
      items: await this.readGamedataByType(EnumWakfuGamedataType.Items),
      jobsItems: await this.readGamedataByType(EnumWakfuGamedataType.JobsItems),
      recipeCategories: await this.readGamedataByType(EnumWakfuGamedataType.RecipeCategories),
      recipes: await this.readGamedataByType(EnumWakfuGamedataType.Recipes),
      recipeIngredients: await this.readGamedataByType(EnumWakfuGamedataType.RecipeIngredients),
      recipeResults: await this.readGamedataByType(EnumWakfuGamedataType.RecipeResults),
    };
    return {
      version,
      gamedata,
    };
  }

  public async saveGamedata(version: string, gamedata: TWakfuStoreGamedata) {
    await fs.mkdir(resolvePath(WakfuFile.FolderPath), { recursive: true });
    await fs.writeFile(resolvePath(WakfuFile.FolderPath, "version.json"), JSON.stringify({ version }, null, 2), {
      encoding: "utf-8",
    });
    for (const [type, data] of Object.entries(gamedata)) {
      await fs.writeFile(resolvePath(WakfuFile.FolderPath, `${type}.json`), JSON.stringify(data, null, 2), {
        encoding: "utf-8",
      });
    }
  }
}
