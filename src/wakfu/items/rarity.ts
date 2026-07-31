export const EnumWakfuRarity = {
  Old: 0,
  Uncommon: 1,
  Rare: 2,
  Mythic: 3,
  Legendary: 4,
  Relic: 5,
  Memory: 6,
  Epic: 7,
} as const;

export type EnumWakfuRarity = (typeof EnumWakfuRarity)[keyof typeof EnumWakfuRarity];

export type TWakfuUniqueRarity = (typeof EnumWakfuRarity)["Epic"] | (typeof EnumWakfuRarity)["Relic"];

const WakfuRarities = new Set<number>(Object.values(EnumWakfuRarity));

export const isWakfuRarity = (value: unknown): value is EnumWakfuRarity => {
  return typeof value === "number" && WakfuRarities.has(value);
};
