import { EnumWakfuStat } from "./types";

export const WakfuStatMapping: Record<
  EnumWakfuStat,
  { gainActionId?: number[]; lossActionId?: number[]; filterParams?: (params: number[]) => boolean }
> = {
  [EnumWakfuStat.HealthPoint]: {
    gainActionId: [20],
    lossActionId: [21],
  },
  [EnumWakfuStat.HealthPointByLevel]: {},
  [EnumWakfuStat.HealingMastery]: {
    gainActionId: [26],
  },
  [EnumWakfuStat.ActionPoint]: {
    gainActionId: [31],
    lossActionId: [56],
  },
  [EnumWakfuStat.MovementPoint]: {
    gainActionId: [41],
    lossActionId: [57],
  },
  [EnumWakfuStat.ElementalResistance]: {
    gainActionId: [80],
    lossActionId: [90, 100],
  },
  [EnumWakfuStat.FireResistance]: {
    gainActionId: [82],
    lossActionId: [97],
  },
  [EnumWakfuStat.WaterResistance]: {
    gainActionId: [83],
    lossActionId: [98],
  },
  [EnumWakfuStat.EarthResistance]: {
    gainActionId: [84],
    lossActionId: [96],
  },
  [EnumWakfuStat.AirResistance]: {
    gainActionId: [85],
  },
  [EnumWakfuStat.RearResistance]: {
    gainActionId: [71],
    lossActionId: [1063],
  },
  [EnumWakfuStat.ElementalMastery]: {
    gainActionId: [120],
    lossActionId: [130],
  },
  [EnumWakfuStat.ElementalMasteryByLevel]: {},
  [EnumWakfuStat.FireMastery]: {
    gainActionId: [122],
    lossActionId: [132],
  },
  [EnumWakfuStat.EarthMastery]: {
    gainActionId: [123],
  },
  [EnumWakfuStat.WaterMastery]: {
    gainActionId: [124],
  },
  [EnumWakfuStat.AirMastery]: {
    gainActionId: [125],
  },
  [EnumWakfuStat.CriticalMastery]: {
    gainActionId: [149],
    lossActionId: [1056],
  },
  [EnumWakfuStat.CriticalHit]: {
    gainActionId: [150],
    lossActionId: [168],
  },
  [EnumWakfuStat.Range]: {
    gainActionId: [160],
    lossActionId: [161],
  },
  [EnumWakfuStat.Prospecting]: {
    gainActionId: [162],
  },
  [EnumWakfuStat.Wisdom]: {
    gainActionId: [166],
  },
  [EnumWakfuStat.Initiative]: {
    gainActionId: [171],
    lossActionId: [172],
  },
  [EnumWakfuStat.Lock]: {
    gainActionId: [173],
    lossActionId: [174],
  },
  [EnumWakfuStat.Dodge]: {
    gainActionId: [175],
    lossActionId: [176],
  },
  [EnumWakfuStat.Willpower]: {
    gainActionId: [177],
  },
  [EnumWakfuStat.RearMastery]: {
    gainActionId: [180],
    lossActionId: [181],
  },
  [EnumWakfuStat.Control]: {
    gainActionId: [184],
  },
  [EnumWakfuStat.WakfuPoint]: {
    gainActionId: [191],
    lossActionId: [192],
  },
  [EnumWakfuStat.Block]: {
    gainActionId: [875],
    lossActionId: [876],
  },
  [EnumWakfuStat.CriticalResistance]: {
    gainActionId: [988],
    lossActionId: [1062],
  },
  [EnumWakfuStat.MeleeMastery]: {
    gainActionId: [1052],
    lossActionId: [1059],
  },
  [EnumWakfuStat.DistanceMastery]: {
    gainActionId: [1053],
    lossActionId: [1060],
  },
  [EnumWakfuStat.BerserkMastery]: {
    gainActionId: [1055],
    lossActionId: [1061],
  },
  [EnumWakfuStat.HarvestBonusFarmer]: {
    gainActionId: [2001],
    filterParams: (params) => params[2] === 64,
  },
  [EnumWakfuStat.HarvestBonusLumberjack]: {
    gainActionId: [2001],
    filterParams: (params) => params[2] === 71,
  },
  [EnumWakfuStat.HarvestBonusMiner]: {
    gainActionId: [2001],
    filterParams: (params) => params[2] === 73,
  },
  [EnumWakfuStat.HarvestBonusTrapper]: {
    gainActionId: [2001],
    filterParams: (params) => params[2] === 74,
  },
  [EnumWakfuStat.HarvestBonusFisherman]: {
    gainActionId: [2001],
    filterParams: (params) => params[2] === 75,
  },
  [EnumWakfuStat.HarvestBonusHerbalist]: {
    gainActionId: [2001],
    filterParams: (params) => params[2] === 72,
  },
  [EnumWakfuStat.HarvestBonus]: {},
  [EnumWakfuStat.MasteryOneElement]: {
    gainActionId: [1068],
    filterParams: (params) => params[2] === 1,
  },
  [EnumWakfuStat.MasteryTwoElements]: {
    gainActionId: [1068],
    filterParams: (params) => params[2] === 2,
  },
  [EnumWakfuStat.MasteryThreeElements]: {
    gainActionId: [1068],
    filterParams: (params) => params[2] === 3,
  },
  [EnumWakfuStat.ResistanceOneElement]: {
    gainActionId: [1069],
    filterParams: (params) => params[2] === 1,
  },
  [EnumWakfuStat.ResistanceTwoElements]: {
    gainActionId: [1069],
    filterParams: (params) => params[2] === 2,
  },
  [EnumWakfuStat.ResistanceThreeElements]: {
    gainActionId: [1069],
    filterParams: (params) => params[2] === 3,
  },
  [EnumWakfuStat.ArmorGiven]: {
    gainActionId: [39],
    lossActionId: [40],
    filterParams: (params: number[]): boolean => params[4] === 120,
  },
  [EnumWakfuStat.ArmorReceived]: {
    gainActionId: [39],
    lossActionId: [40],
    filterParams: (params: number[]): boolean => params[4] === 121,
  },
  [EnumWakfuStat.PercentHealthPoint]: {},
  [EnumWakfuStat.Barrier]: {},
  [EnumWakfuStat.HealingReceived]: {},
  [EnumWakfuStat.PercentHealthPointToArmor]: {},
  [EnumWakfuStat.DamageDealt]: {},
  [EnumWakfuStat.HealingDone]: {},
  [EnumWakfuStat.Armor]: {},
  [EnumWakfuStat.IndirectDamages]: {},
  [EnumWakfuStat.EliotropeRangeToMovement]: {},
};

export const getWakfuStatForMapping = (actionId: number, params: number[]) => {
  for (const stat of Object.values(EnumWakfuStat)) {
    const mapping = WakfuStatMapping[stat];
    if (
      (mapping.gainActionId?.includes(actionId) || mapping.lossActionId?.includes(actionId)) &&
      (!mapping.filterParams || !mapping.filterParams(params) || mapping.filterParams(params))
    ) {
      return stat;
    }
  }
  return null;
};
