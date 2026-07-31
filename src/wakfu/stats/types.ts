import type { EnumWakfuState } from "../states/types";

export const EnumWakfuStat = {
  HealthPoint: "HealthPoint",
  HealthPointByLevel: "HealthPointByLevel",
  HealingMastery: "HealingMastery",
  ActionPoint: "ActionPoint",
  MovementPoint: "MovementPoint",
  ElementalResistance: "ElementalResistance",
  FireResistance: "FireResistance",
  WaterResistance: "WaterResistance",
  EarthResistance: "EarthResistance",
  AirResistance: "AirResistance",
  RearResistance: "RearResistance",
  ElementalMastery: "ElementalMastery",
  ElementalMasteryByLevel: "ElementalMasteryByLevel",
  FireMastery: "FireMastery",
  EarthMastery: "EarthMastery",
  WaterMastery: "WaterMastery",
  AirMastery: "AirMastery",
  CriticalMastery: "CriticalMastery",
  CriticalHit: "CriticalHit",
  Range: "Range",
  Prospecting: "Prospecting",
  Wisdom: "Wisdom",
  Initiative: "Initiative",
  Lock: "Lock",
  Dodge: "Dodge",
  Willpower: "Willpower",
  RearMastery: "RearMastery",
  Control: "Control",
  WakfuPoint: "WakfuPoint",
  Block: "Block",
  CriticalResistance: "CriticalResistance",
  MeleeMastery: "MeleeMastery",
  DistanceMastery: "DistanceMastery",
  BerserkMastery: "BerserkMastery",
  PercentHealthPoint: "PercentHealthPoint",
  Barrier: "Barrier",
  HealingReceived: "HealingReceived",
  PercentHealthPointToArmor: "PercentHealthPointToArmor",
  DamageDealt: "DamageDealt",
  HealingDone: "HealingDone",
  Armor: "Armor",
  IndirectDamages: "IndirectDamages",
  ArmorGiven: "ArmorGiven",
  ArmorReceived: "ArmorReceived",
  HarvestBonusFarmer: "HarvestBonusFarmer",
  HarvestBonusLumberjack: "HarvestBonusLumberjack",
  HarvestBonusHerbalist: "HarvestBonusHerbalist",
  HarvestBonusMiner: "HarvestBonusMiner",
  HarvestBonusTrapper: "HarvestBonusTrapper",
  HarvestBonusFisherman: "HarvestBonusFisherman",
  HarvestBonus: "HarvestBonus",
  MasteryOneElement: "MasteryOneElement",
  MasteryTwoElements: "MasteryTwoElements",
  MasteryThreeElements: "MasteryThreeElements",
  ResistanceOneElement: "ResistanceOneElement",
  ResistanceTwoElements: "ResistanceTwoElements",
  ResistanceThreeElements: "ResistanceThreeElements",
  EliotropeRangeToMovement: "EliotropeRangeToMovement",
} as const;

export type EnumWakfuStat = (typeof EnumWakfuStat)[keyof typeof EnumWakfuStat];

const WakfuStats = new Set<string>(Object.values(EnumWakfuStat));

export type TWakfuStatElementalMastery =
  | (typeof EnumWakfuStat)["FireMastery"]
  | (typeof EnumWakfuStat)["WaterMastery"]
  | (typeof EnumWakfuStat)["EarthMastery"]
  | (typeof EnumWakfuStat)["AirMastery"];
export type TWakfuStatElementalResistance =
  | (typeof EnumWakfuStat)["FireResistance"]
  | (typeof EnumWakfuStat)["WaterResistance"]
  | (typeof EnumWakfuStat)["EarthResistance"]
  | (typeof EnumWakfuStat)["AirResistance"];
export type TWakfuStatRangeMastery = (typeof EnumWakfuStat)["MeleeMastery"] | (typeof EnumWakfuStat)["DistanceMastery"];
export type TWakfuStatSubMastery =
  | (typeof EnumWakfuStat)["CriticalMastery"]
  | (typeof EnumWakfuStat)["RearMastery"]
  | (typeof EnumWakfuStat)["BerserkMastery"]
  | (typeof EnumWakfuStat)["HealingMastery"];
export type TElementalPreferences = [
  TWakfuStatElementalMastery,
  TWakfuStatElementalMastery,
  TWakfuStatElementalMastery,
  TWakfuStatElementalMastery,
];

export const isWakfuStat = (stat: unknown): stat is EnumWakfuStat => {
  return typeof stat === "string" && WakfuStats.has(stat);
};

export const isWakfuStatElementalMastery = (stat: unknown): stat is TWakfuStatElementalMastery => {
  return (
    stat === EnumWakfuStat.FireMastery ||
    stat === EnumWakfuStat.WaterMastery ||
    stat === EnumWakfuStat.EarthMastery ||
    stat === EnumWakfuStat.AirMastery
  );
};

export type TWakfuStats = Partial<{
  [Key in EnumWakfuStat | EnumWakfuState]: number;
}>;
