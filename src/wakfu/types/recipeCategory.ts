import { isNumber, isObject } from "src/types/utils";
import { loadWakfuDescriptionFromJson, type TWakfuDescription } from "./description";

export type TWakfuRecipeCategory = {
  id: number;
  description: TWakfuDescription;
};

export const loadWakfuRecipeCategoryFromJson = (json: unknown): TWakfuRecipeCategory => {
  if (
    isObject(json) &&
    "definition" in json &&
    isObject(json.definition) &&
    "id" in json.definition &&
    isNumber(json.definition.id) &&
    "title" in json
  ) {
    return {
      id: json.definition.id,
      description: loadWakfuDescriptionFromJson(json.title),
    };
  }
  throw new Error("Invalid JSON: WakfuRecipeCategory");
};
