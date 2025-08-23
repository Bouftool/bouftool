import { EnumStatsBonuses } from "src/wakfu/constants/statsBonuses";
import type { TWakfuDescription } from "src/wakfu/types/description";

export const StatsBonusesLabels: Record<EnumStatsBonuses, TWakfuDescription> = {
  [EnumStatsBonuses.Guild]: {
    fr: "Bonus de guilde",
    en: "Guild bonus",
    es: "Bono de gremio",
    pt: "Bônus de guilda",
  },
  [EnumStatsBonuses.HavenWorld]: {
    fr: "Bonus de Havre-Monde",
    en: "Haven World bonus",
    es: "Bono de Mundo Refugio",
    pt: "Bônus de Mundo Refúgio",
  },
};
