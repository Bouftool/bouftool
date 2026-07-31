export const EnumBuildDetailsTabs = {
  Equipments: "equipments",
  Abilities: "abilities",
  Enchantment: "enchantment",
} as const;

export type EnumBuildDetailsTabs = (typeof EnumBuildDetailsTabs)[keyof typeof EnumBuildDetailsTabs];
