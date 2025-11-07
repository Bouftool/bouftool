import type { WakfuItem } from "../items";
import { EnumWakfuRarity } from "../items/rarity";
import { EnumWakfuEquipmentPosition } from "../itemTypes/types";
import type { WakfuBuild } from "./build";

export enum EnumWakfuStuffConstraint {
  UniqueItem = "UniqueItem",
  UniqueEpic = "UniqueEpic",
  UniqueRelic = "UniqueRelic",
  Level = "Level",
}

export const WakfuStuffConstraints = {
  [EnumWakfuStuffConstraint.UniqueItem]: "Un seul exemplaire de cet objet peut être équipé.",
  [EnumWakfuStuffConstraint.UniqueEpic]: "Un seul objet épique peut être équipé.",
  [EnumWakfuStuffConstraint.UniqueRelic]: "Un seul objet relique peut être équipé.",
  [EnumWakfuStuffConstraint.Level]: "Vous n'avez pas le niveau requis pour équiper cet objet.",
};

export const WakfuStuffConstraintsCheckers = {
  [EnumWakfuStuffConstraint.UniqueItem]: (
    build: WakfuBuild,
    item: WakfuItem,
    position: EnumWakfuEquipmentPosition,
  ): boolean => {
    for (const equipPosition of Object.values(EnumWakfuEquipmentPosition)) {
      if (equipPosition === position) {
        continue;
      }
      const equipment = build.getEquippedItem(equipPosition);
      if (equipment?.getId() === item.getId()) {
        return false;
      }
    }
    return true;
  },
  [EnumWakfuStuffConstraint.UniqueEpic]: (
    build: WakfuBuild,
    item: WakfuItem,
    position: EnumWakfuEquipmentPosition,
  ): boolean => {
    if (item.getRarity() !== EnumWakfuRarity.Epic) {
      return true;
    }
    for (const equipPosition of Object.values(EnumWakfuEquipmentPosition)) {
      if (equipPosition === position) {
        continue;
      }
      const equipment = build.getEquippedItem(equipPosition);
      if (equipment?.getRarity() === EnumWakfuRarity.Epic) {
        return false;
      }
    }
    return true;
  },
  [EnumWakfuStuffConstraint.UniqueRelic]: (
    build: WakfuBuild,
    item: WakfuItem,
    position: EnumWakfuEquipmentPosition,
  ): boolean => {
    if (item.getRarity() !== EnumWakfuRarity.Relic) {
      return true;
    }
    for (const equipPosition of Object.values(EnumWakfuEquipmentPosition)) {
      if (equipPosition === position) {
        continue;
      }
      const equipment = build.getEquippedItem(equipPosition);
      if (equipment?.getRarity() === EnumWakfuRarity.Relic) {
        return false;
      }
    }
    return true;
  },
  [EnumWakfuStuffConstraint.Level]: (build: WakfuBuild, item: WakfuItem): boolean => {
    const buildLevel = build.getLevel();
    const itemLevel = item.getLevel();
    return buildLevel >= itemLevel;
  },
} as const satisfies Record<
  EnumWakfuStuffConstraint,
  (build: WakfuBuild, item: WakfuItem, position: EnumWakfuEquipmentPosition) => boolean
>;
