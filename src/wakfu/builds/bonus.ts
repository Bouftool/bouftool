import { WakfuStats } from "../stats";
import { EnumWakfuStat } from "../stats/types";

export const EnumWakfuStatsBonuses = {
  Guild: "guild",
  HavenWorld: "havenWorld",
} as const;

export type EnumWakfuStatsBonuses = (typeof EnumWakfuStatsBonuses)[keyof typeof EnumWakfuStatsBonuses];

export const StatsBonuses: Record<EnumWakfuStatsBonuses, WakfuStats> = {
  [EnumWakfuStatsBonuses.Guild]: new WakfuStats({
    [EnumWakfuStat.HealthPoint]: 55,
    [EnumWakfuStat.ElementalResistance]: 20,
    [EnumWakfuStat.DamageDealt]: 8,
    [EnumWakfuStat.HealingDone]: 8,
    [EnumWakfuStat.Prospecting]: 10,
    [EnumWakfuStat.Wisdom]: 10,
    [EnumWakfuStat.Initiative]: 10,
    [EnumWakfuStat.Lock]: 20,
    [EnumWakfuStat.Dodge]: 20,
  }),
  [EnumWakfuStatsBonuses.HavenWorld]: new WakfuStats({
    [EnumWakfuStat.HealthPoint]: 10,
    [EnumWakfuStat.Prospecting]: 10,
    [EnumWakfuStat.Wisdom]: 10,
  }),
};
