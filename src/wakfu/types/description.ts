import { isObject, isString } from "src/types/utils";
import { WakfuLang } from "./utils";

export type TWakfuDescription = Record<WakfuLang, string>;

export const isWakfuDescription = (value: unknown): value is TWakfuDescription => {
  return (
    isObject(value) &&
    Object.values(WakfuLang).every((lang) => lang in value && isString((value as Record<WakfuLang, unknown>)[lang]))
  );
};

export const loadWakfuDescriptionFromJson = (json: unknown): TWakfuDescription => {
  if (!isObject(json)) {
    throw new Error("Invalid JSON: WakfuDescription");
  }
  const description: TWakfuDescription = {
    fr: "fr" in json && isString(json.fr) ? json.fr : "",
    en: "en" in json && isString(json.en) ? json.en : "",
    es: "es" in json && isString(json.es) ? json.es : "",
    pt: "pt" in json && isString(json.pt) ? json.pt : "",
  };
  return description;
};
