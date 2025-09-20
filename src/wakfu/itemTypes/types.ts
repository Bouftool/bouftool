import type { TWakfuI18n } from "../utils/types";

export enum EnumWakfuItemType {
  Weapon = 100,
  AxeTwoHanded = 101,
  Ring = 103,
  WandOneHanded = 108,
  Equipment = 109,
  SwordOneHanded = 110,
  ShovelTwoHanded = 111,
  DaggerSecondHand = 112,
  StaffOneHanded = 113,
  HammerTwoHanded = 114,
  NeedleOneHanded = 115,
  BowTwoHanded = 117,
  Armor = 118,
  Amulet = 120,
  Boots = 119,
  Cloak = 132,
  Belt = 133,
  Helmet = 134,
  Breastplate = 136,
  Shoulders = 138,
  ShieldSecondHand = 189,
  SwordTwoHanded = 223,
  StaffTwoHanded = 253,
  CardOneHanded = 254,
  Creature = 420,
  OneHandedWeapon = 518,
  TwoHandedWeapon = 519,
  SecondHand = 520,
  Accessory = 521,
  Pet = 582,
  Mount = 611,
  Emblem = 646,
  Enchantment = 811,
  Sublimation = 812,
}

export enum EnumWakfuEquipmentPosition {
  Head = "HEAD",
  Back = "BACK",
  Neck = "NECK",
  Shoulders = "SHOULDERS",
  Chest = "CHEST",
  Belt = "BELT",
  LeftHand = "LEFT_HAND",
  RightHand = "RIGHT_HAND",
  Legs = "LEGS",
  SecondWeapon = "SECOND_WEAPON",
  FirstWeapon = "FIRST_WEAPON",
  Accessory = "ACCESSORY",
  Pet = "PET",
  Mount = "MOUNT",
}

export type TWakfuItemType = {
  id: EnumWakfuItemType;
  parentId?: EnumWakfuItemType;
  equipmentPositions: EnumWakfuEquipmentPosition[];
  equipmentDisabledPositions: EnumWakfuEquipmentPosition[];
  title?: TWakfuI18n;
};

export const isWakfuItemTypeId = (value: number): value is EnumWakfuItemType => {
  return Object.values(EnumWakfuItemType).includes(value as EnumWakfuItemType);
};

export const isWakfuEquipmentPosition = (value: string): value is EnumWakfuEquipmentPosition => {
  return Object.values(EnumWakfuEquipmentPosition).includes(value as EnumWakfuEquipmentPosition);
};
