import { EnumWakfuStat, type TWakfuStats } from "../stats/types";
import { EnumWakfuBreed } from "./types";

const defaultStats: TWakfuStats = {
  [EnumWakfuStat.ActionPoint]: 6,
  [EnumWakfuStat.MovementPoint]: 3,
  [EnumWakfuStat.WakfuPoint]: 6,
  [EnumWakfuStat.CriticalHit]: 3,
  [EnumWakfuStat.Control]: 1,
};

export const getBreedInnateStats = (breed: EnumWakfuBreed, level: number): TWakfuStats => {
  const health = 50 + level * 10;
  defaultStats[EnumWakfuStat.HealthPoint] = health;

  switch (breed) {
    case EnumWakfuBreed.Cra:
      defaultStats[EnumWakfuStat.Range] = 1;
      break;
    case EnumWakfuBreed.Ecaflip:
      defaultStats[EnumWakfuStat.CriticalHit] = 23;
      break;
    case EnumWakfuBreed.Iop:
      defaultStats[EnumWakfuStat.MovementPoint] = 4;
      break;
    case EnumWakfuBreed.Sacrieur:
      defaultStats[EnumWakfuStat.HealthPoint] = 50 + level * 10 + level * 4;
      break;
    case EnumWakfuBreed.Sram:
      defaultStats[EnumWakfuStat.Control] = 2;
      defaultStats[EnumWakfuStat.ElementalMastery] = level;
      break;
    case EnumWakfuBreed.Eliotrop:
      defaultStats[EnumWakfuStat.EliotropeRangeToMovement] = 1;
      break;
  }
  return defaultStats;
};
