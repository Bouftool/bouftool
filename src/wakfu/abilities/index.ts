import { WakfuStats } from "../stats";
import { AbilitiesDefinitions } from "./abilities";
import { EnumAbilities, type TWakfuAbilities } from "./types";
import { getAbilityCategory, getCurrentAbilitiesCategoryPoints } from "./utils";

export class WakfuAbilities {
  private level: number;
  private abilities: TWakfuAbilities;

  public static toAbilitiesCode(abilities: TWakfuAbilities): string {
    let code = "";
    for (const ability of Object.values(EnumAbilities)) {
      if (abilities[ability] && abilities[ability] > 0) {
        const definition = AbilitiesDefinitions[ability];
        if (code.length > 0) {
          code += "-";
        }
        code += `${definition.id}:${abilities[ability]}`;
      }
    }
    return code;
  }

  public static fromAbilitiesCode(code: string): TWakfuAbilities {
    const abilities: TWakfuAbilities = {};
    const parts = code.split("-");
    for (const part of parts) {
      const [idStr, levelStr] = part.split(":");
      const id = parseInt(idStr, 10);
      const abilityLevel = parseInt(levelStr, 10);
      const abilityEnum = Object.values(EnumAbilities).find((ability) => AbilitiesDefinitions[ability].id === id);
      if (abilityEnum) {
        abilities[abilityEnum] = abilityLevel;
      }
    }
    return abilities;
  }

  constructor(level: number, abilities?: TWakfuAbilities) {
    this.level = level;
    this.abilities = abilities ?? {};
  }

  public setLevel(level: number): void {
    this.level = level;
  }

  public addAbilityLevel(ability: EnumAbilities, level: number): void {
    const category = getAbilityCategory(ability);
    if (!category) {
      return;
    }
    const availablePoints = getCurrentAbilitiesCategoryPoints(this.abilities, category, this.level);
    const realLevels = Math.min(availablePoints, level);
    const value = (this.abilities[ability] ?? 0) + realLevels;
    this.abilities[ability] =
      AbilitiesDefinitions[ability].maxLevel > 0 ? Math.min(value, AbilitiesDefinitions[ability].maxLevel) : value;
  }

  public removeAbilityLevel(ability: EnumAbilities, level: number): void {
    this.abilities[ability] = Math.max(0, (this.abilities[ability] ?? 0) - level);
  }

  public setAbilitiesFromCode(abilitiesCode: string): void {
    this.abilities = WakfuAbilities.fromAbilitiesCode(abilitiesCode);
  }

  public resetAbilities(): void {
    this.abilities = {};
  }

  public getAbilities(): TWakfuAbilities {
    return this.abilities;
  }

  public getStats() {
    const stats = new WakfuStats();
    for (const abilities of Object.values(EnumAbilities)) {
      const level = this.abilities[abilities] ?? 0;
      const definition = AbilitiesDefinitions[abilities];
      for (const effect of definition.effects) {
        stats.add(effect.stat, effect.scaling * level);
      }
    }
    return stats;
  }
}
