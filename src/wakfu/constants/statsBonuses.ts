import { WakfuStats } from "../types/action";

export enum EnumStatsBonuses {
  Guild = "guild",
  HavenWorld = "havenWorld",
}

export const StatsBonuses: Record<EnumStatsBonuses, Partial<Record<WakfuStats, number>>> = {
  [EnumStatsBonuses.Guild]: {
    [WakfuStats.PV]: 55,
    [WakfuStats.Resistance]: 20,
    [WakfuStats.FinalDamage]: 8,
    [WakfuStats.Prospection]: 10,
    [WakfuStats.Wisdom]: 10,
    [WakfuStats.Initiative]: 10,
    [WakfuStats.Lock]: 20,
    [WakfuStats.Dodge]: 20,
    [WakfuStats.FinalHealing]: 8,
  },
  [EnumStatsBonuses.HavenWorld]: {
    [WakfuStats.PV]: 10,
    [WakfuStats.Prospection]: 10,
    [WakfuStats.Wisdom]: 10,
  },
};
