import { EnumWakfuStat } from "../stats/types";
import { EnumAbilities, type TAbilitiesEffect } from "./types";

export const AbilitiesDefinitions: Record<
  EnumAbilities,
  { id: number; effects: TAbilitiesEffect[]; maxLevel: number }
> = {
  [EnumAbilities.PercentHp]: { id: 1, effects: [{ stat: EnumWakfuStat.PercentHealthPoint, scaling: 4 }], maxLevel: 0 },
  [EnumAbilities.Resistance]: {
    id: 16,
    effects: [{ stat: EnumWakfuStat.ElementalResistance, scaling: 10 }],
    maxLevel: 10,
  },
  [EnumAbilities.Barrier]: {
    id: 17,
    effects: [
      {
        stat: EnumWakfuStat.Barrier,
        scaling: 1,
      },
    ],
    maxLevel: 10,
  },
  [EnumAbilities.HealingReceived]: {
    id: 27,
    effects: [{ stat: EnumWakfuStat.HealingReceived, scaling: 6 }],
    maxLevel: 5,
  },
  [EnumAbilities.PercentHpToArmor]: {
    id: 36,
    effects: [{ stat: EnumWakfuStat.PercentHealthPointToArmor, scaling: 4 }],
    maxLevel: 0,
  },
  [EnumAbilities.Mastery]: { id: 23, effects: [{ stat: EnumWakfuStat.ElementalMastery, scaling: 5 }], maxLevel: 0 },
  [EnumAbilities.MeleeMastery]: { id: 26, effects: [{ stat: EnumWakfuStat.MeleeMastery, scaling: 8 }], maxLevel: 40 },
  [EnumAbilities.RangeMastery]: {
    id: 30,
    effects: [{ stat: EnumWakfuStat.DistanceMastery, scaling: 8 }],
    maxLevel: 40,
  },
  [EnumAbilities.Hp]: { id: 31, effects: [{ stat: EnumWakfuStat.HealthPoint, scaling: 20 }], maxLevel: 0 },
  [EnumAbilities.Lock]: { id: 18, effects: [{ stat: EnumWakfuStat.Lock, scaling: 6 }], maxLevel: 0 },
  [EnumAbilities.Dodge]: { id: 19, effects: [{ stat: EnumWakfuStat.Dodge, scaling: 6 }], maxLevel: 0 },
  [EnumAbilities.Initiative]: { id: 20, effects: [{ stat: EnumWakfuStat.Initiative, scaling: 4 }], maxLevel: 20 },
  [EnumAbilities.LockAndDodge]: {
    id: 21,
    effects: [
      { stat: EnumWakfuStat.Lock, scaling: 4 },
      { stat: EnumWakfuStat.Dodge, scaling: 4 },
    ],
    maxLevel: 0,
  },
  [EnumAbilities.Willpower]: { id: 37, effects: [{ stat: EnumWakfuStat.Willpower, scaling: 1 }], maxLevel: 20 },
  [EnumAbilities.CriticalRate]: { id: 9, effects: [{ stat: EnumWakfuStat.CriticalHit, scaling: 1 }], maxLevel: 20 },
  [EnumAbilities.Block]: { id: 10, effects: [{ stat: EnumWakfuStat.Block, scaling: 1 }], maxLevel: 20 },
  [EnumAbilities.CriticalMastery]: {
    id: 11,
    effects: [{ stat: EnumWakfuStat.CriticalMastery, scaling: 4 }],
    maxLevel: 0,
  },
  [EnumAbilities.BackMastery]: { id: 12, effects: [{ stat: EnumWakfuStat.RearMastery, scaling: 6 }], maxLevel: 0 },
  [EnumAbilities.BerserkMastery]: {
    id: 13,
    effects: [{ stat: EnumWakfuStat.BerserkMastery, scaling: 8 }],
    maxLevel: 0,
  },
  [EnumAbilities.HealingMastery]: {
    id: 14,
    effects: [{ stat: EnumWakfuStat.HealingMastery, scaling: 6 }],
    maxLevel: 0,
  },
  [EnumAbilities.BackResistance]: {
    id: 15,
    effects: [{ stat: EnumWakfuStat.RearResistance, scaling: 4 }],
    maxLevel: 20,
  },
  [EnumAbilities.CriticalResistance]: {
    id: 34,
    effects: [{ stat: EnumWakfuStat.CriticalResistance, scaling: 4 }],
    maxLevel: 20,
  },
  [EnumAbilities.Ap]: { id: 2, effects: [{ stat: EnumWakfuStat.ActionPoint, scaling: 1 }], maxLevel: 1 },
  [EnumAbilities.MpAndMastery]: {
    id: 3,
    effects: [
      { stat: EnumWakfuStat.MovementPoint, scaling: 1 },
      { stat: EnumWakfuStat.ElementalMastery, scaling: 20 },
    ],
    maxLevel: 1,
  },
  [EnumAbilities.RangeAndMastery]: {
    id: 4,
    effects: [
      { stat: EnumWakfuStat.Range, scaling: 1 },
      { stat: EnumWakfuStat.ElementalMastery, scaling: 40 },
    ],
    maxLevel: 1,
  },
  [EnumAbilities.Wp]: { id: 5, effects: [{ stat: EnumWakfuStat.WakfuPoint, scaling: 2 }], maxLevel: 1 },
  [EnumAbilities.ControlAndMastery]: {
    id: 6,
    effects: [
      { stat: EnumWakfuStat.Control, scaling: 2 },
      { stat: EnumWakfuStat.ElementalMastery, scaling: 40 },
    ],
    maxLevel: 1,
  },
  [EnumAbilities.DamageDealt]: { id: 8, effects: [{ stat: EnumWakfuStat.DamageDealt, scaling: 10 }], maxLevel: 1 },
  [EnumAbilities.MajorResistance]: {
    id: 35,
    effects: [{ stat: EnumWakfuStat.ElementalResistance, scaling: 50 }],
    maxLevel: 1,
  },
};

export enum EnumAbilitiesCategories {
  Intelligence = "Intelligence",
  Strength = "Strength",
  Agility = "Agility",
  Chance = "Chance",
  Major = "Major",
}

export const AbilitiesCategories: Record<
  EnumAbilitiesCategories,
  {
    label: string;
    abilities: EnumAbilities[];
    firstPointLevel: number;
    nextPointsEveryLevels: number;
    maxLevel?: number;
  }
> = {
  [EnumAbilitiesCategories.Intelligence]: {
    label: "Intelligence",
    abilities: [
      EnumAbilities.PercentHp,
      EnumAbilities.Resistance,
      EnumAbilities.Barrier,
      EnumAbilities.HealingReceived,
      EnumAbilities.PercentHpToArmor,
    ],
    firstPointLevel: 2,
    nextPointsEveryLevels: 4,
  },
  [EnumAbilitiesCategories.Strength]: {
    label: "Force",
    abilities: [EnumAbilities.Mastery, EnumAbilities.MeleeMastery, EnumAbilities.RangeMastery, EnumAbilities.Hp],
    firstPointLevel: 3,
    nextPointsEveryLevels: 4,
  },
  [EnumAbilitiesCategories.Agility]: {
    label: "Agilité",
    abilities: [
      EnumAbilities.Lock,
      EnumAbilities.Dodge,
      EnumAbilities.Initiative,
      EnumAbilities.LockAndDodge,
      EnumAbilities.Willpower,
    ],
    firstPointLevel: 4,
    nextPointsEveryLevels: 4,
  },
  [EnumAbilitiesCategories.Chance]: {
    label: "Chance",
    abilities: [
      EnumAbilities.CriticalRate,
      EnumAbilities.Block,
      EnumAbilities.CriticalMastery,
      EnumAbilities.BackMastery,
      EnumAbilities.BerserkMastery,
      EnumAbilities.HealingMastery,
      EnumAbilities.BackResistance,
      EnumAbilities.CriticalResistance,
    ],
    firstPointLevel: 5,
    nextPointsEveryLevels: 4,
  },
  [EnumAbilitiesCategories.Major]: {
    label: "Majeur",
    abilities: [
      EnumAbilities.Ap,
      EnumAbilities.MpAndMastery,
      EnumAbilities.RangeAndMastery,
      EnumAbilities.Wp,
      EnumAbilities.ControlAndMastery,
      EnumAbilities.DamageDealt,
      EnumAbilities.MajorResistance,
    ],
    firstPointLevel: 25,
    nextPointsEveryLevels: 50,
    maxLevel: 175,
  },
};
