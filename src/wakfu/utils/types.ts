export const EnumWakfuLang = {
  French: "fr",
  English: "en",
  Spanish: "es",
  Portuguese: "pt",
} as const;

export type EnumWakfuLang = (typeof EnumWakfuLang)[keyof typeof EnumWakfuLang];

export type TWakfuI18n = {
  [locale in EnumWakfuLang]: string;
};
