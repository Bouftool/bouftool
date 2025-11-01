import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { EnumWakfuBreed } from "../breed/types";
import { FileHandler } from "../utils/FileHandler";
import { WakfuBuild } from "./build";
import type { TWakfuCharacterDisplay, TWakfuCharacterRaw } from "./types";

export class WakfuCharacter {
  private static CharactersMap: Map<string, WakfuCharacter> = new Map();
  public static CharactersDir = "characters";
  private id: string;
  private name: string;
  private breed: EnumWakfuBreed;
  private builds: WakfuBuild[];
  private fileHandler: FileHandler<TWakfuCharacterRaw>;

  public static async create(name: string, breed: EnumWakfuBreed) {
    const id = randomUUID();
    const character = new WakfuCharacter(id, name, breed);
    await character.save(true);
    return character;
  }

  public static async loadCharacters() {
    try {
      const files = await fs.readdir(WakfuCharacter.CharactersDir, { withFileTypes: true });
      for (const file of files) {
        if (file.isDirectory()) {
          const character = new WakfuCharacter(file.name, "", EnumWakfuBreed.Feca);
          await character.load();
        }
      }
    } catch (_error) {
      console.warn(`No characters found to load in ${WakfuCharacter.CharactersDir}`);
    }
  }

  public static getById(characterId: string) {
    return WakfuCharacter.CharactersMap.get(characterId) ?? null;
  }

  public static getCharactersToDisplay(): TWakfuCharacterDisplay[] {
    return Array.from(WakfuCharacter.CharactersMap.values(), (character) => character.toDisplay());
  }

  private constructor(id: string, name: string, breed: EnumWakfuBreed) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.builds = [];
    this.fileHandler = new FileHandler<TWakfuCharacterRaw>(
      path.join(WakfuCharacter.CharactersDir, this.id, "character.json"),
    );
    WakfuCharacter.CharactersMap.set(this.id, this);
  }

  private async save(skipTimeout: boolean = false) {
    const content: TWakfuCharacterRaw = {
      id: this.id,
      name: this.name,
      breed: this.breed,
    };
    await this.fileHandler.write(content, skipTimeout);
  }

  private async load() {
    const content = await this.fileHandler.read();
    const { id, name, breed } = content;
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.builds = await WakfuBuild.loadBuilds(this);
  }

  private async delete() {
    for (const build of this.builds) {
      build.delete();
    }
    WakfuCharacter.CharactersMap.delete(this.id);
    await fs.rm(path.join(WakfuCharacter.CharactersDir, this.id), { recursive: true, force: true });
  }

  public deleteBuild(buildId: string) {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.delete();
    this.builds = this.builds.filter((build) => build.getId() !== buildId);
    if (this.builds.length === 0) {
      this.delete();
    }
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getBreed() {
    return this.breed;
  }

  public setName(name: string) {
    this.name = name;
    this.save();
  }

  public setBreed(breed: EnumWakfuBreed) {
    this.breed = breed;
    this.save();
  }

  public toDisplay(): TWakfuCharacterDisplay {
    return {
      id: this.getId(),
      name: this.getName(),
      breed: this.getBreed(),
      builds: this.builds.map((build) => build.toMinimalDisplay()).sort((a, b) => a.level - b.level),
    };
  }
}
