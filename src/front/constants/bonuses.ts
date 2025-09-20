import { EnumWakfuStatsBonuses } from "src/wakfu/builds/bonus";
import type { TWakfuI18n } from "src/wakfu/utils/types";

export const StatsBonusesLabels: Record<EnumWakfuStatsBonuses, TWakfuI18n> = {
  [EnumWakfuStatsBonuses.Guild]: {
    fr: "Bonus de guilde",
    en: "Guild bonus",
    es: "Bono de gremio",
    pt: "Bônus de guilda",
  },
  [EnumWakfuStatsBonuses.HavenWorld]: {
    fr: "Bonus de Havre-Monde",
    en: "Haven World bonus",
    es: "Bono de Mundo Refugio",
    pt: "Bônus de Mundo Refúgio",
  },
};
