import type { TWakfuStats } from "../stats/types";
import type { EnumWakfuRarity } from "./rarity";

export type TWakfuItemDisplay = {
  id: number;
  level: number;
  itemTypeId: number;
  rarity: EnumWakfuRarity;
  gfxId: number;
  stats: TWakfuStats;
  title: string;
  description: string;
};
