export enum EnumWakfuLang {
  French = "fr",
  English = "en",
  Spanish = "es",
  Portuguese = "pt",
}

export type TWakfuI18n = {
  [locale in EnumWakfuLang]: string;
};
