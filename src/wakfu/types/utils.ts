export enum WakfuLang {
  fr = "fr",
  en = "en",
  es = "es",
  pt = "pt",
}

export const isWakfuLang = (value: unknown): value is WakfuLang => {
  const result = Object.values(WakfuLang).includes(value as WakfuLang);
  if (!result) {
    console.warn(`Invalid WakfuLang value: ${value}`);
  }
  return result;
};

export const WakfuLevelsRange = [
  { min: 1, max: 20 },
  { min: 21, max: 50 },
  { min: 51, max: 65 },
  { min: 66, max: 80 },
  { min: 81, max: 95 },
  { min: 96, max: 110 },
  { min: 111, max: 125 },
  { min: 126, max: 140 },
  { min: 141, max: 155 },
  { min: 156, max: 170 },
  { min: 171, max: 185 },
  { min: 186, max: 200 },
  { min: 201, max: 215 },
  { min: 216, max: 230 },
  { min: 231, max: 245 },
];
