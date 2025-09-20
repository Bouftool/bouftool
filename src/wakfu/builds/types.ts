import type { TWakfuAbilities } from "../abilities/types";
import type { EnumWakfuBreed } from "../breed/types";
import type { WakfuItem } from "../items";
import type { EnumWakfuEquipmentPosition } from "../itemTypes/types";
import type { TElementalPreferences, TWakfuStats } from "../stats/types";
import type { EnumWakfuStatsBonuses } from "./bonus";

export type TWakfuCharacterDisplay = {
  id: string;
  name: string;
  breed: EnumWakfuBreed;
  builds: TWakfuBuildMinimalDisplay[];
};

export type TWakfuCharacterRaw = {
  id: string;
  name: string;
  breed: EnumWakfuBreed;
};

export type TWakfuBuildEquipment = {
  preferences: TElementalPreferences | null;
  item: WakfuItem | null;
  disabled: number;
};

export type TWakfuBuildStuff = {
  [K in EnumWakfuEquipmentPosition]: TWakfuBuildEquipment;
};

export type TWakfuBuildStuffDisplay = {
  [K in EnumWakfuEquipmentPosition]: {
    item: ReturnType<typeof WakfuItem.prototype.toObject> | null;
    disabled: boolean;
  };
};

export type TWakfuBuildMinimalDisplay = {
  id: string;
  name: string;
  level: number;
  stuff: TWakfuBuildStuffDisplay;
};

export type TWakfuBuildDisplay = {
  id: string;
  characterId: string;
  characterName: string;
  characterBreed: EnumWakfuBreed;
  name: string;
  level: number;
  abilities: TWakfuAbilities;
  bonuses: Record<EnumWakfuStatsBonuses, boolean>;
  elementalPreferences: TElementalPreferences;
  stuff: TWakfuBuildStuffDisplay;
  stats: TWakfuStats;
};

export type TWakfuBuildRaw = {
  id: string;
  name: string;
  level: number;
  abilities: TWakfuAbilities;
  stuff: {
    [K in EnumWakfuEquipmentPosition]: {
      preferences: TElementalPreferences | null;
      item: number | null;
      disabled: number;
    };
  };
  elementalPreferences: TElementalPreferences;
  bonuses: Record<EnumWakfuStatsBonuses, boolean>;
};
