import type { EnumWakfuState } from "../states/types";

export enum EnumWakfuStat {
  HealthPoint = "HealthPoint",
  HealthPointByLevel = "HealthPointByLevel",
  HealingMastery = "HealingMastery",
  ActionPoint = "ActionPoint",
  MovementPoint = "MovementPoint",
  ElementalResistance = "ElementalResistance",
  FireResistance = "FireResistance",
  WaterResistance = "WaterResistance",
  EarthResistance = "EarthResistance",
  AirResistance = "AirResistance",
  RearResistance = "RearResistance",
  ElementalMastery = "ElementalMastery",
  ElementalMasteryByLevel = "ElementalMasteryByLevel",
  FireMastery = "FireMastery",
  EarthMastery = "EarthMastery",
  WaterMastery = "WaterMastery",
  AirMastery = "AirMastery",
  CriticalMastery = "CriticalMastery",
  CriticalHit = "CriticalHit",
  Range = "Range",
  Prospecting = "Prospecting",
  Wisdom = "Wisdom",
  Initiative = "Initiative",
  Lock = "Lock",
  Dodge = "Dodge",
  Willpower = "Willpower",
  RearMastery = "RearMastery",
  Control = "Control",
  WakfuPoint = "WakfuPoint",
  Block = "Block",
  CriticalResistance = "CriticalResistance",
  MeleeMastery = "MeleeMastery",
  DistanceMastery = "DistanceMastery",
  BerserkMastery = "BerserkMastery",
  PercentHealthPoint = "PercentHealthPoint",
  Barrier = "Barrier",
  HealingReceived = "HealingReceived",
  PercentHealthPointToArmor = "PercentHealthPointToArmor",
  DamageDealt = "DamageDealt",
  HealingDone = "HealingDone",
  Armor = "Armor",
  IndirectDamages = "IndirectDamages",
  ArmorGiven = "ArmorGiven",
  ArmorReceived = "ArmorReceived",
  HarvestBonusFarmer = "HarvestBonusFarmer",
  HarvestBonusLumberjack = "HarvestBonusLumberjack",
  HarvestBonusHerbalist = "HarvestBonusHerbalist",
  HarvestBonusMiner = "HarvestBonusMiner",
  HarvestBonusTrapper = "HarvestBonusTrapper",
  HarvestBonusFisherman = "HarvestBonusFisherman",
  HarvestBonus = "HarvestBonus",
  MasteryOneElement = "MasteryOneElement",
  MasteryTwoElements = "MasteryTwoElements",
  MasteryThreeElements = "MasteryThreeElements",
  ResistanceOneElement = "ResistanceOneElement",
  ResistanceTwoElements = "ResistanceTwoElements",
  ResistanceThreeElements = "ResistanceThreeElements",
  EliotropeRangeToMovement = "EliotropeRangeToMovement",
}

export type TWakfuStatElementalMastery =
  | EnumWakfuStat.FireMastery
  | EnumWakfuStat.WaterMastery
  | EnumWakfuStat.EarthMastery
  | EnumWakfuStat.AirMastery;
export type TWakfuStatElementalResistance =
  | EnumWakfuStat.FireResistance
  | EnumWakfuStat.WaterResistance
  | EnumWakfuStat.EarthResistance
  | EnumWakfuStat.AirResistance;
export type TElementalPreferences = [
  TWakfuStatElementalMastery,
  TWakfuStatElementalMastery,
  TWakfuStatElementalMastery,
  TWakfuStatElementalMastery,
];

export const isWakfuStat = (stat: unknown): stat is EnumWakfuStat => {
  return Object.values(EnumWakfuStat).includes(stat as EnumWakfuStat);
};

export type TWakfuStats = Partial<{
  [Key in EnumWakfuStat | EnumWakfuState]: number;
}>;
