import fs from "node:fs/promises";
import path from "node:path";
import { isErrnoException } from "src/types/utils";
import { WakfuData } from "../data";
import { WakfuItem } from "../data/item";
import { WakfuBreed } from "../types/breed";
import { WakfuEquipmentPosition } from "../types/itemType";
import type { WakfuLang } from "../types/utils";
import { isWakfuBuild, type TWakfuBuild, type TWakfuPreferences } from "./types";

const defaultWakfuPreferences: TWakfuPreferences = {
  mastery: {
    elementsPriority: [],
    backMastery: false,
    berserkMastery: false,
    criticalMastery: false,
    healingMastery: false,
    meleeMastery: false,
    rangeMastery: false,
  },
  resistance: {
    elementsPriority: [],
  },
};

export class WakfuBuild {
  private static readonly FolderPath = "builds";
  private static builds: WakfuBuild[] = [];
  private id: number;
  private lang: WakfuLang;
  private name: string = "Nouveau Build";
  private breed: WakfuBreed = WakfuBreed.Feca;
  private level: number = 1;
  private preferences: TWakfuPreferences = defaultWakfuPreferences;
  private items: WakfuItem[] = [];
  private timeout: NodeJS.Timeout | null = null;

  public static getBuilds(): WakfuBuild[] {
    return WakfuBuild.builds;
  }

  public static createBuild(lang: WakfuLang): WakfuBuild {
    const build = new WakfuBuild(Date.now(), lang);
    WakfuBuild.builds.push(build);
    return build;
  }

  public static async loadBuilds(lang: WakfuLang): Promise<WakfuBuild[]> {
    try {
      const builds: WakfuBuild[] = [];
      const files = await fs.readdir(WakfuBuild.FolderPath);
      for (const file of files) {
        if (file.endsWith(".json")) {
          const build = new WakfuBuild(Number(file), lang);
          await build.loadBuild();
          builds.push(build);
        }
      }
      return builds;
    } catch (error) {
      console.error("Error loading builds:", error);
      return [];
    }
  }

  private constructor(id: number, lang: WakfuLang) {
    this.id = id;
    this.lang = lang;
  }

  private saveBuild(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(async () => {
      try {
        const json = {
          name: this.name,
          breed: this.breed,
          level: this.level,
          preferences: this.preferences,
          items: this.items.map((item) => item.item),
        } satisfies TWakfuBuild;
        const filePath = path.join(WakfuBuild.FolderPath, `${this.id}.json`);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(json, null, 2));
      } catch (error) {
        console.error("Error saving build:", error);
      }
      this.timeout = null;
    }, 1000);
  }

  public async loadBuild(): Promise<void> {
    try {
      const data = await fs.readFile(path.join(WakfuBuild.FolderPath, `${this.id}.json`), "utf-8");
      const json = JSON.parse(data);
      if (isWakfuBuild(json)) {
        this.name = json.name;
        this.breed = json.breed;
        this.items = json.items.map((item) => new WakfuItem(item, this.lang));
      }
    } catch (error) {
      if (isErrnoException(error) && error.code === "ENOENT") {
        console.error("Build not found:", this.id, error);
      } else if (error instanceof SyntaxError) {
        console.error("Error parsing build JSON:", this.id, error);
      }
      console.error("Error loading build:", error);
    }
  }

  public getEquippedItems(): Record<WakfuEquipmentPosition, WakfuItem | null> {
    const equippedItems: Record<WakfuEquipmentPosition, WakfuItem | null> = {
      [WakfuEquipmentPosition.Head]: null,
      [WakfuEquipmentPosition.Back]: null,
      [WakfuEquipmentPosition.Neck]: null,
      [WakfuEquipmentPosition.Shoulders]: null,
      [WakfuEquipmentPosition.Chest]: null,
      [WakfuEquipmentPosition.Belt]: null,
      [WakfuEquipmentPosition.LeftHand]: null,
      [WakfuEquipmentPosition.RightHand]: null,
      [WakfuEquipmentPosition.Legs]: null,
      [WakfuEquipmentPosition.FirstWeapon]: null,
      [WakfuEquipmentPosition.SecondWeapon]: null,
      [WakfuEquipmentPosition.Accessory]: null,
      [WakfuEquipmentPosition.Pet]: null,
      [WakfuEquipmentPosition.Mount]: null,
    };
    const data = WakfuData.getInstance();
    const itemTypesMap = data.getItemTypesMap();
    for (const item of this.items) {
      const itemType = itemTypesMap.get(item.getItemType());
      if (itemType) {
        for (const position of itemType.equipmentPositions) {
          equippedItems[position] = item;
        }
      }
    }
    return equippedItems;
  }

  public unequipItem(position: WakfuEquipmentPosition): boolean {
    this.items = this.items.filter((item) => {
      const itemType = WakfuData.getInstance().getItemTypesMap().get(item.getItemType());
      return !itemType?.equipmentPositions.includes(position);
    });
    this.saveBuild();
    return true;
  }

  public equipItem(item: WakfuItem): boolean {
    const itemType = WakfuData.getInstance().getItemTypesMap().get(item.getItemType());
    if (!itemType || itemType.equipmentPositions.length === 0) {
      return false;
    }
    for (const position of itemType.equipmentPositions) {
      this.unequipItem(position);
    }
    this.items.push(item);
    this.saveBuild();
    return true;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getBreed(): WakfuBreed {
    return this.breed;
  }

  public setBreed(breed: WakfuBreed): void {
    this.breed = breed;
  }

  public getLevel(): number {
    return this.level;
  }

  public setLevel(level: number): void {
    this.level = level;
  }

  public getPreferences(): TWakfuPreferences {
    return this.preferences;
  }

  public setPreferences(preferences: TWakfuPreferences): void {
    this.preferences = preferences;
  }
}
