import type { TWakfuDescription } from "src/wakfu/types/description";
import { Rarity } from "src/wakfu/types/rarity";

export const RarityLabels: Record<Rarity, TWakfuDescription> = {
  [Rarity.Old]: {
    fr: "Qualité commune",
    en: "Common",
    es: "Común",
    pt: "Comum",
  },
  [Rarity.Uncommon]: {
    fr: "Inhabituel",
    en: "Unusual",
    es: "Inusual",
    pt: "Incomum",
  },
  [Rarity.Rare]: {
    fr: "Rare",
    en: "Rare",
    es: "Raro",
    pt: "Raro",
  },
  [Rarity.Mythic]: {
    fr: "Mythique",
    en: "Mythical",
    es: "Mítico",
    pt: "Mítico",
  },
  [Rarity.Legendary]: {
    fr: "Légendaire",
    en: "Legendary",
    es: "Legendario",
    pt: "Legendário",
  },
  [Rarity.Relic]: {
    fr: "Relique",
    en: "Relic",
    es: "Reliquia",
    pt: "Relíquia",
  },
  [Rarity.Memory]: {
    fr: "Souvenir",
    en: "Memory",
    es: "Recuerdo",
    pt: "Lembrança",
  },
  [Rarity.Epic]: {
    fr: "Épique",
    en: "Epic",
    es: "Épico",
    pt: "Épico",
  },
};
