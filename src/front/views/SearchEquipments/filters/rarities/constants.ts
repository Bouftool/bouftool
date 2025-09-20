import { EnumWakfuRarity } from "src/wakfu/items/rarity";
import type { TWakfuI18n } from "src/wakfu/utils/types";

export const RarityLabels: Record<EnumWakfuRarity, TWakfuI18n> = {
  [EnumWakfuRarity.Old]: {
    fr: "Qualité commune",
    en: "Common",
    es: "Común",
    pt: "Comum",
  },
  [EnumWakfuRarity.Uncommon]: {
    fr: "Inhabituel",
    en: "Unusual",
    es: "Inusual",
    pt: "Incomum",
  },
  [EnumWakfuRarity.Rare]: {
    fr: "Rare",
    en: "Rare",
    es: "Raro",
    pt: "Raro",
  },
  [EnumWakfuRarity.Mythic]: {
    fr: "Mythique",
    en: "Mythical",
    es: "Mítico",
    pt: "Mítico",
  },
  [EnumWakfuRarity.Legendary]: {
    fr: "Légendaire",
    en: "Legendary",
    es: "Legendario",
    pt: "Legendário",
  },
  [EnumWakfuRarity.Relic]: {
    fr: "Relique",
    en: "Relic",
    es: "Reliquia",
    pt: "Relíquia",
  },
  [EnumWakfuRarity.Memory]: {
    fr: "Souvenir",
    en: "Memory",
    es: "Recuerdo",
    pt: "Lembrança",
  },
  [EnumWakfuRarity.Epic]: {
    fr: "Épique",
    en: "Epic",
    es: "Épico",
    pt: "Épico",
  },
};
